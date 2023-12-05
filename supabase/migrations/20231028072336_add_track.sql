-- add track table
create table track (
    id serial primary key,
    title varchar(255) not null,
    transcription jsonb not null,
    storage_path varchar(255) not null,
    album_id integer not null references album(id),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    position_index integer,
    sections jsonb
);

-- -- temporarily disable row level security
-- alter table
--     track enable row level security;
-- create policy "enable read access for all users" on "public"."track" as permissive for
-- select
--     to public using (true);