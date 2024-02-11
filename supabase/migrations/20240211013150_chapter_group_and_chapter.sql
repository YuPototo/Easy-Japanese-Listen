-- chapter group table --

CREATE TABLE chapter_group (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    book_id integer not null references exercise_book(id) ON DELETE CASCADE
);

ALTER SEQUENCE chapter_group_id_seq RESTART WITH 1000;

-- Enable row level security --
alter table chapter_group enable row level security;

create policy "enable read access for all users" on "public"."chapter_group" as permissive for
select
    to public using (true);

-- chapter table --

CREATE TABLE chapter (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    group_id integer not null references chapter_group(id) ON DELETE CASCADE
);

ALTER SEQUENCE chapter_id_seq RESTART WITH 1000;

-- Enable row level security --
alter table chapter enable row level security;

create policy "enable read access for all users" on "public"."chapter" as permissive for
select
    to public using (true);
