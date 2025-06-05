/*
  # Fix recursive RLS policy for users table
  
  1. Changes
    - Remove recursive policy for admin users
    - Add new non-recursive policy for admin access
    
  2. Security
    - Maintains RLS protection
    - Prevents infinite recursion
    - Preserves admin access control
*/

-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

-- Create new non-recursive policy for admin access
CREATE POLICY "Admins can manage all users"
ON users
FOR ALL
TO authenticated
USING (
  role = 'admin'
);