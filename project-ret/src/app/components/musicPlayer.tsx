'use client';

import Image, { StaticImageData } from "next/image";
import placeholder from "../../../public/placeholderslider.png";
import CustomButton from "./UI/UX/customButton";
import useSound from 'use-sound'
import playImg from "@/../public/play.svg";
import pauseImg from "@/../public/pause.svg";
import { useEffect, useState } from "react";
import { useAppSelector } from "../lib/store";
import CustomInput from "@/app/components/UI/UX/customInput";

interface MusicPlayerProps {
    img?: string;
    soundUrl: string;
}

export default function MusicPlayer({ img, soundUrl }: MusicPlayerProps) {
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [currentPlayerImg, setCurrentPlayerImg] = useState<StaticImageData>(playImg);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const volume = useAppSelector((state) => state.volume.volume);
    const [play, { stop, sound, duration, pause }] = useSound(
        soundUrl,
        {
            volume: volume / 100,
            onload: () => { },
            onplay: () => setIsPlaying(true),
            onstop: () => setIsPlaying(false),
            onpause: () => setIsPlaying(false),
            onend: () => setIsPlaying(false),
        },

    );
    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(event.target.value);
        sound.seek(newTime);
        setCurrentTime(newTime);
    };
    useEffect(() => {
        sound?.volume(volume / 100);
        const interval = setInterval(() => {
            if (isPlaying) {
                setCurrentTime(sound.seek());
            }
        }, 100);
        setCurrentPlayerImg(isPlaying ? pauseImg : playImg);
        return () => clearInterval(interval);
    }, [volume, sound, isPlaying]);
    return (
        <div className="w-full h-[90vh] flex flex-col items-center justify-center">
            <Image
                className="w-auto h-3/6 portrait:h-auto my-16 shadow-[0_0_-5px_5px_#F24F1C] transition-deafultTransition radius-2xl"
                src={img ? img : placeholder}
                alt="Music"
            />
            <div className="my-10 w-full h-auto flex  items-center justify-center">
                <p className='mr-10 transition-deafultTransition'>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)<= 9 ? `0${Math.floor(currentTime % 60)}` : Math.floor(currentTime % 60)}</p>
                <CustomInput
                    width="w-1/2"
                    type="range"
                    placeholder='52'
                    className="custom-range w-full place-self-center transition-deafultTransition"
                    changeValue={handleRangeChange}
                    value={!!duration ? Math.floor(currentTime) : 0}
                    maxRange={!!duration ? Math.floor(duration) / 1000 : 100} />
                {duration !== null && (
                    <p className="ml-10">{Math.floor(duration / 60000)}:{Math.floor((duration / 1000) % 60)}</p>
                )}
            </div>
            <CustomButton
                className="mb-10"
                imgButton={{ imgSrc: currentPlayerImg, width: "w-8", height: "h-8" }}
                size="text-lg"
                color="#F24F1C"
                onClick={()=> isPlaying ? pause() : play()}
                width="w-20"
                height="h-20"
                rounded="rounded-full"
            />

        </div>
    );
}