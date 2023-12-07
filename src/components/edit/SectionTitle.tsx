import { Button } from '../ui/button'

type Props = {
    title?: string
    hasFirstSection: boolean
    sectionIndex: number
    onUpdate: () => void
}
// 如果没有真正的第一个 section，就不显示第一个 section 的标题
// 因为这个时候的第一个 section 是默认添加的
// check：createSectionTranscription()

export default function SectionTitle({
    title,
    hasFirstSection,
    sectionIndex,
    onUpdate,
}: Props) {
    if (sectionIndex === 0) {
        if (hasFirstSection) {
            return (
                <div className="mb-2 mt-4 flex items-center gap-4">
                    <div>--- {title ?? '⭐️'} ---</div>
                    <Button fill="outline" onClick={onUpdate}>
                        update
                    </Button>
                </div>
            )
        } else return
    }

    return (
        <div className="mb-2 mt-4 flex items-center gap-4">
            <div>--- {title ?? '⭐️'} ---</div>
            <Button fill="outline" onClick={onUpdate}>
                update
            </Button>
        </div>
    )
}
