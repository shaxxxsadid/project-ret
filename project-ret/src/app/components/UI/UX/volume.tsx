'use client';

import { useEffect, useState } from "react";
import { setVolume } from "@/app/lib/features/AudioContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store";
interface VolumeProps {
    classNameVolume?: string;
    isMuted: boolean;
}

export default function Volume({ classNameVolume, isMuted }: VolumeProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [volumeBar, setVolumeBar] = useState<number>(50);
    const [previousVolume, setPreviousVolume] = useState<number>(50);

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newVolume = Number(event.target.value);
        if (!isMuted) {
            setVolumeBar(newVolume);
            setPreviousVolume(newVolume);
            dispatch(setVolume(newVolume));
        }
    };

    useEffect(() => {
        if (isMuted) {
            dispatch(setVolume(0));
        } else {
            dispatch(setVolume(previousVolume));
            setVolumeBar(previousVolume);
        }
    }, [isMuted, dispatch, previousVolume]);

    return (
        <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volumeBar}
            onChange={handleVolumeChange}
            className={`${classNameVolume} cursor-pointer`}
        />
    );
}