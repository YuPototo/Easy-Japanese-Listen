'use client'

import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

export default function WavePage() {
    return (
        <div>
            <MyWaveForm audioSrc="http://localhost:54321/storage/v1/object/public/audios/8736148-23-3.m4a" />
        </div>
    )
}

function MyWaveForm({ audioSrc }: { audioSrc: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            url: audioSrc,
        })

        return () => {
            waveSurfer.destroy()
        }
    }, [audioSrc])

    return (
        <div>
            <div ref={containerRef} />
        </div>
    )
}
