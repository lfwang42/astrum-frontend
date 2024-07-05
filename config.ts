import {Pathnames, LocalePrefix} from 'next-intl/routing';

export const locales = [  'en',
  'ja',
  'zh-cn',
  'zh-tw',
  'fr',
  'es',
  'id',
  'de',
  'ko',
  'vi',
  'th',
  'ru',
  'pt',] as const;

export const defaultLocale = 'en' as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';
