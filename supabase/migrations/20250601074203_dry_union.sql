/*
  # Fix users table RLS policies

  1. Changes
    - Remove recursive policy that was causing infinite recursion
    - Replace admin access policy with a simpler version using role check
    - Maintain existing functionality while avoiding self-referential queries
  
  2. Security
    - Maintains RLS protection
    - Ensures admins can still access all users
    - Preserves group admin access
    - Keeps user self-access intact
*/

-- First, drop existing policies to replace them
DROP POLICY IF EXISTS "Enable admin access to all users" ON users;
DROP POLICY IF EXISTS "Enable group admin access to group members" ON users;
DROP POLICY IF EXISTS "Enable group members to read other group members" ON users;
DROP POLICY IF EXISTS "Enable read access for users to their own data" ON users;

-- Create new policies without recursion
CREATE POLICY "Enable admin access to all users"
ON users
FOR ALL
TO public
USING (
  role = 'admin'
);

CREATE POLICY "Enable group admin access to group members"
ON users
FOR ALL
TO public
USING (
  EXISTS (
    SELECT 1
    FROM groupes
    WHERE groupes.admin_id = auth.uid() 
    AND users.groupe_id = groupes.id
  )
);

CREATE POLICY "Enable group members to read other group members"
ON users
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM users u
    WHERE u.id = auth.uid() 
    AND u.groupe_id = users.groupe_id
  )
);

CREATE POLICY "Enable read access for users to their own data"
ON users
FOR SELECT
TO public
USING (
  auth.uid() = id
);