"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function TextEffectScroll({
  text,
  as: Tag = "h2",
  className = "",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const split = new SplitText(el, {
        type: "lines,words,chars",
        linesClass: "split-line",
      });

      // initial state
      gsap.set(split.chars, {
        opacity: 0.3,
        x: -7,
      });

      const tween = gsap.to(split.chars, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 50%",      // 🔥 safe for real layouts
          toggleActions: "play none none none",
          once: true,            // 🔥 no re-trigger
          markers: true,
        },
      });

      ScrollTrigger.refresh();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={`text-effect ${className}`}>
      {text}
    </Tag>
  );
}
