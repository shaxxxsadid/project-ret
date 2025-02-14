import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./components/Providers/Provider";
import Header from "./components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music App",
  description: "Next musicaly app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${interTight.className}`}>
        <ReduxProvider>
          <Header title="Music App" imgClass="w-8 h-8" />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
