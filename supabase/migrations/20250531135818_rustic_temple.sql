-- Create entreprises table
create table public.entreprises (
    id uuid primary key default gen_random_uuid(),
    nom text not null,
    valeurs text,
    mission text,
    vision text,
    objectifs text
);

-- Create users table
create table public.users (
    id uuid primary key references auth.users on delete cascade,
    email text not null,
    role text not null check (role in ('admin', 'user')),
    entreprise_id uuid references public.entreprises on delete set null
);

-- Enable RLS
alter table public.entreprises enable row level security;
alter table public.users enable row level security;

-- Create policies for entreprises table
create policy "Admins can read all entreprises"
    on public.entreprises
    for select
    using (
        exists (
            select 1 from public.users
            where users.id = auth.uid()
            and users.role = 'admin'
        )
    );

create policy "Users can read their own entreprise"
    on public.entreprises
    for select
    using (
        exists (
            select 1 from public.users
            where users.id = auth.uid()
            and users.entreprise_id = entreprises.id
        )
    );

create policy "Admins can insert entreprises"
    on public.entreprises
    for insert
    with check (
        exists (
            select 1 from public.users
            where users.id = auth.uid()
            and users.role = 'admin'
        )
    );

create policy "Admins can update entreprises"
    on public.entreprises
    for update
    using (
        exists (
            select 1 from public.users
            where users.id = auth.uid()
            and users.role = 'admin'
        )
    );

-- Create policies for users table
create policy "Users can read their own user data"
    on public.users
    for select
    using (auth.uid() = id);

create policy "Admins can manage users"
    on public.users
    for all
    using (
        exists (
            select 1 from public.users
            where users.id = auth.uid()
            and users.role = 'admin'
        )
    );

-- Create function to automatically set user data after signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.users (id, email, role)
    values (new.id, new.email, 'user');
    return new;
end;
$$;

-- Create trigger to handle new user signup
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();