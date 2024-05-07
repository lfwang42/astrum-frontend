"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next-intl/client";
import { ChangeEvent } from "react";

interface FooterProps {
  // locale: string
}

export const Footer: React.FC<FooterProps> = () =>
  {
    return (
      <div className="relative bottom-0 left-0 w-full h-20  bg-sky-950">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            <a href="https://www.enka.network">
              <Image
                src="/enka.png"
                width={150}
                height={75}
                className="w-100 h-auto"
                alt="Powered by enka.network"
              />
            </a>
          </div>
        </div>
      </div>
    );
  };

export default Footer;
