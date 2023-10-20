-- create test section
CREATE TABLE test_section (
    id SERIAL PRIMARY KEY,
    section_name VARCHAR(255) NOT NULL
);

ALTER TABLE
    test_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "public"."test_section" AS PERMISSIVE FOR
SELECT
    TO public USING (true);