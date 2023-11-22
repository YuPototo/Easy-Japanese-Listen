import { Button } from '../ui/button'

function PlayBackSelector({
    options,
    playbackRate,
    setPlaybackRate,
}: {
    options: number[]
    playbackRate: number
    setPlaybackRate: (speed: number) => void
}) {
    return (
        <div className=" flex items-center gap-4">
            <div> playback</div>
            {options.map((speed) => (
                <Button
                    size="sm"
                    fill={playbackRate === speed ? 'fill' : 'outline'}
                    key={speed}
                    onClick={() => setPlaybackRate(speed)}
                >
                    {speed}
                </Button>
            ))}
        </div>
    )
}

export default PlayBackSelector
