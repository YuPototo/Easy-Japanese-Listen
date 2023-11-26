import React, { useState } from 'react'

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
        <div className="flex gap-6">
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
                    <label className="p-1" onClick={() => onChange(item.value)}>
                        <span className="">{item.label}</span>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default RadioGroup
