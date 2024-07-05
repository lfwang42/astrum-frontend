import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import {Pathnames, LocalePrefix} from 'next-intl/routing';
import { locales } from './config';

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
}


export const localePrefix: LocalePrefix<typeof locales> = 'always';
export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, pathnames});