'use client';

import MusicPlayer from "../../components/musicPlayer";

interface MusicPlayerProps {
  img?: string;
  soundUrl: string;
}

export default function MediaPlayer({ img }: MusicPlayerProps) {
    const soundUrl = `/_next/static/media/Music.mp3`;
  return (
      <main className="w-full flex flex-col ">
        <MusicPlayer soundUrl={soundUrl} img={img} />
      </main>
    );
  }