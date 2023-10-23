-- Insert test_section
insert into
    public .test_section (section_name)
values
    ('词汇'),
    ('语法'),
    ('阅读'),
    ('听力');

-- Insert album
insert into
    public .album (album_title)
values
    ('Album 1'),
    ('Album 2');

-- Insert track
insert into
    public .track (track_title, storage_path, album_id)
values
    (
        'Track 1',
        'track_1.mp3',
        (
            select
                id
            from
                public .album
            where
                album_title = 'Album 1'
        )
    ),
    (
        'Track 2',
        'track_2.mp3',
        (
            select
                id
            from
                public .album
            where
                album_title = 'Album 1'
        )
    ),
    (
        'Track 3',
        'track_3.mp3',
        (
            select
                id
            from
                public .album
            where
                album_title = 'Album 1'
        )
    ),
    (
        'Track 4',
        'track_4.mp3',
        (
            select
                id
            from
                public .album
            where
                album_title = 'Album 2'
        )
    ),
    (
        'Track 5',
        'track_5.mp3',
        (
            select
                id
            from
                public .album
            where
                album_title = 'Album 2'
        )
    ),
    (
        'Track 6',
        'track_6.mp3',
        (
            select
                id
            from
                public .album
            where
                album_title = 'Album 2'
        )
    );