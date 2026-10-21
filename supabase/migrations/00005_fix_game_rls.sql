-- Fix Game RLS to allow Admins to seed and manage their own games
CREATE POLICY "Allow admins to insert games" ON games FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admins to update games" ON games FOR UPDATE USING (auth.uid() = admin_id);
CREATE POLICY "Allow admins to delete games" ON games FOR DELETE USING (auth.uid() = admin_id);
