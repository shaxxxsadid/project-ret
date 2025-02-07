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
        <div className="flex w-screen h-16 px-10 pb-3 items-end justify-between sticky top-0 z-50  bg-background shadow-[0_0_8px_5px_#0a0a0a]">
            <div className="flex items-end">
                <Link href={"/player"}>
                    <Image
                        className={`${imgClass} cursor-pointer`}
                        src={logo}
                        alt="Logo"
                    />
                </Link>

                <h1 className="px-8 text-2xl">{title}</h1>
            </div>

            <div className="flex h-full items-end justify-start  w-1/2 relative">
                <Search />
                <section
                    className="container relative flex w-20 h-20 items-end justify-center group"
                >
                    <Image
                        className='w-10 h-10 rounded-full bg-backgroundHeaderSearch p-2.5 mr-2 cursor-pointer group-hover:shadow-[0_0_8px_5px_#F24F1C] transition-deafultTransition'
                        src={isVolumeMuted ? volumeOff : volumeOn}
                        alt="volume"
                        onClick={onVolumeHandlerClick}
                    />
                    <Volume
                        isMuted={isVolumeMuted}
                        classNameVolume="absolute -bottom-20 mr-2 transform rotate-90 invisible w-0 opacity-0 group-hover:visible group-hover:w-32 group-hover:opacity-100 transition-deafultTransition delay-150"
                    />
                </section>

                <Image
                    className=' w-10 h-10 rounded-full bg-backgroundHeaderSearch p-2.5 cursor-pointer hover:shadow-[0_0_8px_5px_#F24F1C] transition-deafultTransition'
                    src={musicLib}
                    alt="music library"
                />
                <Image
                    className='w-12 h-10 bg-backgroundHeaderSearch rounded-full ml-8 p-2.5 cursor-pointer hover:shadow-[0_0_8px_5px_#F24F1C] transition-deafultTransition'
                    src={placeHolder}
                    alt="profile"
                />
            </div>
        </div>
    );
}
