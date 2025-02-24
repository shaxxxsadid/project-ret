'use client';

import Image from "next/image";
import logo from "../../../public/vercel.svg";
import placeHolder from "../../../public/placeholder.svg";
import volumeOff from "../../../public/volumeOFF.svg";
import volumeOn from "../../../public/volumeON.svg";
import musicLib from "../../../public/musicLib.svg";
import Search from "./Search";
import Volume from "./UI/UX/volume";
import { useState } from "react";
import Link from "next/link";

interface HeaderProps {
    title: string;
    imgClass?: string;
}

export default function Header({ title, imgClass }: HeaderProps) {
    const [isVolumeMuted, setIsVolumeMuted] = useState<boolean>(false);

    const onVolumeHandlerClick = (): void => setIsVolumeMuted(!isVolumeMuted);

    return (
        <header className="flex w-full h-16 px-4 sm:px-6 lg:px-10 pb-3 items-end justify-between sticky top-0 z-50 bg-background shadow-[0_0_8px_5px_#0a0a0a]">
            {/* Логотип и заголовок */}
            <div className="flex items-end space-x-4 sm:space-x-8">
                <Link href="/">
                    <Image
                        className={`${imgClass} cursor-pointer w-10 h-10 sm:w-12 sm:h-12`}
                        src={logo}
                        alt="Logo"
                        priority
                    />
                </Link>
                <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
            </div>

            {/* Поиск */}
            <div className="flex flex-1 max-w-[50%] sm:max-w-[40%] lg:max-w-[30%] h-full items-end justify-center">
                <Search />
            </div>

            {/* Иконки управления */}
            <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
                {/* Громкость */}
                <section className="relative group">
                    <Image
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-backgroundHeaderSearch p-2 cursor-pointer transition-transform hover:scale-110 hover:shadow-[0_0_8px_5px_#F24F1C]"
                        src={isVolumeMuted ? volumeOff : volumeOn}
                        alt="Volume"
                        onClick={onVolumeHandlerClick}
                    />
                    <Volume
                        isMuted={isVolumeMuted}
                        classNameVolume="absolute -bottom-20 -right-11 transform rotate-90 opacity-0 invisible w-0 group-hover:opacity-100 group-hover:visible group-hover:w-32 transition-all duration-300"
                    />
                </section>

                {/* Музыкальная библиотека */}
                <Link href="/musicLib">
                    <Image
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-backgroundHeaderSearch p-2 cursor-pointer transition-transform hover:scale-110 hover:shadow-[0_0_8px_5px_#F24F1C]"
                        src={musicLib}
                        alt="Music Library"
                    />
                </Link>

                {/* Профиль */}
                <Link href="/profile" className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-backgroundHeaderSearch cursor-pointer transition-transform hover:scale-110 hover:shadow-[0_0_8px_5px_#F24F1C]">
                    <Image
                        className="w-4 h-4 sm:w-5 sm:h-5 object-cover"
                        src={placeHolder}
                        alt="Profile"
                    />
                </Link>
            </div>
        </header>
    );
}