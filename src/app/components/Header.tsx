'use client';

import Image from "next/image";
import logo from "../../../public/vercel.svg";
import placeHolder from "../../../public/placeholder.svg";
import volumeOff from "../../../public/volumeOFF.svg";
import volumeOn from "../../../public/volumeON.svg";
import musicLib from "../../../public/musicLib.svg";
import Search from "./Search";


interface HeaderProps {
    title: string;
    imgClass?: string;
}

export default function Header({ title, imgClass }: HeaderProps) {
   

    return (
        <div className="flex w-full h-16 px-10 items-end justify-between">
            <div className="flex items-end">
                <Image
                    className={`${imgClass} cursor-pointer`}
                    src={logo}
                    alt="Logo"
                />
                <h1 className="px-8 text-2xl">{title}</h1>
            </div>
            
            <div className="flex h-full items-end">
                <Search  />
                <Image
                    className='w-10 h-10 rounded-full bg-backgroundHeaderSearch p-2.5 mr-2 cursor-pointer'
                    src={volumeOn}
                    alt="Logo"
                />
                <Image
                    className='cursor-pointer'
                    src={musicLib}
                    alt="Logo"
                />
                <Image
                    className={`w-14 h-10 bg-backgroundHeaderSearch rounded-full ml-8 p-2.5 cursor-pointer`}
                    src={placeHolder}
                    alt="Logo"
                />
            </div>  
        </div>
    );
}
