-- Beit Hesed Bakery - Supabase schema
-- Run this file in Supabase Dashboard > SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text not null,
  category text not null,
  occasion text not null,
  price numeric(10, 2) not null check (price >= 0),
  image_url text not null,
  is_featured boolean not null default false,
  is_available boolean not null default true,
  prep_time text not null default '24 horas',
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  delivery_date date not null,
  delivery_type text not null check (delivery_type in ('retiro', 'delivery')),
  address text,
  notes text,
  items jsonb not null,
  total numeric(10, 2) not null check (total >= 0),
  status text not null default 'nuevo'
    check (status in ('nuevo', 'confirmado', 'en preparacion', 'entregado', 'cancelado')),
  created_at timestamptz not null default now()
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_available_idx on public.products (is_available);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "products are readable by everyone" on public.products;
drop policy if exists "authenticated users can manage products" on public.products;
drop policy if exists "public can create orders" on public.orders;
drop policy if exists "any client can create orders" on public.orders;
drop policy if exists "authenticated users can read orders" on public.orders;
drop policy if exists "authenticated users can update orders" on public.orders;

create policy "products are readable by everyone"
on public.products
for select
to anon, authenticated
using (is_available = true or auth.role() = 'authenticated');

create policy "authenticated users can manage products"
on public.products
for all
to authenticated
using (true)
with check (true);

create policy "any client can create orders"
on public.orders
for insert
to public
with check (true);

create policy "authenticated users can read orders"
on public.orders
for select
to authenticated
using (true);

create policy "authenticated users can update orders"
on public.orders
for update
to authenticated
using (true)
with check (true);
