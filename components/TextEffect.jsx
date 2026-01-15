"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function TextEffect({
  text,
  as: Tag = "h2",
  className = "",
}) {
  const elRef = useRef(null);
  const played = useRef(false);

  useEffect(() => {
    if (!elRef.current) return;

    // Split AFTER mount
    const split = new SplitText(elRef.current, {
      type: "lines,words,chars",
      linesClass: "split-line",
    });

    // Initial state (chars only)
    gsap.set(split.chars, {
      opacity: 0.3,
      x: -7,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;

          gsap.to(split.chars, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          });

          observer.disconnect();
        }
      },
      {
        threshold: 0.4, // trigger when 40% visible
      }
    );

    observer.observe(elRef.current);

    return () => {
      observer.disconnect();
      split.revert();
    };
  }, []);

  return (
    <Tag ref={elRef} data-cursor="-opaque" className={`text-effect ${className}`}>
      {text}
    </Tag>
  );
}
