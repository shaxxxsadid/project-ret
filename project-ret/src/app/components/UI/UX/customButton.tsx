"use client";

import Image, { StaticImageData } from "next/image";

interface CustomButtonProps {
    title?: string
    color?: string
    size?: string
    onClick?: () => void
    width?: string
    height?: string
    className?: string
    imgButton?: {
        imgSrc: StaticImageData
        width?: string
        height?: string
    }
    rounded?: string
}

export default function CustomButton({ title, color, size, onClick, width, height, className, imgButton, rounded }: CustomButtonProps) {
    return (
        <button
            className={`${size} hover:shadow-[0_0_8px_5px_${color}] ${width} ${height} ${className} transition-deafultTransition flex items-center justify-center text-white font-bold py-2 px-4 ${!!rounded ? rounded : "rounded-full"}`}
            style={{ backgroundColor: color }}
            onClick={onClick}
        >
            {!!title
                ?
                title
                :
                <Image
                    className={`${imgButton?.width} ${imgButton?.height}`}
                    src={imgButton?.imgSrc?.src || ""}
                    alt="Play"
                />
            }
        </button>
    )
}