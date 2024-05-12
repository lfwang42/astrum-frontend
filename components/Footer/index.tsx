"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Translate } from "../Translate";

interface FooterProps {
  // locale: string
}

export const Footer: React.FC<FooterProps> = () =>
  {
    return (
      <div className="relative bottom-0 left-0 w-full h-20  bg-sky-950">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center h-full gap-2">
            <a href="https://www.enka.network">
              <Image
                src="/enka.png"
                width={150}
                height={75}
                className="h-auto w-auto"
                alt="Powered by enka.network"
              />
            </a>
            <div><Link href="/privacy" className="hover:text-orange-400 font-medium ml-4 text-gray-50"><Translate str={'Privacy Policy'}/></Link></div>
          </div>

        </div>
      </div>
    );
  };

export default Footer;
