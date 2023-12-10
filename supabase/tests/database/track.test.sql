begin;
select plan(4); 

SELECT has_table('track');

-- column check
SELECT has_column('track', 'id');
SELECT col_is_pk('track', 'id');

SELECT has_column( 'album',   'title' );


select * from finish();
rollback;
