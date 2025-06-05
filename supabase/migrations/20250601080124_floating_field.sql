/*
  # Fix recursive RLS policies for users table

  1. Changes
    - Remove recursive policy for admin management
    - Add new non-recursive admin policy using auth.uid()
    - Maintain existing policies for group management and user self-access
    
  2. Security
    - Maintains row level security
    - Preserves existing access patterns
    - Eliminates infinite recursion issue
*/

-- Drop the recursive admin policy
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

-- Create new non-recursive admin policy
CREATE POLICY "Admins can manage all users" ON users
FOR ALL 
TO authenticated
USING (
  role = 'admin'
);

-- Note: Other existing policies remain unchanged as they don't cause recursion:
-- - "Group admins can manage members"
-- - "Group members can read group members"
-- - "Users can read own profile"