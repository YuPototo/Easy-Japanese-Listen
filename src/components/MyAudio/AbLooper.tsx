import formatTime from '@/lib/formatTime'
import React from 'react'

type Props = {
    aPoint: number | null
    bPoint: number | null
    onSetPoint: () => void
}

export const AbLooper: React.FC<Props> = ({ aPoint, bPoint, onSetPoint }) => {
    return (
        <div className="mt-10">
            <div className="flex gap-4">
                {aPoint === null ? (
                    <></>
                ) : (
                    <div className="badge badge-primary">
                        A {formatTime(aPoint)}
                    </div>
                )}
                {bPoint === null ? (
                    <></>
                ) : (
                    <div className="badge badge-primary">
                        B {formatTime(bPoint)}
                    </div>
                )}
            </div>
        </div>
    )
}
