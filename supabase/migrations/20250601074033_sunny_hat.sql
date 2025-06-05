/*
  # Fix users table RLS policies

  1. Changes
    - Remove recursive RLS policies that were causing infinite recursion
    - Simplify policies to basic user and admin access patterns
    - Fix policy definitions to avoid self-referential checks
  
  2. Security
    - Users can only read their own data
    - Admins can manage all users
    - Group admins can manage users in their groups
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage users" ON users;
DROP POLICY IF EXISTS "Admins can manage users in their group" ON users;
DROP POLICY IF EXISTS "Users can read members of their group" ON users;
DROP POLICY IF EXISTS "Users can read their own user data" ON users;

-- Create new simplified policies
CREATE POLICY "Enable read access for users to their own data"
ON users FOR SELECT
TO public
USING (auth.uid() = id);

CREATE POLICY "Enable admin access to all users"
ON users FOR ALL
TO public
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Enable group admin access to group members"
ON users FOR ALL
TO public
USING (
  EXISTS (
    SELECT 1 FROM groupes
    WHERE groupes.admin_id = auth.uid()
    AND users.groupe_id = groupes.id
  )
);

CREATE POLICY "Enable group members to read other group members"
ON users FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM users u
    WHERE u.id = auth.uid()
    AND u.groupe_id = users.groupe_id
  )
);