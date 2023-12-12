# How to reset database

How to reset database in Supabase cloud.

```bash
supabase db reset --linked
```

very dangerous command. use with caution!!

Please note that this process will delete all data and schema changes in your cloud database and replace it with the local migrations and seed data. Be sure to back up any important data before proceeding.

it's worth noting that the db reset command only affects the public schema and ignores all Supabase managed schemas, including auth, storage, extensions, etc. It only drops objects in the public schema to preserve default schema privileges for supabase_admin
