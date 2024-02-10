-- Enum for JLPT test level and test section --
CREATE TYPE TestLevel AS ENUM ('N1', 'N2', 'N3', 'N4', 'N5');

CREATE TYPE TestSection AS ENUM ('listening', 'reading', 'grammar', 'vocabulary');

-- Exercise book table --
CREATE TABLE exercise_book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    test_level TestLevel NOT NULL,
    test_section TestSection NOT NULL,
    is_public boolean not null default false,
    cover_path varchar(255)
);

ALTER SEQUENCE exercise_book_id_seq RESTART WITH 1000;

alter table exercise_book enable row level security;

create policy "enable read access for all users" on "public"."exercise_book" as permissive for
select
    to public using (true);