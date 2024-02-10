import Image from 'next/image'
import Link from 'next/link'

type Props = {
    href: string
    title: string
    coverUrl: string
    background: string
}

export default function MaterialCard({
    href,
    title,
    coverUrl,
    background,
}: Props) {
    return (
        <Link
            //@ts-expect-error href can't be typed like this
            href={href}
            style={{
                background,
            }}
            className="flex h-[140px] w-[310px] gap-4 rounded-md p-2"
        >
            <Image
                className="rounded-md"
                src={coverUrl}
                alt={title}
                width="100"
                height="125"
            />
            <div className="flex flex-grow flex-col">{title}</div>
        </Link>
    )
}
