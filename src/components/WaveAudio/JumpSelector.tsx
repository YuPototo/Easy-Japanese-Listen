import { Button } from '../ui/button'

type Props = {
    options: number[]
    moveBy: (seconds: number) => void
}

export default function JumpSelector({ options, moveBy }: Props) {
    return (
        <div className="flex gap-4 items-center">
            <div>move</div>
            {options.map((second) => (
                <Button
                    size="sm"
                    fill="outline"
                    key={second}
                    onClick={() => moveBy(second)}
                >
                    {second < 0 ? '-' : '+'} {Math.abs(second)} s
                </Button>
            ))}
        </div>
    )
}
