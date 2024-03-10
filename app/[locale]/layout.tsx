import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

import '../globals.css'
import Navbar from '../../components/navbar/index';
import Footer from '@/components/Footer';
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Astrum',
  description: 'Created by AkoDako',
}

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'jp'}];
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
    console.log('error')
    notFound();
  }
  return (
    <html lang={locale} className={inter.className}>
      <body className="h-screen bg-slate-800 text-slate-50">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar locale={locale}/>
          {children}
          <Footer locale={locale}/>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
