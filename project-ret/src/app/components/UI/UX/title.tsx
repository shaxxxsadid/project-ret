'use client'
import BackgroundImage from "../../../../../public/placeholderBgMain.png"
import CustomButton from "./customButton"

interface TitleProps {
    title: string
}

export default function Title({ title }: TitleProps) {
    return (
        <section className="flex justify-center items-center w-full h-96 my-10 ml-5">
            <article className="w-1/2 h-96 bg-cover bg-center flex flex-col items-start justify-end relative rounded-2xl" style={{ backgroundImage: `url(${BackgroundImage.src})` }}>      
                <h1 className=" ml-10 text-6xl text-white font-extrabold">{title}</h1>
                <CustomButton
                    className="m-10"
                    title="Click me"
                    size="text-lg"
                    color="#F24F1C"
                    onClick={() => console.log("Clicked!")}
                    width="w-1/6"
                    height="h-15"
                />
            </article>
        </section>
    )
}