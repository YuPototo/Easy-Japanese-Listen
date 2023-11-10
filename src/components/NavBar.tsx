import Link from 'next/link'
import Image from 'next/image'

export default function NavBar() {
    return (
        <div className="fixed top-0 inset-x-0 h-fit border-b z-50 py-2">
            <div className="container h-full mx-auto flex items-center justify-between gap-2">
                <Link href="/" className="flex gap-2 items-center">
                    <Image
                        src="/headset64.png"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <p className="text-sm font-medium">日语轻松听</p>
                </Link>
            </div>
        </div>
    )
}
