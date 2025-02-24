'use client';
import Footer from "./components/footer";
import Slider from "./components/UI/UX/Slider";
import Title from "./components/UI/UX/title";
import { config } from 'dotenv';
// import React, { useEffect, useState } from 'react';
import placeholder from "@/../public/placeholderslider.png";
config();

const src = placeholder.src;

// interface ResponseItem {
//   download_url: string;
// }

// async function getPlaceHolder(): Promise<string[]> {
//   const response = await fetch('/api/placeHolder');
//   const data: ResponseItem[] = await response.json();
//   return data.map((item) => item.download_url);
// }

export default function Home() {
  // const [images, setImages] = useState<string[]>([]);

  // useEffect(() => {
  //   async function fetchImages() {
  //     const imageUrls = await getPlaceHolder();
  //     setImages(imageUrls);
  //   }
    
  //   fetchImages();
  // }, []);
  return (
    <div className="w-full ">
      <Title title="Music App" />
      <Slider height="h-50" width="w-1/2" title="New & hot: Pop" images={[src,src,src,src,src,src,src,src,src,src,src]} />
      <Slider height="h-50" width="w-1/2" title="Slider" images={[src,src,src,src,src,src,src,src,src,src,src]} />
      <Slider height="h-50" width="w-1/2" title="Charts" images={[src,src,src,src,src,src,src,src,src,src,src]} />
      <Footer />
    </div>
  );
}
