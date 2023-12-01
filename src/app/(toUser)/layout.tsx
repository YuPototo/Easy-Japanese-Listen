import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '日语轻松学',
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
                `bg-background text-foreground antialiased`,
            )}
        >
            <body className="min-h-screen">
                <NavBar />
                <div className="container mx-auto mt-12 h-full max-w-7xl">
                    {children}
                </div>
            </body>
        </html>
    )
}
