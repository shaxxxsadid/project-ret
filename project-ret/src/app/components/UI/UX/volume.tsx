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
        if (isMuted) {
            setVolumeBar(0);
            dispatch(setVolume(0));
        } else {
            setVolumeBar(Number(event.target.value));
            dispatch(setVolume(Number(event.target.value)));
        }
    };
    useEffect(() => {
            if (isMuted) {
                setPreviousVolume(volumeBar);
                setVolumeBar(0);
                dispatch(setVolume(0));
            } else {
                setVolumeBar(previousVolume);
                dispatch(setVolume(previousVolume));
            }
    }, [isMuted , volumeBar, previousVolume, dispatch]);
    return (
        <input
            type="range"
            min="0"
            max="100"
            value={volumeBar}
            onChange={handleVolumeChange}
            className={`${classNameVolume} cursor-pointer `}
        />
    );
}