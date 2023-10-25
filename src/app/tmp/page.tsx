import AudioPlayer, { Transcription } from '@/components/AudioPlayer'

const transcription = [
    {
        type: 'filler',
        endTime: 2.51,
    },
    {
        type: 'content',
        content: '弁当屋で男のアルバイトの人と店長が話しています。',
        endTime: 8.36,
    },
    {
        type: 'content',
        content: '男のアルバイトの人はこの後まず何ををしますか。',
        endTime: 15.0,
    },
    {
        type: 'content',
        speaker: '男',
        content: 'お疲れ様です。',
        endTime: 17.25,
    },
    {
        type: 'content',
        speaker: '女',
        content: 'あっ、吉田君、今日11時にお弁当配達する注文が入ったよ。 ',
        endTime: 23.5,
    },
    {
        type: 'content',
        speaker: '女',
        content: 'お弁当はもうできてるから20個段ボール箱に詰めてもらえる。',
        endTime: 28.5,
    },
    {
        type: 'content',
        speaker: '男',
        content: '分かりました。',
        endTime: 29.7,
    },
    {
        type: 'content',
        speaker: '女',
        content: '配達は車を使って。',
        endTime: 32.06,
    },
    {
        type: 'content',
        speaker: '女',
        content: '今、車、店のうらの駐車にあるから、店の前に動かしとくね。 ',
        endTime: 37.98,
    },

    {
        type: 'content',
        speaker: '男',
        content: 'はい',
        endTime: 38.77,
        skippable: true,
    },
    {
        type: 'content',
        speaker: '女',
        content: 'お茶20本も忘れないで。',
        endTime: 41.56,
    },
    {
        type: 'content',
        speaker: '女',
        content: 'お茶は冷蔵庫に入れてあるから直前に車に乗せてね。',
        endTime: 46.58,
    },
    {
        type: 'content',
        speaker: '男',
        content: '分りました',
        endTime: 48.06,
    },
    {
        type: 'filler',
        endTime: 52.91,
    },
    {
        type: 'content',
        content: '男のアルバイトの人はこの後まず何をしますか。',
        endTime: 99999,
    },
] as Transcription

export default async function Page() {
    return (
        <main className="m-4 flex flex-col items-center">
            <div className="m-4">This is tmp page</div>
            <AudioPlayer
                audioUrl={'https://assets.riyu.love/audios/2020_12_n3_1_1.mp3'}
                transcription={transcription}
            />
        </main>
    )
}
