import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '日语轻松听 - admin',
    description: '轻松进行日语听力练习',
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
                `bg-background text-foreground m-4 antialiased`,
            )}
        >
            <body className="min-h-screen">
                <div className="container max-w-7xl mx-auto h-full mt-12">
                    {children}
                </div>
            </body>
        </html>
    )
}
