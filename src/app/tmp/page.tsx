import AudioPlayer from '@/components/AudioPlayer'

const sentences = ['sentence 1', 'sentence 2', 'sentence 3', 'sentence 4']
const breakpoints = [2, 4, 6]
export default async function Page() {
    return (
        <main className="m-4">
            <div>This is tmp page</div>
            <AudioPlayer sentences={sentences} breakpoints={breakpoints} />
        </main>
    )
}
