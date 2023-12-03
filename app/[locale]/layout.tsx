import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

import '../globals.css'
import Navbar from '../../components/navbar/index';
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Astrum',
  description: 'Created by AkoDako',
}

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'de'}];
}
 

export default async function RootLayout({
  children, params: {locale}
}: {
  children: React.ReactNode,
  params: {locale: string}
}) {

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.log(error)
    console.log('yp')
    notFound();
  }
  return (
    <html lang={locale} className={inter.className}>
      <body className="h-screen bg-slate-700 text-slate-50">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar locale={locale}/>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
