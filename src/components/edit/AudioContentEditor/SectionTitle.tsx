import { Button } from '@/components/ui/button'
import { useAudioContentEditorDispatch } from './StateProvider'

type Props = {
    title?: string
    hasFirstSection: boolean
    sectionIndex: number
}
// 如果没有真正的第一个 section，就不显示第一个 section 的标题
// 因为这个时候的第一个 section 是默认添加的
// check：createSectionTranscription()

export default function SectionTitle({
    title,
    hasFirstSection,
    sectionIndex,
}: Props) {
    const dispatch = useAudioContentEditorDispatch()

    const handleUpdate = () => {
        dispatch({
            type: 'START_UPDATE_SECTION_TITLE',
            payload: sectionIndex,
        })
    }

    if (sectionIndex === 0) {
        if (hasFirstSection) {
            return (
                <div className="mb-2 flex items-center gap-4">
                    <div>--- {title ?? '⭐️'} ---</div>
                    <Button fill="outline" onClick={handleUpdate}>
                        update
                    </Button>
                </div>
            )
        } else return
    }

    return (
        <div className="mb-2 flex items-center gap-4">
            <div>--- {title ?? '⭐️'} ---</div>
            <Button fill="outline" onClick={handleUpdate}>
                update
            </Button>
        </div>
    )
}
