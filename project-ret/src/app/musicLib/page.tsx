'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import placeholder from '@/../public/placeholderslider.png';
import Loader from '@/app/components/UI/UX/Loader';
import CreatePlaylistModal from '../components/UI/modal/PlaylistModal/playlistModal';



// Пример данных плейлистов (заменить на API-запрос)
const playlists = [
    { id: '1', title: 'Pump It Up', imageUrl: placeholder },
    { id: '2', title: "80's Mix", imageUrl: placeholder },
    { id: '3', title: 'Dance Party', imageUrl: placeholder },
    { id: '4', title: 'Road Trip', imageUrl: placeholder },
    { id: '5', title: 'Rock On', imageUrl: placeholder },
    { id: '6', title: 'Chill Vibes', imageUrl: placeholder },
    { id: '7', title: 'Pop Hits', imageUrl: placeholder },
    { id: '8', title: 'Feel Good', imageUrl: placeholder },
];

export default function LibraryPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const itemsPerPage = 6; // Количество плейлистов на странице

    // Логика пагинации
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlaylists = playlists.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        setLoading(true);
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setLoading(false);
        }, 1000);
    }

    return (
        <div className="flex flex-col items-center justify-around w-screen mt-20 text-white p-4 portrait:overflow-y-scroll landscape:overflow-hidden">
            <Head>
                <title>Music Library</title>
                <meta name="description" content="Your music library with playlists" />
            </Head>
            <h1 className="text-4xl font-bold mb-8">Playlists</h1>
            {loading && (
                <Loader loader={{ colorLoader: '#F24F1C', typeLoader: 'Bouncing', strokeWidth: '10' }} width='w-1/2' height='min-h-[50vh]' />
            )}
            {!loading && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl min-h-[50vh]">
                {currentPlaylists.map((playlist) => (
                    <Link href={`/playlist/${playlist.id}`} key={playlist.id} className="text-center flex flex-col items-center justify-center">
                        <div className="relative w-48 h-48 mb-2">
                            <Image
                                src={playlist.imageUrl}
                                alt={playlist.title}
                                fill
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <p className="text-lg font-semibold">{playlist.title}</p>
                    </Link>
                ))}
            </div>}

            <div className="flex w-full justify-center items-center mt-8">
                {Array.from({ length: Math.ceil(playlists.length / itemsPerPage) }).map(
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-full w-10 h-10 ${currentPage === index + 1 ? 'bg-[#F24F1C] text-white' : 'bg-gray-700 text-gray-300'
                                }`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>

            <div className="fixed bottom-4 right-4">
                <CreatePlaylistModal/>
                
            </div>
        </div>
    );
}
