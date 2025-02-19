
'use client';

import MusicPlayer from "../components/musicPlayer";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface MusicPlayerProps {
  img?: string;
  soundUrl: string;
}

export default function MediaPlayer({ img }: MusicPlayerProps) {
  const soundUrl = `/_next/static/media/Music.mp3`;
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/profile')
    }
  })
  console.log(session)
  return (
    <main className="w-full flex flex-col ">
      <MusicPlayer soundUrl={soundUrl} img={img} />
    </main>
  );
}