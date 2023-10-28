-- create 1 public buckets
insert into
    storage.buckets (id, name, public)
values
    ('audios', 'audios', true);