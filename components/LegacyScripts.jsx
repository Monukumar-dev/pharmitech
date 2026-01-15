'use client'

import Script from "next/script"

export default function LegacyScripts() {
  return (
    <>
      {/* jQuery (must load first) */}
      <Script src="/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />

      {/* Bootstrap (depends on jQuery) */}
      {/* <Script
        src="/js/bootstrap.min.js"
        strategy="afterInteractive"
      /> */}

      {/* jQuery Plugins */}
      <Script src="/js/validator.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.slicknav.js" strategy="afterInteractive" />
      <Script src="/js/jquery.waypoints.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.counterup.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
      {/* <Script src="/js/parallaxie.js" strategy="afterInteractive" /> */}
      <Script src="/js/jquery.mb.YTPlayer.min.js" strategy="afterInteractive" />
      {/* <Script src="/js/wow.min.js" strategy="afterInteractive" /> */}

      {/* Non-jQuery Libraries */}
      {/* <Script src="/js/swiper-bundle.min.js" strategy="afterInteractive" /> */}
      {/* <Script src="/js/SmoothScroll.js" strategy="afterInteractive" /> */}

      {/* GSAP Core */}
      {/* <Script src="/js/gsap.min.js" strategy="afterInteractive" />
      <Script src="/js/ScrollTrigger.min.js" strategy="afterInteractive" /> */}
      {/* <Script src="/js/SplitText.min.js" strategy="afterInteractive" /> */}

      {/* Custom UI */}
      {/* <Script src="/js/magiccursor.js" strategy="afterInteractive" /> */}

      {/* Your legacy initialization file (LAST) */}
      {/* <Script src="/js/function.js" strategy="afterInteractive" onLoad={() => {console.log("Legacy scripts loaded")}}
      /> */}
    </>
  )
}
