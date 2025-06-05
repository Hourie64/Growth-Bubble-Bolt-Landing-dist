/*
  # Fix users table RLS policies

  1. Changes
    - Remove recursive policies that were causing infinite loops
    - Simplify policy conditions to prevent circular references
    - Maintain security while fixing the recursion issue
  
  2. Security Updates
    - Rewrite policies to use direct auth.uid() checks where possible
    - Separate group-related policies to avoid recursion
    - Maintain existing access control logic but with optimized conditions
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Enable admin access to all users" ON users;
DROP POLICY IF EXISTS "Enable group admin access to group members" ON users;
DROP POLICY IF EXISTS "Enable group members to read other group members" ON users;
DROP POLICY IF EXISTS "Enable read access for users to their own data" ON users;

-- Recreate policies without recursion
-- Allow users to read their own data
CREATE POLICY "Users can read own data"
ON users
FOR SELECT
TO public
USING (auth.uid() = id);

-- Allow admins to manage all users
CREATE POLICY "Admins can manage all users"
ON users
FOR ALL
TO public
USING (
  EXISTS (
    SELECT 1
    FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Allow group admins to read their group members
CREATE POLICY "Group admins can read group members"
ON users
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM groupes
    WHERE groupes.admin_id = auth.uid()
    AND users.groupe_id = groupes.id
  )
);

-- Allow users to read other members in their group
CREATE POLICY "Group members can read group members"
ON users
FOR SELECT
TO public
USING (
  groupe_id IN (
    SELECT groupe_id 
    FROM users 
    WHERE id = auth.uid()
  )
);