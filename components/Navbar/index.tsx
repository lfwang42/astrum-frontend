'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import march from "./march.webp"
import {usePathname, useRouter} from 'next-intl/client';
import {ChangeEvent} from 'react';
import { FiMenu } from 'react-icons/fi'

interface NavProps {
  locale: string
};

export const Navbar: React.FC<NavProps> = ( {locale} ) => {
  const router = useRouter()
  const pathname = usePathname();
  const [open, setOpen] = useState(false)
  const useWindowWide = (size: number) => {
    const [width, setWidth] = useState(0)
    
    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth)
      }
      
      window.addEventListener("resize", handleResize)
      
      handleResize()
      
      return () => { 
        window.removeEventListener("resize", handleResize)
      }
    }, [setWidth])
    return width > size
  }
  const wide = useWindowWide(1280)
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
    value: 'ja' 
  },
  {
    locale: '中文简体',
    value: 'zh-cn' 
  },
  {
    locale: '中文繁體',
    value: 'zh-tw' 
  },
  {
    locale: 'Français',
    value:  'fr', 
  },
  {
    locale: 'Español',
    value:  'es',
  },
  {
    locale: 'Bahasa Indonesia',
    value:   'id',  
  },
  {
    locale: 'Deutsch',
    value: 'de',  
  },
  {
    locale: '한국어',
    value:   'ko',
  },
  {
    locale: 'Tiếng Việt',
    value:     'vi',
  },
  {
    locale: 'ภาษาไทย',
    value:    'th', 
  },
  {
    locale: 'Русский',
    value:  'ru',
  },
  {
    locale: 'Português',
    value:   'pt',
  },

  




 
     
  ]
  return (
      <header className="xl:flex flex flex-wrap justify-between items-center h-full px-[8%] w-full flex-auto bg-sky-900 top-0 py-4">
          <div>
            <Link href="/">
              <Image src={march} width={30}   height={30}   alt="cutie"/>
            </Link>
          </div>
          <FiMenu className="xl:hidden block mr-0 h-6 w-6 cursor-pointer" onClick={() => setOpen(!open)} />
          {wide ? 
              <nav className={`xl:flex-1 xl:items-center`} >

                <ul className="text-base text-white xl:flex w-full">
                  <li className="hover:text-orange-300">
                    <Link href="/relics" >
                      <p className="xl:px-5 py-2">Relics</p>
                    </Link>
                  </li>
                  <li className="hover:text-orange-300">
                    <Link href="/categories"  >
                      <p className="xl:px-5 py-2">Leaderboards</p>
                    </Link>
                  </li>

                <div className="ml-auto">
                    <li>
                      <select
                        className="xl:px-5 py-2 appearance-none bg-sky-900"
                        defaultValue={locale}
                        onChange={onSelect}>
                        {langs.map((lang) => (
                          <option key={lang.locale} value={lang.value}>
                            {lang.locale}
                          </option>
                        ))}
                      </select>
                  </li>
                  </div>
                </ul>
            </nav>
            
            :
              <nav className={`${open ? 'block' : 'hidden'} flex flex-wrap w-full`} >

                <ul className="text-base text-white xl:flex w-full">
                  <li>
                    <Link href="/relics" >
                      <p className="xl:px-5 py-2 block text-right">Relics</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories"  >
                      <p className="xl:px-5 py-2 block text-right">Leaderboards</p>
                    </Link>
                  </li>
                    <li>
                      <select
                        className="block xl:px-5 py-2 appearance-none bg-sky-900 ml-auto"
                        defaultValue={locale}
                        onChange={onSelect}>
                        {langs.map((lang) => (
                          <option key={lang.locale} value={lang.value}>
                            {lang.locale}
                          </option>
                        ))}
                      </select>
                  </li>
                </ul>
              </nav>
            }
            
        </header>

  );
};

export default Navbar;