-- Drop all existing policies
DROP POLICY IF EXISTS "Users can access their profile" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;
DROP POLICY IF EXISTS "Group admins can manage members" ON users;
DROP POLICY IF EXISTS "Group members can read group members" ON users;
DROP POLICY IF EXISTS "Users can read own profile" ON users;

-- Create a single, simple policy for users to access their own data
CREATE POLICY "Users can access their profile"
ON users
FOR SELECT
USING (auth.uid() = id);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;