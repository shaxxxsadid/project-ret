'use client';
import Footer from "./components/footer";
import Slider from "./components/UI/UX/Slider";
import placeholderslider from "../../public/placeholderslider.png";
import Title from "./components/UI/UX/title";
import { config } from 'dotenv';

config();
console.log(process.env.DB_URI);
export default function Home() {
  return (
    <div className="w-full ">
      <Title title="Music App" />
      <Slider height="h-50" width="w-1/2" title="Slider" images={[placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider]} />
      <Slider height="h-50" width="w-1/2" title="Slider" images={[placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider]} />
      <Slider height="h-50" width="w-1/2" title="Slider" images={[placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider]} />
      <Footer />
    </div>
  );
}
