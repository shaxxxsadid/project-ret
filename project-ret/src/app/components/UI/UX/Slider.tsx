'use client'

import Image, { StaticImageData } from "next/image";
import { HandySvg } from "handy-svg";
import { useEffect, useRef, useState } from "react";

interface SliderProps {
    images: StaticImageData[];
    width?: string;
    height?: string;
    title?: string;
}

export default function Slider({ images, width, height, title }: SliderProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleClick = (isLeft: boolean): void => {
        if (sliderRef.current) {
            const scrollAmount = 223;
            const newScrollLeft = isLeft
                ? sliderRef.current.scrollLeft - scrollAmount
                : sliderRef.current.scrollLeft + scrollAmount;

            sliderRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            });
        }
    }
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>): void => {
        const container = e.currentTarget
        const scrollAmount = e.deltaY
        container.scrollBy({ left: scrollAmount * 4, behavior: 'smooth' })
    };

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => { if (isHovered) e.preventDefault() };
        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [isHovered]);
    return (
        <div
            id="slider"
            className="w-full flex justify-center items-center relative h-full overflow-hidden space-x-10 group "

        >
            <article className="absolute top-0 left-1/4">
                <h1 className="text-6xl">{title}</h1>
            </article>
            <span
                onClick={(): void => handleClick(true)}>
                <HandySvg
                    className="w-14 h-14 cursor-pointer hover:text-gray-400 transition-deafultTransition"
                    src="/_next/static/media/leftArrow.svg"
                    width={28}
                    height={28}
                    fill={'currentcolor'}
                />
            </span>
            <section
                ref={sliderRef}
                className={`${width} ${height} items-center h-full  flex overflow-hidden my-10 space-x-8`}
                onWheel={handleWheel}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <article
                    className={`${width} ${height} items-center w-full h-full flex my-10 space-x-8 transition-deafultTransition duration-500`}>
                    {images.map((image, index) => (
                            <Image
                                className="w-50 h-50"
                                src={image}
                                alt={`Slider ${index + 1}`}
                                key={index}
                            />
                    ))}
                </article>
            </section>
            <span
                onClick={(): void => handleClick(false)}>
                <HandySvg
                    className="w-14 h-14 cursor-pointer hover:text-gray-400 transition-deafultTransition"
                    src="/_next/static/media/rightArrow.svg"
                    width={32}
                    height={32}
                    fill={'currentcolor'}
                />
            </span>

        </div>
    )
}