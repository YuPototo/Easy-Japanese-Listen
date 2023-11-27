import { useState } from 'react'
import { Button } from '../ui/button'

export default function HotkeyExplain() {
    const [show, setShow] = useState(false)
    return (
        <div className="mb-8 flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <h3>Hotkey</h3>
                <Button
                    onClick={() => setShow((prev) => !prev)}
                    size="sm"
                    fill="outline"
                >
                    {show ? 'hide' : 'show'}
                </Button>
            </div>
            {show && (
                <>
                    <div className="flex gap-8">
                        <code className="bg-gray-700 px-2">alt + space</code>{' '}
                        <div> play/pause</div>
                    </div>
                    <div className="flex gap-8">
                        <code className="bg-gray-700 px-2">alt + left</code>{' '}
                        <div>move back 2 seconds</div>
                    </div>
                    <div className="flex gap-8">
                        <code className="bg-gray-700 px-2">alt + right</code>{' '}
                        <div>move forward 2 seconds</div>
                    </div>
                    <div className="flex gap-8">
                        <code className="bg-gray-700 px-2">alt + up</code>{' '}
                        <div>set A/B point</div>
                    </div>
                </>
            )}
        </div>
    )
}
