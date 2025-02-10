'use client'

import { CSSProperties, useEffect, useState } from "react"

interface CustomInputProps {
    type: string
    placeholder?: string
    value: string | number
    className?: string
    inlineStyle?: CSSProperties
    maxRange?: number
    changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
    width: string
}

export default function CustomInput({ type, placeholder, value, className, inlineStyle, maxRange, changeValue, width }: CustomInputProps) {
    const [valueInput, setValueInput] = useState<string | number>(value);
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeValue(e);
    }
    useEffect(() => {
        setValueInput(value);
    }, [value]);
    return (
        <div className={`${width} flex justify-center items-center h-1/4`}>
            {
                <input
                    max={!!maxRange ? maxRange : undefined}
                    min={0}
                    style={{ ...inlineStyle }}
                    type={type}
                    placeholder={placeholder}
                    value={valueInput}
                    onChange={handleChangeValue}
                    className={className}
                />
            }</div>

    )
}