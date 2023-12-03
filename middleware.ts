import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
// This function can be marked `async` if using `await` inside
import createMiddleware from 'next-intl/middleware';


function getLocale(request: NextRequest) {
    let headers = { 'accept-language': request.headers.get('accept-language')!}
    let languages = new Negotiator({ headers }).languages()
    let locales = ['en-US', 'nl-NL', 'nl', 'jp'];
    let defaultLocale = 'en'
    console.log(match(languages, locales, defaultLocale))
}


//cookies middleware

// export function middleware(request: NextRequest) {
//     let cookie = request.cookies.get('i18next')
//     // console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
//     // const allCookies = request.cookies.getAll()
//     // console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
//     getLocale(request)
//     const response = NextResponse.next()
//     response.cookies.set({
//       name: 'i18n',
//       value: 'jp'
//     })
//     cookie = response.cookies.get('i18n')
//     // console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
//     // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.
   
// }


export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de', 'jp'],
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en'
 
});
 
export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};

// export const config = {
//     matcher: [
//       // Skip all internal paths (_next)
//       '/((?!_next).*)',
//       // Optional: only run on root (/) URL
//       // '/'
//     ],
//   }
 