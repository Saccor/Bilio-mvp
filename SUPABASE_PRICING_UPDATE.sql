-- 🔄 Uppdatera kreditpriser för optimal konvertering
-- Kör detta i Supabase för att uppdatera priserna

-- Rensa befintliga paket
DELETE FROM credit_packages;

-- Lägg till enkla kreditpaket (1 kredit = 1 analys)
INSERT INTO credit_packages (name, credits, price_sek, description) VALUES
('1 Analys', 1, 14900, 'En bilanalys eller jämförelse (149 kr)'),
('3 Analyser', 3, 39900, 'Tre bilanalyser - spara 50 kr (399 kr)'),
('5 Analyser', 5, 59900, 'Fem bilanalyser - spara 150 kr (599 kr)'),
('10 Analyser', 10, 99900, 'Tio bilanalyser - spara 500 kr (999 kr)')
ON CONFLICT DO NOTHING;

-- Enkel kostnad: 1 kredit = 1 analys (antingen single report eller comparison)

-- Lägg till unlock tracking i vehicle_reports
ALTER TABLE vehicle_reports ADD COLUMN IF NOT EXISTS unlocked_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE vehicle_reports ADD COLUMN IF NOT EXISTS unlock_type TEXT;

-- Lägg till check constraint för unlock_type
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'vehicle_reports_unlock_type_check' 
        AND table_name = 'vehicle_reports'
    ) THEN
        ALTER TABLE vehicle_reports ADD CONSTRAINT vehicle_reports_unlock_type_check 
        CHECK (unlock_type IN ('free_preview', 'single_unlock', 'comparison_unlock'));
    END IF;
END $$;

-- Lägg till index för bättre performance
CREATE INDEX IF NOT EXISTS idx_vehicle_reports_user_reg ON vehicle_reports(user_id, registration_number);
CREATE INDEX IF NOT EXISTS idx_vehicle_reports_unlocked ON vehicle_reports(user_id, unlocked_at) WHERE unlocked_at IS NOT NULL;