-- add album table
create table album (
    id serial primary key,
    title varchar(255) not null,
    cover_path varchar(255),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

ALTER SEQUENCE album_id_seq RESTART WITH 100;


-- -- temporarily disable row level security
-- alter table
--     album enable row level security;
-- create policy "enable read access for all users" on "public"."album" as permissive for
-- select
--     to public using (true);