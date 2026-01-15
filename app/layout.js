
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

import { ReduxProvider } from "@/store/provider";

import Preloader from "@/components/Preloader"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LegacyScripts from "@/components/LegacyScripts"
import CustomCursor from '@/components/CustomCursor'
import WowProvider from '@/components/WowProvider'
import FancyboxProvider from '@/components/FancyboxProvider'


export const metadata = {
  title: "Cost-Effective And Reliable Solutions",
  description: "",
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicons.png" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />

        {/* CSS from public */}
        <link rel="stylesheet" href="/css/slicknav.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/mousecursor.css" />
        <link rel="stylesheet" href="/css/custom.css" />
        <link rel="stylesheet" href="/css/style.css" />

        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body>
        <ReduxProvider>
          {/* <TextEffectProvider /> */}
          <FancyboxProvider>
          <CustomCursor />
          <Preloader />
          <Header />
          <WowProvider>
          {children}
         </WowProvider>
          <Footer />
          <LegacyScripts />
          </FancyboxProvider>
        </ReduxProvider>
        </body>
    </html>
  )
}
