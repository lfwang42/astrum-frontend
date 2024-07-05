// This function can be marked `async` if using `await` inside
import createMiddleware from 'next-intl/middleware';
import { localePrefix } from './navigation';
import { locales } from './config';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  localePrefix,
 
});
 
export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};
