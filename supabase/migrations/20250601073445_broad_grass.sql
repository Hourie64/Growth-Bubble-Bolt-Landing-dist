-- Add growth test completion tracking to users table
alter table public.users 
    add column if not exists growth_completed_at timestamp with time zone,
    add column if not exists growth_results jsonb;

-- Create index for faster lookups
create index if not exists idx_users_growth_completed 
    on public.users(growth_completed_at);