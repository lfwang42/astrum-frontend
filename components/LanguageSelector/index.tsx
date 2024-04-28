import React, {  useCallback,  useEffect,  useRef,  useState} from "react";
import {usePathname, useRouter} from 'next-intl/client';
import { CiGlobe } from "react-icons/ci";
import {useClickAway} from 'react-use';

const langs = [{
    name: 'English',
    locale: 'en'
  },
  {
    name: '日本語',
    locale: 'ja' 
  },
  {
    name: '中文简体',
    locale: 'zh-cn' 
  },
  {
    name: '中文繁體',
    locale: 'zh-tw' 
  },
  {
    name: 'Français',
    locale:  'fr', 
  },
  {
    name: 'Español',
    locale:  'es',
  },
  {
    name: 'Bahasa Indonesia',
    locale:   'id',  
  },
  {
    name: 'Deutsch',
    locale: 'de',  
  },
  {
    name: '한국어',
    locale:   'ko',
  },
  {
    name: 'Tiếng Việt',
    locale:     'vi',
  },
  {
    name: 'ภาษาไทย',
    locale:    'th', 
  },
  {
    name: 'Русский',
    locale:  'ru',
  },
  {
    name: 'Português',
    locale:   'pt',
  }]

type LanguageProps = {
    locale: string
}

export const LanguageSelector: React.FC<LanguageProps> = ({ locale }) => {
    const ref = useRef(null);
  useClickAway(ref, () => {
    handleClose()
  });
  // const { screenWidth } = useContext(AdProviderContext);
  const [language, setLanguage] = useState(locale)
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const pathname = usePathname();
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);


  function onSelect(l: string) {
    // router.push({ pathname, query }, asPath, { locale: nextLocale })
    router.replace(pathname, {locale: l});
  }
  const languageList = langs.map((lang) => (
    <div

      className={`p-3 cursor-pointer hover:bg-sky-800 ${lang.locale == locale ? 'bg-sky-800' : 'bg-sky-900'}`}
      key={lang.locale}
      onClick={() => {
        onSelect(lang.locale)
        setIsOpen(false);
      }}
    >
      {lang.name}
    </div>
  ));

  return (
    <div ref={ref} className="relative top-0">
      <a className="flex flex-row items-center gap-1 font-medium text-lg"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <CiGlobe size={25}/><span className="hover:text-orange-300"> {locale.toUpperCase()}</span>
      </a>
      {isOpen && <div className="absolute bg-sky-900 top-[50px]">{languageList}</div>}
    </div>
  );
};
