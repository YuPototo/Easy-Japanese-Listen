-- add album table
create table album (
    id serial primary key,
    title varchar(255) not null,
    is_public boolean not null default false,
    cover_path varchar(255),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

ALTER SEQUENCE album_id_seq RESTART WITH 100;
