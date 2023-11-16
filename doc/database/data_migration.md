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

### 内容

这个阶段，所有内容都在本地添加。

每次 reset 前，都应该先导出 track 数据。

reset 之后，再导入

## Deploy to Supabase

```bash
supabase db push
```

## ref

<https://supabase.com/docs/guides/cli/local-development?access-method=postgres>
