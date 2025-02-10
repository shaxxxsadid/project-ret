'use client';

import Footer from "../components/footer";
import Header from "../components/Header";
import MusicPlayer from "../components/musicPlayer";

interface MusicPlayerProps {
  img?: string;
  soundUrl: string;
}

export default function MediaPlayer() {
    return (
      <main className="w-screen flex flex-col h-screen">
        <Header imgClass="w-8 h-8" title="Music App" />
        <MusicPlayer soundUrl="/_next/static/media/Music.mp3"/>
        <Footer/>
      </main>
    );
  }