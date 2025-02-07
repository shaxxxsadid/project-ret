'use client';

import Image from "next/image";
import placeholder from "../../../public/placeholderslider.png";
import CustomButton from "./UI/UX/customButton";
import useSound from 'use-sound'
import playImg from "../../../public/play.svg";
import pauseImg from "@/../public/pause.svg";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../lib/store";

interface MusicPlayerProps {
    img?: string;
}

export default function MusicPlayer({ img }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const volume = useAppSelector((state) => state.volume.volume);
    const soundUrl = '/_next/static/media/Music.mp3';
    const [play, { stop, sound }] = useSound(
        soundUrl,
        { volume: volume/100 }
    );
    const handlePlay = () => {
        if (isPlaying) {
            stop();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };
    useEffect(() => {
        if (sound) {
            sound.volume(volume / 100); // Обновляем громкость вручную
        }
    }, [volume, sound]);
    return (
        <div className="w-full h-1/2 flex flex-col items-center justify-center rounded-">

            <Image
                className="w-fullh-20"
                src={img ? img : placeholder}
                alt="Music"
            />
           
            <CustomButton
                className="m-10"
                imgButton={{ imgSrc: isPlaying ? pauseImg : playImg, width: "w-8", height: "h-8" }}
                size="text-lg"
                color="#F24F1C"
                onClick={handlePlay}
                width="w-20"
                height="h-15"
                rounded="rounded-2xl"
            />
        </div>
    );
}