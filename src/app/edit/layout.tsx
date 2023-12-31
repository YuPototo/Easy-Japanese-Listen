import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '日语轻松练 - admin',
    description: '',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className={cn(
                inter.className,
                `m-4 bg-background text-foreground antialiased`,
            )}
        >
            <body className="min-h-screen">
                <div className="container mx-auto mt-12 h-full max-w-7xl">
                    {children}
                </div>
            </body>
        </html>
    )
}
