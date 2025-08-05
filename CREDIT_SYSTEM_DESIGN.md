# 💳 Kreditsystem för Bilio - Teknisk Design

## 🎯 Översikt
Implementera ett kreditsystem där användare kan:
- Köpa krediter med betalning
- Använda krediter för att få bilrapporter (149 kr) eller jämförelser (199 kr)
- Se sitt kreditsaldo
- Historik över köp och användning

## 🗄️ Databasschema (Supabase)

### 1. `profiles` tabell (utöka befintlig user profile)
```sql
CREATE TABLE profiles (
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

-- Policy: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 2. `credit_packages` tabell (kreditpaket som kan köpas)
```sql
CREATE TABLE credit_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  credits INTEGER NOT NULL,
  price_sek INTEGER NOT NULL, -- i ören (100 = 1 kr)
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert standard packages
INSERT INTO credit_packages (name, credits, price_sek, description) VALUES
('Starter', 100, 14900, '1 bilrapport (149 kr)'),
('Pro', 200, 19900, '1 jämförelse (199 kr)'),
('Value Pack', 500, 39900, '2 jämförelser + 1 rapport'),
('Premium', 1000, 74900, '5 jämförelser + extras');
```

### 3. `credit_transactions` tabell (alla kredittransaktioner)
```sql
CREATE TABLE credit_transactions (
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
CREATE POLICY "Users can view own transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);
```

### 4. `payments` tabell (betalningshistorik)
```sql
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_intent_id TEXT UNIQUE NOT NULL, -- Stripe payment intent ID
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
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);
```

### 5. `vehicle_reports` tabell (koppla rapporter till krediter)
```sql
CREATE TABLE vehicle_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  registration_number TEXT NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('single', 'comparison')),
  credits_used INTEGER NOT NULL,
  report_data JSONB NOT NULL, -- bildata från API
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vehicle_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own reports
CREATE POLICY "Users can view own reports" ON vehicle_reports
  FOR SELECT USING (auth.uid() = user_id);
```

## 🔄 API-endpoints som behövs

### Credit Management
- `GET /api/credits/balance` - Hämta användarens kreditsaldo
- `GET /api/credits/transactions` - Hämta transaktionshistorik
- `GET /api/credits/packages` - Hämta tillgängliga kreditpaket
- `POST /api/credits/purchase` - Initiera kreditköp
- `POST /api/credits/use` - Använd krediter för rapport

### Payment Integration
- `POST /api/payments/create-intent` - Skapa Stripe payment intent
- `POST /api/payments/webhook` - Stripe webhook för betalningsbekräftelse

### Reports
- `GET /api/reports/history` - Hämta användarens rapporthistorik
- `POST /api/reports/generate` - Generera ny rapport (debiterar krediter)

## 💰 Kreditpriser & Logik

### Standardpriser:
- **Bilrapport (single)**: 149 krediter
- **Jämförelse (comparison)**: 199 krediter

### Kreditpaket:
1. **Starter** (149 kr): 149 krediter → 1 rapport
2. **Pro** (199 kr): 199 krediter → 1 jämförelse  
3. **Value Pack** (399 kr): 500 krediter → 2 jämförelser + 1 rapport
4. **Premium** (749 kr): 1000 krediter → 5 jämförelser + extras

## 🔒 Säkerhet & Validering

### Row Level Security (RLS)
- Alla tabeller har RLS aktiverat
- Användare kan bara se sina egna data
- Server-side validering för alla transaktioner

### Kredittransaktioner
```typescript
// Atomic credit deduction
const useCredits = async (userId: string, amount: number, description: string) => {
  const { data, error } = await supabase.rpc('use_credits', {
    user_id: userId,
    credit_amount: amount,
    transaction_description: description
  });
  
  if (error) throw new Error('Insufficient credits');
  return data;
};
```

### Supabase Function för kredittransaktioner
```sql
CREATE OR REPLACE FUNCTION use_credits(
  user_id UUID,
  credit_amount INTEGER,
  transaction_description TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
  result JSON;
BEGIN
  -- Get current credit balance
  SELECT credits INTO current_credits 
  FROM profiles 
  WHERE id = user_id;
  
  -- Check if user has enough credits
  IF current_credits < credit_amount THEN
    RETURN json_build_object('success', false, 'error', 'Insufficient credits');
  END IF;
  
  -- Deduct credits atomically
  UPDATE profiles 
  SET credits = credits - credit_amount, updated_at = NOW()
  WHERE id = user_id;
  
  -- Record transaction
  INSERT INTO credit_transactions (user_id, type, amount, description)
  VALUES (user_id, 'usage', -credit_amount, transaction_description);
  
  RETURN json_build_object('success', true, 'remaining_credits', current_credits - credit_amount);
END;
$$;
```

## 🎨 UI-komponenter som behövs

### 1. CreditBalance.tsx
- Visa användarens kreditsaldo
- Länk till kreditköp

### 2. CreditPurchase.tsx  
- Visa kreditpaket
- Stripe-integration för betalning

### 3. CreditHistory.tsx
- Transaktionshistorik
- Filter och sök

### 4. ProtectedReportAccess.tsx
- Kontrollera krediter innan rapport
- Debitera krediter vid framgång

## 🔄 Implementation Flow

1. **Setup Supabase-tabeller** ✨
2. **Skapa credit API-endpoints** 
3. **Implementera Stripe-integration**
4. **Bygga UI-komponenter**
5. **Integrera med befintliga rapporter**
6. **Testa hela flödet**

Vill du att jag börjar implementera detta steg för steg?