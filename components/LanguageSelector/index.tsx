import { locales } from "@/config";
import { usePathname, useRouter } from "@/navigation";
import React, {  ChangeEvent, useCallback,  useEffect,  useRef,  useState} from "react";
import { CiGlobe } from "react-icons/ci";
import {useClickAway} from 'react-use';


const langNames: Record<string, string> = {
  en: 'English',
  ja: '日本語',
  'zh-cn': '中文简体',
  'zh-tw': '中文繁體',
  fr: 'Français',
  es: 'Español',
  id: 'Bahasa Indonesia',
  de: 'Deutsch',
  ko: '한국어',
  vi: 'Tiếng Việt',
  th: 'ภาษาไทย',
  ru: 'Русский',
  pt: 'Português'
}

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


  function onSelect(lang: string) {
    // const nextLocale = event.target.value;
    // @ts-expect-error -- TypeScript will validate that only known `params`
    // are used in combination with a given `pathname`. Since the two will
    // always match for the current route, we can skip runtime checks.
    router.replace(pathname, {locale: lang});
  }
  const languageList = locales.map((lang) => (
    <div

      className={`p-3 cursor-pointer ${lang == locale ? 'bg-sky-700' : 'bg-sky-800'} hover:bg-sky-700 `}
      key={lang}
      onClick={() => {
        onSelect(lang)
        setIsOpen(false);
      }}
    >
      {langNames[lang]}
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
      {isOpen && <div className="absolute bg-sky-800 top-[50px] z-10">{languageList}</div>}
    </div>
  );
};
