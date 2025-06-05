-- Create groups table if it doesn't exist
create table if not exists public.groupes (
    id uuid primary key default gen_random_uuid(),
    nom text not null,
    type text not null check (type in ('entreprise', 'perso')),
    valeurs text,
    mission text,
    vision text,
    objectifs text,
    règles_internes text,
    admin_id uuid references auth.users on delete set null
);

-- Enable RLS on groupes table if not already enabled
alter table if exists public.groupes enable row level security;

-- Add new column to users table if it doesn't exist
alter table public.users 
    add column if not exists groupe_id uuid references public.groupes on delete set null;

-- Drop existing policies if they exist
drop policy if exists "Users can read their own group" on public.groupes;
drop policy if exists "Admins can manage their own group" on public.groupes;
drop policy if exists "Users can read members of their group" on public.users;
drop policy if exists "Admins can manage users in their group" on public.users;

-- Create policies for groupes table
create policy "Users can read their own group"
    on public.groupes
    for select
    using (
        exists (
            select 1 from public.users
            where users.id = auth.uid()
            and users.groupe_id = groupes.id
        )
    );

create policy "Admins can manage their own group"
    on public.groupes
    for all
    using (
        exists (
            select 1 from public.users
            where users.id = auth.uid()
            and users.role = 'admin'
            and users.groupe_id = groupes.id
        )
    );

-- Create policies for users table
create policy "Users can read members of their group"
    on public.users
    for select
    using (
        exists (
            select 1 from public.users u
            where u.id = auth.uid()
            and u.groupe_id = users.groupe_id
        )
    );

create policy "Admins can manage users in their group"
    on public.users
    for all
    using (
        exists (
            select 1 from public.users u
            join public.groupes g on u.groupe_id = g.id
            where u.id = auth.uid()
            and u.role = 'admin'
            and g.admin_id = auth.uid()
            and users.groupe_id = u.groupe_id
        )
    );