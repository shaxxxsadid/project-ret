"use client";

interface CustomButtonProps {
    title: string
    color?: string
    size?: string
    onClick?: () => void
    width?: string
    height?: string
    className?: string
}

export default function CustomButton({ title, color, size, onClick, width, height, className }: CustomButtonProps) {
    return (
        <button
            className={`${size} hover:shadow-[0_0_8px_5px_${color}] ${width} ${height} ${className} transition-deafultTransition text-white font-bold py-2 px-4 rounded-full`}
            style={{ backgroundColor: color }}
            onClick={onClick}
        >
            {title}
        </button>
    )
}