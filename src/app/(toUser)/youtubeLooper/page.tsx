'use client'

import { Button } from '@/components/ui/button'
import getYoutubeId from '@/lib/getYoutubeId'
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
            <Button
                onClick={() => {
                    window.location.href = `/youtubeLooper/${getYoutubeId(url)}`
                }}
            >
                Confirm
            </Button>
        </div>
    )
}
