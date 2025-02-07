'use client';
import Header from "./components/Header";
import Footer from "./components/footer";
import Slider from "./components/UI/UX/Slider";
import placeholderslider from "../../public/placeholderslider.png";
import Title from "./components/UI/UX/title";

export default function Home() {
  return (
    <div className="w-full">
      <Header imgClass="w-8 h-8" title="Music App" />
      <Title title="Music App" />
      <Slider height="h-50" width="w-1/2" title="Slider" images={[placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider]} />
      <Slider height="h-50" width="w-1/2" title="Slider" images={[placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider]} />
      <Slider height="h-50" width="w-1/2" title="Slider" images={[placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider, placeholderslider]} />
      <Footer />
    </div>
  );
}
