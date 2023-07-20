import './globals.css'
import ReactGA from "react-ga4";
import type { Metadata } from 'next'
import {averiaSerifLibre, chivo} from "@/app/fonts";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: 'Lucas Machado',
  description: 'Personal webpage of Lucas Machado',
  openGraph: {
    title: 'Lucas Machado',
    description: 'Personal webpage of Lucas Machado',
    type: 'website',
  },
  robots: 'index, follow',
  metadataBase: new URL('https://www.machadolucas.me')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('G-GZ0HCLXTHE');
  }
  return (
    <html lang="en" className={`${averiaSerifLibre.variable} ${chivo.variable}`}>
      <body className={'min-h-screen flex flex-col'}>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
      </body>
    </html>
  )
}
