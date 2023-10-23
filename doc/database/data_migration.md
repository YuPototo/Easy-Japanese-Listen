# Data Migration

## Local Development

Step 1: Run following command to create a new migration file.

```bash
supabase migration new migration_name
```

Step 2: Go to `supabase/migrations` folder and edit the migration file.

Step 3: Reset database to the current migration.

```bash
supabase db reset
```

## Deploy to Supabase

```bash
supabase db push
```

## ref

<https://supabase.com/docs/guides/cli/local-development?access-method=postgres>
