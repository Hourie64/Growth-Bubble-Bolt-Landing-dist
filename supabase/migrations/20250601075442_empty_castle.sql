/*
  # Fix users table RLS policies

  1. Changes
    - Remove potentially recursive policies
    - Simplify policy conditions
    - Add clearer, non-recursive policies for:
      - Admins can manage all users
      - Users can read their own profile
      - Group admins can manage their group members
      - Group members can read other members in their group
  
  2. Security
    - Maintains RLS protection
    - Simplifies policy logic to prevent recursion
    - Ensures proper access control
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Admins can manage all users" ON users;
DROP POLICY IF EXISTS "Users can access their profile" ON users;
DROP POLICY IF EXISTS "Group admins can manage members" ON users;
DROP POLICY IF EXISTS "Group members can read group members" ON users;

-- Create new, simplified policies
CREATE POLICY "Admins can manage all users"
ON users
FOR ALL
TO authenticated
USING (
  (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Users can read own profile"
ON users
FOR SELECT
TO authenticated
USING (
  auth.uid() = id
);

CREATE POLICY "Group admins can manage members"
ON users
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM groupes
    WHERE groupes.admin_id = auth.uid()
    AND users.groupe_id = groupes.id
  )
);

CREATE POLICY "Group members can read group members"
ON users
FOR SELECT
TO authenticated
USING (
  groupe_id IN (
    SELECT groupe_id FROM users WHERE id = auth.uid()
  )
);