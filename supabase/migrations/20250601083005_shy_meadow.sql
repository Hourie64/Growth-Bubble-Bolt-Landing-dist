/*
  # Add user profile columns

  1. Changes
    - Add missing profile columns to users table:
      - first_name (text)
      - last_name (text)
      - forfait (text)
      - age (integer)
      - gender (text)
      - family_status (text)
      - children (text)
      - profession (text)
      - job_title (text)

  2. Security
    - Existing RLS policies will apply to new columns
*/

DO $$ 
BEGIN
  -- Add first_name column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE users ADD COLUMN first_name text;
  END IF;

  -- Add last_name column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE users ADD COLUMN last_name text;
  END IF;

  -- Add forfait column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'forfait'
  ) THEN
    ALTER TABLE users ADD COLUMN forfait text CHECK (forfait IN ('perso', 'pro'));
  END IF;

  -- Add age column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'age'
  ) THEN
    ALTER TABLE users ADD COLUMN age integer CHECK (age >= 18 AND age <= 120);
  END IF;

  -- Add gender column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'gender'
  ) THEN
    ALTER TABLE users ADD COLUMN gender text CHECK (gender IN ('H', 'F', 'A', 'N'));
  END IF;

  -- Add family_status column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'family_status'
  ) THEN
    ALTER TABLE users ADD COLUMN family_status text CHECK (family_status IN ('single', 'couple', 'married', 'divorced', 'widowed'));
  END IF;

  -- Add children column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'children'
  ) THEN
    ALTER TABLE users ADD COLUMN children text CHECK (children IN ('0', '1', '2', '3'));
  END IF;

  -- Add profession column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'profession'
  ) THEN
    ALTER TABLE users ADD COLUMN profession text CHECK (profession IN ('student', 'employee', 'executive', 'freelance', 'retired'));
  END IF;

  -- Add job_title column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'job_title'
  ) THEN
    ALTER TABLE users ADD COLUMN job_title text;
  END IF;
END $$;