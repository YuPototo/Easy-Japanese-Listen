-- Insert album
insert into
    public .album (album_title)
values
    ('Album 1'),
    ('Album 2');

-- Insert track
insert into
    public .track (
        track_title,
        transcription,
        storage_path,
        album_id
    )
values
    (
        'N3 Test Question',
        '[{"type":"filler","endTime":2.51},{"type":"content","text":"弁当屋で男のアルバイトの人と店長が話しています。","endTime":8.36},{"type":"content","text":"男のアルバイトの人はこの後まず何ををしますか。","endTime":15},{"type":"content","speaker":"男","text":"お疲れ様です。","endTime":17.25},{"type":"content","speaker":"女","text":"あっ、吉田君、今日11時にお弁当配達する注文が入ったよ。 ","endTime":23.5},{"type":"content","speaker":"女","text":"お弁当はもうできてるから20個段ボール箱に詰めてもらえる。","endTime":28.5},{"type":"content","speaker":"男","text":"分かりました。","endTime":29.7},{"type":"content","speaker":"女","text":"配達は車を使って。","endTime":32.06},{"type":"content","speaker":"女","text":"今、車、店のうらの駐車にあるから、店の前に動かしとくね。 ","endTime":37.98},{"type":"content","speaker":"男","text":"はい","endTime":38.77},{"type":"content","speaker":"女","text":"お茶20本も忘れないで。","endTime":41.56},{"type":"content","speaker":"女","text":"お茶は冷蔵庫に入れてあるから直前に車に乗せてね。","endTime":46.58},{"type":"content","speaker":"男","text":"分りました","endTime":48.06},{"type":"filler","endTime":52.91},{"type":"content","text":"男のアルバイトの人はこの後まず何をしますか。","endTime":99999}]',
        '2020_12_n3_1_1.mp3',
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
        '[{"type":"filler","endTime":2},{"type":"content","text":"这是第1句话","endTime":4},{"type":"content","text":"这是第2句话","endTime":6},{"type":"content","text":"这是第3句话","endTime":8},{"type":"content","text":"这是第4句话","endTime":9999}]',
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
        '[{"type":"filler","endTime":2},{"type":"content","text":"这是第1句话","endTime":4},{"type":"content","text":"这是第2句话","endTime":6},{"type":"content","text":"这是第3句话","endTime":8},{"type":"content","text":"这是第4句话","endTime":9999}]',
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
        '[{"type":"filler","endTime":2},{"type":"content","text":"这是第1句话","endTime":4},{"type":"content","text":"这是第2句话","endTime":6},{"type":"content","text":"这是第3句话","endTime":8},{"type":"content","text":"这是第4句话","endTime":9999}]',
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
        '[{"type":"filler","endTime":2},{"type":"content","text":"这是第1句话","endTime":4},{"type":"content","text":"这是第2句话","endTime":6},{"type":"content","text":"这是第3句话","endTime":8},{"type":"content","text":"这是第4句话","endTime":9999}]',
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
        '[{"type":"filler","endTime":2},{"type":"content","text":"这是第1句话","endTime":4},{"type":"content","text":"这是第2句话","endTime":6},{"type":"content","text":"这是第3句话","endTime":8},{"type":"content","text":"这是第4句话","endTime":9999}]',
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