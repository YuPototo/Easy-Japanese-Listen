-- create 1 public buckets
insert into
    storage.buckets (id, name, public)
values
    ('audios', 'audios', true);

-- Add album table
CREATE TABLE album (
    id SERIAL PRIMARY KEY,
    album_title varchar(255) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE
    album ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "public"."album" AS PERMISSIVE FOR
SELECT
    TO public USING (true);

-- Add track table
CREATE TABLE track (
    id SERIAL PRIMARY KEY,
    track_title varchar(255) NOT NULL,
    transcription jsonb NOT NULL,
    album_id integer NOT NULL REFERENCES album(id),
    storage_path VARCHAR(255) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE
    track ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "public"."track" AS PERMISSIVE FOR
SELECT
    TO public USING (true);