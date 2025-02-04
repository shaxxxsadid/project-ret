'use client';

import Image from "next/image";
import search from "../../../public/search.svg";
import { useState } from "react";

export default function Search() {

    const [value, setValue] = useState<string>("");

    return (
        <div className="flex h-full items-end justify-center container relative mr-7">
            <Image
                className="w-5 h-5 absolute left-4 bottom-2.5 self-end cursor-pointer"
                src={search}
                alt="Search"
            />
            <input className="rounded-lg color-black h-10 w-full pl-12 bg-backgroundHeaderSearch" type="text" alt="Search"
                value={value}
                placeholder={"Search"}
                onChange={e => setValue(e.target.value)}
            />
        </div>
    );
}