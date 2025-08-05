-- 💳 Kreditsystem för Bilio - Updated Setup
-- Kör detta i Supabase SQL Editor

-- 1. Skapa profiles tabell (utöka befintlig user)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  credits INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies för profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Kreditpaket tabell
CREATE TABLE IF NOT EXISTS credit_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  credits INTEGER NOT NULL,
  price_sek INTEGER NOT NULL, -- i ören (14900 = 149 kr)
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing packages and insert updated ones
DELETE FROM credit_packages;

-- Insert current credit packages (1 kredit = 1 analys)
INSERT INTO credit_packages (name, credits, price_sek, description) VALUES
('1 Analys', 1, 14900, 'En bilanalys eller jämförelse (149 kr)'),
('3 Analyser', 3, 39900, 'Tre bilanalyser - spara 50 kr (399 kr)'),
('5 Analyser', 5, 59900, 'Fem bilanalyser - spara 150 kr (599 kr)'),
('10 Analyser', 10, 99900, 'Tio bilanalyser - spara 500 kr (999 kr)')
ON CONFLICT DO NOTHING;

-- 3. Kredittransaktioner
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'refund', 'bonus')),
  amount INTEGER NOT NULL, -- positiv för inköp, negativ för användning
  description TEXT NOT NULL,
  reference_id TEXT, -- payment_intent_id, report_id, etc.
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own transactions
DROP POLICY IF EXISTS "Users can view own transactions" ON credit_transactions;
CREATE POLICY "Users can view own transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own transactions" ON credit_transactions;
CREATE POLICY "Users can insert own transactions" ON credit_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Betalningar
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_intent_id TEXT UNIQUE NOT NULL,
  amount_sek INTEGER NOT NULL, -- i ören
  currency TEXT DEFAULT 'SEK',
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed', 'canceled')),
  credits_purchased INTEGER NOT NULL,
  package_id UUID REFERENCES credit_packages(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own payments
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own payments" ON payments;
CREATE POLICY "Users can insert own payments" ON payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Fordonsrapporter (Updated for new credit system)
CREATE TABLE IF NOT EXISTS vehicle_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  registration_number TEXT NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('single', 'comparison')),
  credits_used INTEGER NOT NULL DEFAULT 1, -- 1 credit per analysis
  unlocked_at TIMESTAMP WITH TIME ZONE,
  unlock_type TEXT CHECK (unlock_type IN ('free_preview', 'single_unlock', 'comparison_unlock')),
  report_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vehicle_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own reports
DROP POLICY IF EXISTS "Users can view own reports" ON vehicle_reports;
CREATE POLICY "Users can view own reports" ON vehicle_reports
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own reports" ON vehicle_reports;
CREATE POLICY "Users can insert own reports" ON vehicle_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reports" ON vehicle_reports;
CREATE POLICY "Users can update own reports" ON vehicle_reports
  FOR UPDATE USING (auth.uid() = user_id);

-- 6. Funktion för att använda krediter (atomisk transaktion)
-- Updated: 1 kredit = 1 analys (single or comparison)
CREATE OR REPLACE FUNCTION use_credits(
  user_id UUID,
  credit_amount INTEGER,
  transaction_description TEXT,
  reference_id TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
  result JSON;
BEGIN
  -- Get current credit balance with row lock
  SELECT credits INTO current_credits 
  FROM profiles 
  WHERE id = user_id
  FOR UPDATE;
  
  -- Check if user has enough credits
  IF current_credits < credit_amount THEN
    RETURN json_build_object(
      'success', false, 
      'error', 'Insufficient credits',
      'current_credits', current_credits,
      'required_credits', credit_amount
    );
  END IF;
  
  -- Deduct credits atomically
  UPDATE profiles 
  SET credits = credits - credit_amount, updated_at = NOW()
  WHERE id = user_id;
  
  -- Record transaction
  INSERT INTO credit_transactions (user_id, type, amount, description, reference_id)
  VALUES (user_id, 'usage', -credit_amount, transaction_description, reference_id);
  
  RETURN json_build_object(
    'success', true, 
    'remaining_credits', current_credits - credit_amount,
    'credits_used', credit_amount
  );
END;
$$;

-- 7. Funktion för att lägga till krediter (vid köp)
CREATE OR REPLACE FUNCTION add_credits(
  user_id UUID,
  credit_amount INTEGER,
  transaction_description TEXT,
  reference_id TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_credits INTEGER;
BEGIN
  -- Add credits atomically
  UPDATE profiles 
  SET credits = credits + credit_amount, updated_at = NOW()
  WHERE id = user_id
  RETURNING credits INTO new_credits;
  
  -- Record transaction
  INSERT INTO credit_transactions (user_id, type, amount, description, reference_id)
  VALUES (user_id, 'purchase', credit_amount, transaction_description, reference_id);
  
  RETURN json_build_object(
    'success', true, 
    'new_balance', new_credits,
    'credits_added', credit_amount
  );
END;
$$;

-- 8. Funktion för att skapa användarprofil automatiskt
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Användare')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger för att skapa profil när ny användare registreras
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 9. Indexes för bättre performance
CREATE INDEX IF NOT EXISTS idx_vehicle_reports_user_reg ON vehicle_reports(user_id, registration_number);
CREATE INDEX IF NOT EXISTS idx_vehicle_reports_unlocked ON vehicle_reports(user_id, unlocked_at) WHERE unlocked_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user ON credit_transactions(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_credits ON profiles(credits);

-- 10. Views för enkel dataaccess
CREATE OR REPLACE VIEW user_credit_summary AS
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.credits,
  p.created_at,
  COUNT(ct.id) as total_transactions,
  COALESCE(SUM(CASE WHEN ct.type = 'purchase' THEN ct.amount ELSE 0 END), 0) as total_purchased,
  COALESCE(SUM(CASE WHEN ct.type = 'usage' THEN ABS(ct.amount) ELSE 0 END), 0) as total_used
FROM profiles p
LEFT JOIN credit_transactions ct ON p.id = ct.user_id
GROUP BY p.id, p.email, p.full_name, p.credits, p.created_at;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON credit_packages TO anon, authenticated;
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON credit_transactions TO authenticated;
GRANT ALL ON payments TO authenticated;
GRANT ALL ON vehicle_reports TO authenticated;
GRANT SELECT ON user_credit_summary TO authenticated;

-- 11. Test data (optional for demo)
-- Uncomment below to add some test credits to your account for testing
-- UPDATE profiles SET credits = 5 WHERE email = 'your-email@gmail.com';