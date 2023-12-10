import React from 'react'

type RadioItem = {
    label: string
    value: string
}

type Props = {
    items: RadioItem[]
    selected: string
    onChange: (value: string) => void
}

const RadioGroup = ({ items, selected, onChange }: Props) => {
    return (
        <div className="flex gap-4">
            {items.map((item) => (
                <div className="my-1" key={item.label}>
                    <input
                        className=""
                        type="radio"
                        name={item.label}
                        value={item.value}
                        checked={item.value === selected}
                        onChange={() => onChange(item.value)}
                    />
                    <label
                        className="px-3 py-1 hover:cursor-pointer"
                        onClick={() => onChange(item.value)}
                    >
                        <span className="">{item.label}</span>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default RadioGroup
