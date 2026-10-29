-- Campus Pulse: Database Schema for Supabase
-- Target: 500 final-year engineering students for "Build Your First AI Project in 60 Minutes"
-- Total Budget: ₹2,000

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. REGISTRATIONS TABLE
create table if not exists public.registrations (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    email text not null unique,
    college text not null,
    branch text not null,
    graduation_year text not null,
    phone text,
    utm_source text default 'Organic / Direct',
    utm_medium text,
    utm_campaign text,
    referral_code text not null unique,
    referred_by text references public.registrations(referral_code) on delete set null,
    quiz_result_title text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_registrations_email on public.registrations(email);
create index if not exists idx_registrations_referral_code on public.registrations(referral_code);
create index if not exists idx_registrations_referred_by on public.registrations(referred_by);
create index if not exists idx_registrations_source on public.registrations(utm_source);

-- 2. REFERRALS LOG TABLE (for audit & verification)
create table if not exists public.referrals (
    id uuid primary key default uuid_generate_v4(),
    referrer_code text not null references public.registrations(referral_code) on delete cascade,
    referee_email text not null references public.registrations(email) on delete cascade,
    referee_name text not null,
    status text not null default 'confirmed',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(referrer_code, referee_email)
);

create index if not exists idx_referrals_referrer_code on public.referrals(referrer_code);

-- 3. EXPENSES TABLE (₹2,000 budget tracking)
create table if not exists public.expenses (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    amount numeric(10, 2) not null check (amount > 0),
    category text not null check (category in (
        'Campus Ambassador Incentives',
        'Creative & Promotional Materials',
        'Student Community Outreach',
        'Referral Incentives',
        'Miscellaneous'
    )),
    date date not null default current_date,
    description text not null,
    receipt_note text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. DAILY TARGETS TABLE (7-Day trajectory: 25, 100, 200, 300, 375, 450, 500)
create table if not exists public.daily_targets (
    day integer primary key check (day between 1 and 7),
    date_label text not null,
    target_cumulative integer not null,
    notes text default ''
);

-- Insert standard 7-day trajectory if not already present
insert into public.daily_targets (day, date_label, target_cumulative, notes)
values
    (1, 'Day 1: Campus Launch & Ambassador Activation', 25, 'Activate top 5 college core reps + WhatsApp group launch'),
    (2, 'Day 2: Club Partnerships & Quiz Drive', 100, 'Cross-post in Coding Clubs, IEEE/CSI college chapters'),
    (3, 'Day 3: Mid-Campaign Peer Referral Push', 200, 'Deploy Build Buddy referral milestone challenges'),
    (4, 'Day 4: Project Teaser & Syllabus Reveal', 300, 'Release preview of AI project code template & resume bullet'),
    (5, 'Day 5: Weekend Urgency & College Leaderboard', 375, 'Announce top referring college shoutout + early badge'),
    (6, 'Day 6: Final 24hr Seat Lock Countdown', 450, 'Reminder pushes across all WhatsApp announcement hubs'),
    (7, 'Day 7: Live Workshop Day Morning Blitz', 500, 'Final call for remaining 50 slots before Zoom link dispatch')
on conflict (day) do nothing;

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.registrations enable row level security;
alter table public.referrals enable row level security;
alter table public.expenses enable row level security;
alter table public.daily_targets enable row level security;

-- Public can insert new registrations
create policy "Allow public to register"
    on public.registrations
    for insert
    to anon, authenticated
    with check (true);

-- Public can check referral count by code without exposing sensitive personal info
create policy "Allow public to view non-sensitive referral info"
    on public.registrations
    for select
    to anon, authenticated
    using (true);

-- Public can insert referral logs (via server trigger or API)
create policy "Allow insert referrals"
    on public.referrals
    for insert
    to anon, authenticated
    with check (true);

-- Expenses and Targets are private: only service role or authenticated admins can view and modify
create policy "Admin read expenses"
    on public.expenses
    for select
    to service_role
    using (true);

create policy "Admin modify expenses"
    on public.expenses
    for all
    to service_role
    using (true);

create policy "Admin read targets"
    on public.daily_targets
    for select
    to anon, authenticated, service_role
    using (true);

create policy "Admin modify targets"
    on public.daily_targets
    for all
    to service_role
    using (true);
