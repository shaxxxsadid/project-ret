'use client';

import Link from "next/link";
import { HandySvg } from "handy-svg";
import { deafultURL } from "../index";

export default function Footer() {
    let socials: deafultURL[] = [`/_next/static/media/github.cec5bb7c.svg`, `/_next/static/media/telegram.svg`, `/_next/static/media/email.svg`];
    let socialLinkClass: string = "h-full hover:text-gray-400 transition-deafultTransition mx-4";
    return (
        <div>
            <section className="flex justify-center items-center w-full h-28 bg-backgroundHeaderSearch">
                <h1 className="text-white cursor-default text-4xl">CONTACTS</h1>
            </section>
            <section className="flex justify-center items-center w-full h-16 bg-backgroundHeaderSearch">
                <Link
                    href="https://github.com/shaxxxsadid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClass}
                >
                    <HandySvg
                        className="w-auto h-full "
                        src={socials[0]}
                        width={32}
                        height={32}
                        fill={'currentColor'}
                    />
                </Link>
                <Link
                    href="https://t.me/shaxxxsadid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClass}
                >
                    <HandySvg
                        className="w-auto h-full "
                        src={socials[1]}
                        width={32}
                        height={32}
                        fill={'currentColor'}
                    />
                </Link>
                <Link
                    href="mailto:alexandrdobrynin2003@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClass}
                >
                    <HandySvg
                        className="w-auto h-full "
                        src={socials[2]}
                        width={32}
                        height={32}
                        fill={'currentColor'}
                    />
                </Link>
            </section>
            <section className="flex justify-center items-center w-full h-16 bg-backgroundHeaderSearch">
                <p className="text-white">© 2025 Music App. All rights reserved.</p>
            </section>
        </div>
    );
}