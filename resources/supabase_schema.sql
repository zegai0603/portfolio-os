-- Create the blog_posts table
create table public.blog_posts (
  id uuid not null default gen_random_uuid (),
  slug text not null,
  title text not null,
  content text not null,
  created_at timestamp with time zone not null default now(),
  constraint blog_posts_pkey primary key (id),
  constraint blog_posts_slug_key unique (slug)
);

-- Set up Row Level Security (RLS)
-- Enable RLS
alter table public.blog_posts enable row level security;

-- Allow public read access
create policy "Allow public read access"
on public.blog_posts
for select
to public
using (true);

-- Allow authenticated users (or service role) to insert/update/delete
-- Adjust this policy based on your needs (e.g., only allow specific user email)
create policy "Allow authenticated insert"
on public.blog_posts
for insert
to authenticated
with check (true);

create policy "Allow authenticated update"
on public.blog_posts
for update
to authenticated
using (true);


-- Seed data (Vibecoding post)
insert into public.blog_posts (slug, title, content)
values (
  'vibecoding-portfolio', 
  'Vibecoding this Portfolio', 
  '# Vibecoding this Portfolio

This entire portfolio isn''t just coded; it''s **vibecoded**.

Built with the help of advanced AI agents, this OS-like interface blurs the line between a personal site and a functional desktop environment.

### The Stack
- **Next.js** for the framework
- **Supabase** for the backend (fetching this very post!)
- **Tailwind CSS** for the styling
- **Vibes** for the soul

It''s not about the lines of code, it''s about the *feeling* of the interface. This terminal you''re reading this on? It''s a vibe.

\`\`\`bash
npm run vibecode
\`\`\`
'
);
