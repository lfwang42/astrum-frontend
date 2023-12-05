'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import march from "./march.webp"
import {usePathname, useRouter} from 'next-intl/client';
import {ChangeEvent} from 'react';


interface NavProps {
  locale: string
};

export const Navbar: React.FC<NavProps> = ( {locale} ) => {
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
      <div className="w-full h-20 bg-sky-900 top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            <div className="px-8">
                <Link href="/">
                  <Image src={march} width={30}   height={30}   alt="cutie"/>
                </Link>
            </div>
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/relics">
                  <p>Relics</p>
                </Link>
              </li>
              <li>
                <Link href="/categories">
                  <p>Leaderboards</p>
                </Link>
              </li>
            </ul>
            <select
            className="ml-auto appearance-none bg-sky-900 py-3 pl-2 pr-6"
            defaultValue={locale}
            onChange={onSelect}>
              {langs.map((lang) => (
                <option key={lang.locale} value={lang.value}>
                  {lang.locale}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;