'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname, useRouter} from 'next-intl/client';
import {ChangeEvent} from 'react';


interface FooterProps {
  locale: string
};

export const Footer: React.FC<FooterProps> = ( {locale} ) => {
  const router = useRouter()
  const pathname = usePathname();
  function onSelect(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    // router.push({ pathname, query }, asPath, { locale: nextLocale })
    router.replace(pathname, {locale: nextLocale});
  }
  const langs = [{
    locale: 'English',
    value: 'en'
  },
  {
    locale: '日本語',
    value: 'jp' 
  }    
  ]
  return (
    <>
      <div className="w-full h-20 bg-sky-950 absolute bottom-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <a href='https://www.enka.network'><Image src="/enka.png" width={150} height={75} alt='Powered by enka.network'/></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;