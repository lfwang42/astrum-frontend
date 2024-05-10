import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import "../globals.css";
import Navbar from "../../components/Navbar/index";
import Footer from "@/components/Footer";
import { ProfilesContextProvider } from "@/contexts/PinnedProfiles/ProfilesContext";
import { ProfileTabs } from "@/components/ProfileTabs";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Astrum",
  description: "Created by AkoDako",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "jp" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.log("error");
    notFound();
  }
  return (
    <html lang={locale} className={inter.className}>
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6217820332998691"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen items-center bg-slate-800 text-slate-50 mb-5">
        <ProfilesContextProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar locale={locale} />
            <ProfileTabs />
            {children}
          </NextIntlClientProvider>
        </ProfilesContextProvider>
        <Footer />
      </body>
    </html>
  );
}
