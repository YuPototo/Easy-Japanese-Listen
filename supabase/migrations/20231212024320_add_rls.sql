-- album
alter table
    album enable row level security;
create policy "enable read access for all users" on "public"."album" as permissive for
select
    to public using (true);


-- track
alter table
    track enable row level security;
create policy "enable read access for all users" on "public"."track" as permissive for
select
    to public using (true);