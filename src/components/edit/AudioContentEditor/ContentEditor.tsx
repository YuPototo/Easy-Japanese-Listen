import { Button } from '@/components/ui/button'
import AudioInfo from './AudioInfo'
import AudioWavePlayer from './AudioWavePlayer'
import AudioContent from './AudioContent'

export default function ContentEditor() {
    return (
        <>
            <AudioInfo />
            <AudioWavePlayer />

            <AudioContent />

            <div className="mt-10">
                <Button onClick={() => console.log('todo')}>Submit</Button>
            </div>
        </>
    )
}
