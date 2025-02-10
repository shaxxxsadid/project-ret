'use client';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import placeholder from '../../../public/placeholder.svg';
import { HandySvg } from "handy-svg";
import Header from '../components/Header';

//  заменить на API-запрос
const user = {
  id: '1',
  name: 'John Doe',
  username: 'johndoe',
  bio: 'Software Developer and Music Enthusiast',
  avatarUrl: `/_next/static/media/placeholder.svg`, // Путь к изображению в папке public
  location: 'New York, USA',
};

export default function ProfilePage() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden flex flex-col items-center justify-stretch">
      <Header title="Profile" imgClass="w-8 h-8" />
      <div className=' flex flex-col items-center justify-center w-fit h-fit bg-neutral-800 p-10 rounded-2xl'>
        <Head>
          <title>Profile - {user.name}</title>
          <meta name="description" content={`Profile of ${user.name}`} />
        </Head>

        {/* Аватар пользователя */}
        <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
          <HandySvg
            className="w-32 h-auto object-cover"
            src={user.avatarUrl}
            alt={`${user.name}'s avatar`}
          />
        </div>

        {/* Имя и имя пользователя */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-400">@{user.username}</p>
        </div>

        {/* Биографию и местоположение */}
        <div className="text-center mb-4">
          <p className="text-lg">{user.bio}</p>
          <p className="text-gray-400">{user.location}</p>
        </div>
      </div>
    </div>
  );
}
