'use client';

import { useEffect, useState } from "react";
interface VolumeProps {
    classNameVolume?: string;
    isMuted: boolean;
}

export default function Volume({ classNameVolume, isMuted }: VolumeProps) {
    const [volume, setVolume] = useState<number>(50);
    const [previousVolume, setPreviousVolume] = useState<number>(50);
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        isMuted ? setVolume(0) : setVolume(Number(event.target.value));
    };
    useEffect(() => {
            if (isMuted) {
                setPreviousVolume(volume);
                setVolume(0);
            } else {
                setVolume(previousVolume);
            }
    }, [isMuted]);
    return (
        <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className={`${classNameVolume} cursor-pointer `}
        />
    );
}