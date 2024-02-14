'use client' // Error components must be Client Components

/**
 * Attention:
 * > The root app/error.js boundary does not catch errors thrown in the root app/layout.js or app/template.js component.
 *
 * Ref: https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 */
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center ">
            <h2>出错了 😭</h2>
            <div className="mt-8">
                <Button>
                    <Link href="/">回到首页</Link>
                </Button>
            </div>
        </div>
    )
}
