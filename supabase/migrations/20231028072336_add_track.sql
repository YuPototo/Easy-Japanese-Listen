-- add track table
create table track (
    id serial primary key,
    title varchar(255) not null,
    transcription jsonb not null,
    storage_path varchar(255) not null,
    album_id integer not null references album(id),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    position_index integer not null default -1,
    sections jsonb not null default '[]'::jsonb
);

 ALTER SEQUENCE track_id_seq RESTART WITH 1000;
