begin;
select plan(4); 

SELECT has_table('album');

-- column check
SELECT has_column('album', 'id');
SELECT col_is_pk('album', 'id');

SELECT has_column( 'album',   'title' );


select * from finish();
rollback;
