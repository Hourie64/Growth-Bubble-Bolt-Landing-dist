-- Drop all existing policies on users table
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;
DROP POLICY IF EXISTS "Group admins can read group members" ON users;
DROP POLICY IF EXISTS "Group members can read group members" ON users;

-- Create new simplified policies without recursion
-- 1. Basic policy for users to access their own data
CREATE POLICY "Users can access their profile"
ON users
FOR SELECT
USING (auth.uid() = id);

-- 2. Policy for admins to manage all users (using auth metadata)
CREATE POLICY "Admins can manage all users"
ON users
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- 3. Policy for group members to read other members (using direct join)
CREATE POLICY "Group members can read group members"
ON users
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM users u2
    WHERE u2.id = auth.uid()
    AND u2.groupe_id = users.groupe_id
  )
);

-- 4. Policy for group admins (using direct join to groupes)
CREATE POLICY "Group admins can manage members"
ON users
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM groupes g
    WHERE g.admin_id = auth.uid()
    AND users.groupe_id = g.id
  )
);

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;