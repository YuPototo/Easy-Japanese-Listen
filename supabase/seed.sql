-- Insert album
insert into
    public .album (id, album_title)
values
    (100, 'Test Track Postion Album'),
    (101, 'Test Error Album');

-- Insert track for album 100
insert into
    public .track (
        id,
        track_title,
        transcription,
        storage_path,
        position_index,
        album_id
    )
values
    (
        1001,
        'Track 1',
        '[{"type":"content","text":"这是第一句话","endTime":9999}]',
        'track_1.mp3',
        1,
        100
    ),
    (
        1002,
        'Track 2',
        '[{"type":"content","text":"这是第一句话","endTime":9999}]',
        'track_2.mp3',
        2,
        100
    ),
    (
        1003,
        'Track 3',
        '[{"type":"content","text":"这是第一句话","endTime":9999}]',
        'track_1.mp3',
        3,
        100
    );

-- Insert track for album 101
insert into
    public .track (
        id,
        track_title,
        transcription,
        storage_path,
        position_index,
        album_id
    )
values
    (
        1011,
        'Track 1: transcription validation error',
        '[{"type999":"content","text":"这是第一句话","endTime":9999}]',
        'track_1.mp3',
        1,
        101
    ),
    (
        1012,
        'Track 2: audio not found',
        '[{"type":"content","text":"这是第一句话","endTime":9999}]',
        'not-found.mp3',
        2,
        101
    );