-- Migration: Add multi-tenant admin_id columns

-- 1. Add admin_id to campaigns
ALTER TABLE registration_campaigns ADD COLUMN admin_id UUID REFERENCES auth.users(id);

-- 2. Add admin_id to games
ALTER TABLE games ADD COLUMN admin_id UUID REFERENCES auth.users(id);

-- Since there is existing data without admin_id, the app will auto-seed games if a new admin doesn't have them.
-- Or you can manually assign existing campaigns to an admin_id via Supabase Dashboard.
