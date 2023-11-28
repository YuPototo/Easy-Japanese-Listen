-- An example test file.

begin;
select plan(1); -- only one statement to run

SELECT has_column(
    'auth',  -- The first argument is the schema name.
    'users',  -- The second argument is the table name.
    'id',  -- The third argument is the column name.
    'id should exist'  -- The fourth argument is the test description.
);

select * from finish();
rollback;
