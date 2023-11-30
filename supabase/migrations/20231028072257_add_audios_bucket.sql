-- create 2 public buckets
insert into
    storage.buckets (id, name, public)
values
    ('audios', 'audios', true),
    ('images', 'images', true);
