-- Drop existing policies and triggers first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP POLICY IF EXISTS "Users can access their profile" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;
DROP POLICY IF EXISTS "Group admins can manage members" ON users;
DROP POLICY IF EXISTS "Group members can read group members" ON users;
DROP POLICY IF EXISTS "Users can read own profile" ON users;

-- Recreate users table with proper structure
CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    email text NOT NULL,
    first_name text,
    last_name text,
    role text NOT NULL CHECK (role IN ('admin', 'user')),
    created_at timestamp with time zone DEFAULT now(),
    groupe_id uuid REFERENCES public.groupes ON DELETE SET NULL,
    growth_completed_at timestamp with time zone,
    growth_results jsonb
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policy for users to access their own data
CREATE POLICY "Users can access their profile"
ON users
FOR SELECT
USING (auth.uid() = id);

-- Create trigger function to automatically create user record
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (id, email, role)
    VALUES (new.id, new.email, 'user');
    RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();