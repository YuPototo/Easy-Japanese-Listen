import { Button } from '@/components/ui/button'
import AudioInfo from './AudioInfo'
import AudioWavePlayer from './AudioWavePlayer'
import ContentTree from './ContentTree'

export default function ContentEditor() {
    return (
        <>
            <AudioInfo />
            <AudioWavePlayer />

            <ContentTree />

            <div className="mt-10">
                <Button onClick={() => console.log('todo')}>Submit</Button>
            </div>
        </>
    )
}
