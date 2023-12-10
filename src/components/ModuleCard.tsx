import Link from 'next/link'
import type { Route } from 'next'

// I can't use a Type here because I need to pass generic to types
// Or can I?

export default function ModuleCard<T extends string>({
    title,
    href,
    children,
}: {
    title: string
    href: Route<T> | URL
    children: React.ReactNode
}) {
    return (
        <Link
            className="flex h-36 w-36 flex-col items-center justify-start rounded-lg bg-zinc-100 px-10 shadow"
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
 * Todo p3: 实现设计稿里的 gradient background
 */
