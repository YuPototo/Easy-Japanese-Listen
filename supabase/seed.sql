-- Insert album
insert into
    public .album (title, is_public)
values
    ('Test Album', TRUE),
    ('Test Track Position Album', TRUE),
    ('Test Error Album', TRUE);

-- Insert track for album: Test Track Position Album
insert into
    public .track (
        title,
        transcription,
        storage_path,
        album_id
    )
values
    (
        'N3 Test Question',
        '[{"type":"filler","endTime":2.51},{"text":"弁当屋で男のアルバイトの人と店長が話しています。","type":"content","endTime":8.36},{"text":"男のアルバイトの人はこの後まず何ををしますか。","type":"content","endTime":15},{"text":"お疲れ様です。","type":"content","endTime":17.25,"speaker":"男"},{"text":"あっ、吉田君、今日11時にお弁当配達する注文が入ったよ。 ","type":"content","endTime":23.5,"speaker":"女"},{"text":"お弁当はもうできてるから20個段ボール箱に詰めてもらえる。","type":"content","endTime":28.5,"speaker":"女"},{"text":"分かりました。","type":"content","endTime":29.7,"speaker":"男"},{"text":"配達は車を使って。","type":"content","endTime":32.06,"speaker":"女"},{"text":"今、車、店のうらの駐車にあるから、店の前に動かしとくね。 ","type":"content","endTime":37.98,"speaker":"女"},{"text":"はい","type":"content","endTime":38.77,"speaker":"男"},{"text":"お茶20本も忘れないで。","type":"content","endTime":41.56,"speaker":"女"},{"text":"お茶は冷蔵庫に入れてあるから直前に車に乗せてね。","type":"content","endTime":46.58,"speaker":"女"},{"text":"分りました","type":"content","endTime":48.06,"speaker":"男"},{"type":"filler","endTime":52.91},{"text":"男のアルバイトの人はこの後まず何をしますか。","type":"content","endTime":99999}]',
        '2020_12_n3_1_1.mp3',
      
        (
            select
                id
            from
                public .album
            where
                title = 'Test Album'
        )
    );


-- Insert track for album: Test Track Position Album
insert into
    public .track (
        title,
        transcription,
        storage_path,
        position_index,
        album_id
    )
values
    (
        'Track 1',
        '[{"type":"content","text":"这是第一句话","endTime":9999}]',
        'track_1.mp3',
        1,
        (
            select
                id
            from
                public .album
            where
                title = 'Test Track Position Album'
        )
    ),
    (
        'Track 2',
        '[{"type":"content","text":"这是第一句话","endTime":9999}]',
        'track_2.mp3',
        2,
        (
            select
                id
            from
                public .album
            where
                title = 'Test Track Position Album'
        )
    ),
    (
        'Track 3',
        '[{"type":"content","text":"这是第一句话","endTime":9999}]',
        'track_1.mp3',
        3,
        (
            select
                id
            from
                public .album
            where
                title = 'Test Track Position Album'
        )
    );

-- Insert track for error album
insert into
    public .track (
        title,
        transcription,
        storage_path,
        album_id
    )
values
    (
        'Track 1: transcription validation error',
        '[{"type999":"content","text":"这是第一句话","endTime":9999}]',
        'track_1.mp3',
        (
            select
                id
            from
                public .album
            where
                title = 'Test Error Album'
        )
    ),
    (
        'Track 2: audio not found',
        '[{"type":"content","text":"这是第一句话","endTime":9999}]',
        'not-found.mp3',
        (
            select
                id
            from
                public .album
            where
                title = 'Test Error Album'
        )
    );