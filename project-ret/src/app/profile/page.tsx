'use client';
import Head from 'next/head';
import { HandySvg } from "handy-svg";
import { redirect } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';
import CustomButton from '../components/UI/UX/customButton';
import Image from 'next/image';
import AnimatedBackground from '../components/UI/UX/animatedBackground';

interface User {
  name: string;
  email: string;
  image?: string;
}

export default function ProfilePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/profile')
    }
  })
  const user: User = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    image: session?.user?.image ?? "",
  }

  const userImage = user.image ? (
    <Image
      className="w-32 h-auto object-cover"
      src={user.image}
      width={200}
      height={200}
      alt={user.name ?? "Profile Pic"}
      priority={true}
    />
  ) : (
    <HandySvg
      className="w-32 h-auto object-cover"
      src={`placeholder.svg`}
      alt={`NONE's avatar`}
    />
  )
  console.log(session)
  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center">
      <AnimatedBackground />
      <div className=' flex flex-col items-center justify-center xl:w-[20vw] lg:w-[30vw] md:w-[40vw] sm:w-[40vw] h-fit bg-neutral-800 p-10 rounded-2xl'>
        <Head>
          <title>Profile - {user.name}</title>
          <meta name="description" content={`Profile of ${user.name}`} />
        </Head>

        {/* Аватар пользователя */}
        <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
          {userImage}

        </div>

        {/* Имя и имя пользователя */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>

        {/* Биографию и местоположение */}
        <CustomButton
          title='Sign out'
          onClick={() => signOut()}
          height='h-15'
          width='auto'
          className='bg-red-500 p-5 rounded-xl hover:bg-red-600 transition-defaultTransition'
        />
      </div>
    </div>
  );
}
