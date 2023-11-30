import Link from 'next/link'

type Props = {
    title: string
    href: string
    children: React.ReactNode
}

export default function ModuleCard({ title, href, children }: Props) {
    return (
        <Link
            className="flex h-36 w-36 flex-col items-center justify-start rounded-lg bg-zinc-100 px-10 shadow"
            // @ts-expect-error handle this later
            href={href}
        >
            <div className="flex w-36 flex-grow items-center justify-center rounded-t-lg bg-green-400">
                {children}
            </div>
            <div className="py-2 font-normal text-neutral-800"> {title}</div>
        </Link>
    )
}

/**
 * Todo: 实现设计稿里的 gradient background
 */
