'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'

export default function YoutubeLooperPage() {
    const [url, setUrl] = useState<string>('')

    return (
        <div>
            <div className="mb-6">输入 Youtube URL</div>
            <div className="mb-10 w-4/12 text-gray-900">
                <input
                    className="w-full px-2 py-1"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <Button>
                <Link href={`/youtubeLooper/${getYoutubeId(url)}`}>
                    Confirm
                </Link>
            </Button>
        </div>
    )
}

// https:/www.youtube.com/watch?v=_htphHWq5bM
// --> _htphHWq5bM
function getYoutubeId(url: string) {
    const re = /v=([^&]+)/
    const match = re.exec(url)
    if (match) {
        return match[1]
    }
    return null
}
