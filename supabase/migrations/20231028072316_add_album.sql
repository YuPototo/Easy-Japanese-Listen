-- add album table
create table album (
    id serial primary key,
    album_title varchar(255) not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table
    album enable row level security;

create policy "enable read access for all users" on "public"."album" as permissive for
select
    to public using (true);