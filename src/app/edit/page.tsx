import ModuleCard from '@/components/ModuleCard'
import { Headphones } from 'lucide-react'

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-10">
            <div className="mt-16 flex flex-col items-center">
                <ModuleCard href="/edit/listen" title="精听">
                    <Headphones size={64} />
                </ModuleCard>
            </div>
        </div>
    )
}
