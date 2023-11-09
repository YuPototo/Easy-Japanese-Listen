import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '日语轻松听',
    description: '轻松进行日语听力练习',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={clsx(inter.className, 'm-4')}>{children}</body>
        </html>
    )
}
