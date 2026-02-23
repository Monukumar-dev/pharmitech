"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/styles/Directors.module.css";
import TextEffect from "../../components/TextEffect";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const DIRECTOR_STATIC = {
  "Pravin Shetty": {
    title: "Director — HVAC & Cleanroom Specialist",
    industries: ["Pharmaceuticals", "Biotechnology", "Semiconductors", "Electronics", "Automobile", "Food"],
  },
  "Ravi Thakur": {
    title: "Director — Cleanroom Industry Expert",
    industries: ["Pharmaceuticals", "Biotechnology", "Semiconductors", "Electronics", "Automobile", "Food"],
  },
};


// ─── Component ────────────────────────────────────────────────────────────────
export default function Directors({ members = [] }) {


   const directors = members.map((member, i) => {
   const staticData = DIRECTOR_STATIC[member.name] ?? { title: "Director", industries: [] };
    return {
      name: member.name,
      title: staticData.title,
      bio: member.profile,
      exp: String(member.experience_years),
      image: member.image ?? null,
      industries: staticData.industries,
    };
  });
  
      
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const eyeLineRef  = useRef(null);
  const eyeTextRef  = useRef(null);
  const headingRef  = useRef(null);
  const row1Ref     = useRef(null);
  const row2Ref     = useRef(null);

  // Per-row element refs
  const avatar1Ref  = useRef(null);
  const name1Ref    = useRef(null);
  const title1Ref   = useRef(null);
  const bio1Ref     = useRef(null);
  const tags1Ref    = useRef(null);
  const exp1Ref     = useRef(null);
  const elabel1Ref  = useRef(null);

  const avatar2Ref  = useRef(null);
  const name2Ref    = useRef(null);
  const title2Ref   = useRef(null);
  const bio2Ref     = useRef(null);
  const tags2Ref    = useRef(null);
  const exp2Ref     = useRef(null);
  const elabel2Ref  = useRef(null);

  useGSAP(
    () => {
      // ── Helper: get all .ind-tag children of a container ref ──
      const tags1 = tags1Ref.current?.querySelectorAll(`.${styles.indTag}`);
      const tags2 = tags2Ref.current?.querySelectorAll(`.${styles.indTag}`);

      // ────────────────────────────────────────────────────────
      // STEP 1 — Set initial hidden states (no CSS opacity/transform)
      // ────────────────────────────────────────────────────────
      gsap.set(eyebrowRef.current,  { opacity: 0, x: -24 });
      gsap.set(eyeLineRef.current,  { scaleX: 0, transformOrigin: "left center" });
      gsap.set(eyeTextRef.current,  { opacity: 0 });
      gsap.set(headingRef.current,  { opacity: 0, y: 22 });

      gsap.set(row1Ref.current,     { opacity: 0, y: 36 });
      gsap.set(avatar1Ref.current,  { opacity: 0, y: 12 });
      gsap.set(name1Ref.current,    { opacity: 0, x: -16 });
      gsap.set(title1Ref.current,   { opacity: 0, x: -12 });
      gsap.set(bio1Ref.current,     { opacity: 0, y: 14 });
      gsap.set(tags1,               { opacity: 0, y: 10 });
      gsap.set(exp1Ref.current,     { opacity: 0, y: 18, scale: 0.85 });
      gsap.set(elabel1Ref.current,  { opacity: 0 });

      gsap.set(row2Ref.current,     { opacity: 0, y: 36 });
      gsap.set(avatar2Ref.current,  { opacity: 0, y: 12 });
      gsap.set(name2Ref.current,    { opacity: 0, x: -16 });
      gsap.set(title2Ref.current,   { opacity: 0, x: -12 });
      gsap.set(bio2Ref.current,     { opacity: 0, y: 14 });
      gsap.set(tags2,               { opacity: 0, y: 10 });
      gsap.set(exp2Ref.current,     { opacity: 0, y: 18, scale: 0.85 });
      gsap.set(elabel2Ref.current,  { opacity: 0 });

      // ────────────────────────────────────────────────────────
      // STEP 2 — Header animation
      // ────────────────────────────────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      })
        .to(eyebrowRef.current,  { opacity: 1, x: 0,   duration: 0.6,  ease: "power3.out" })
        .to(eyeLineRef.current,  { scaleX: 1,           duration: 0.5,  ease: "power3.out" }, "-=0.4")
        .to(eyeTextRef.current,  { opacity: 1,           duration: 0.4,  ease: "power2.out" }, "-=0.25")
        .to(headingRef.current,  { opacity: 1, y: 0,    duration: 0.85, ease: "power3.out" }, "-=0.45");

      // ────────────────────────────────────────────────────────
      // STEP 3 — Row 1 staggered animation
      // ────────────────────────────────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger: row1Ref.current,
          start: "top 78%",
          once: true,
        },
      })
        .to(row1Ref.current,    { opacity: 1, y: 0,          duration: 0.7,  ease: "power3.out" })
        .to(avatar1Ref.current, { opacity: 1, y: 0,          duration: 0.55, ease: "power3.out" }, "-=0.5")
        .to(name1Ref.current,   { opacity: 1, x: 0,          duration: 0.5,  ease: "power3.out" }, "-=0.4")
        .to(title1Ref.current,  { opacity: 1, x: 0,          duration: 0.45, ease: "power2.out" }, "-=0.35")
        .to(bio1Ref.current,    { opacity: 1, y: 0,          duration: 0.55, ease: "power2.out" }, "-=0.4")
        .to(tags1,              { opacity: 1, y: 0,          duration: 0.3,  ease: "power2.out", stagger: 0.07 }, "-=0.35")
        .to(exp1Ref.current,    { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.6)" }, "-=0.55")
        .to(elabel1Ref.current, { opacity: 1,                 duration: 0.35, ease: "power2.out" }, "-=0.2");

      // ────────────────────────────────────────────────────────
      // STEP 4 — Row 2 staggered animation
      // ────────────────────────────────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger: row2Ref.current,
          start: "top 80%",
          once: true,
        },
      })
        .to(row2Ref.current,    { opacity: 1, y: 0,          duration: 0.7,  ease: "power3.out" })
        .to(avatar2Ref.current, { opacity: 1, y: 0,          duration: 0.55, ease: "power3.out" }, "-=0.5")
        .to(name2Ref.current,   { opacity: 1, x: 0,          duration: 0.5,  ease: "power3.out" }, "-=0.4")
        .to(title2Ref.current,  { opacity: 1, x: 0,          duration: 0.45, ease: "power2.out" }, "-=0.35")
        .to(bio2Ref.current,    { opacity: 1, y: 0,          duration: 0.55, ease: "power2.out" }, "-=0.4")
        .to(tags2,              { opacity: 1, y: 0,          duration: 0.3,  ease: "power2.out", stagger: 0.07 }, "-=0.35")
        .to(exp2Ref.current,    { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.6)" }, "-=0.55")
        .to(elabel2Ref.current, { opacity: 1,                 duration: 0.35, ease: "power2.out" }, "-=0.2");
    },
    { scope: sectionRef }
  );

  // ─── Row refs lookup — keeps JSX clean ──────────────────────────────────
  const rowRefs = [
    {
      rowRef: row1Ref,
      avatarRef: avatar1Ref,
      nameRef: name1Ref,
      titleRef: title1Ref,
      bioRef: bio1Ref,
      tagsRef: tags1Ref,
      expRef: exp1Ref,
      elabelRef: elabel1Ref,
    },
    {
      rowRef: row2Ref,
      avatarRef: avatar2Ref,
      nameRef: name2Ref,
      titleRef: title2Ref,
      bioRef: bio2Ref,
      tagsRef: tags2Ref,
      expRef: exp2Ref,
      elabelRef: elabel2Ref,
    },
  ];

  return (
    <section className={`${styles.directorsSection} bg-section`} ref={sectionRef}>
      <div className="container">
        <div className="row section-row align-items-center justify-content-center">
            <div className="col-lg-6">
                <div className="section-title">
                    <h3 className="wow fadeInUp">BOARD OF DIRECTORS</h3>
                    <div
                        className="text-effect"
                        data-cursor="-opaque"
                    >
                        <TextEffect text="Visionary Leadership Driving Precision and Innovation" />
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="section-title-content">
                    <p className="mt-4 text-muted wow fadeInUp" data-wow-delay="0.2s">
                        At the heart of Pharmintech stands a leadership team driven by purpose and performance.
                        Their collective experience transforms complex cleanroom challenges into seamless turnkey solutions.
                        Through integrity, innovation, and commitment, they continue to elevate industry standards worldwide.
                    </p>

                </div>
            </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            {/* ── Eyebrow ── */}
            {/* <div className={styles.sectionEyebrow} ref={eyebrowRef}>
              <div className={styles.eyebrowLine} ref={eyeLineRef} />
              <span className={styles.eyebrowText} ref={eyeTextRef}>
                Leadership Team
              </span>
            </div> 
             <h2 className={styles.sectionHeading} ref={headingRef}>
              The minds<br />
              behind our <em>vision</em>
            </h2> */}

            {/* ── Director Rows ── */}
            {directors.map((d, i) => {
              const refs = rowRefs[i];
              return (
                <div
                  key={i}
                  className={styles.directorRow}
                  ref={refs.rowRef}
                >

                  <div className="row align-items-center g-5">
                    <div className="col-auto">
                      <p className={styles.dirIndex}>{i+1}</p>
                    </div>
                    <div className="col-auto">
                      <div className={styles.avatarBlock}>
                        <div className={styles.avatarFrame} ref={refs.avatarRef}>
                        <div data-cursor="-opaque">
                            <figure className="avatarImg">
                                <img className="directorIMG" src={d.image} alt={d.name} />
                            </figure>
                        </div>
                          {/* <div className={styles.avatarImg}>{d.initials}</div> */}
                        </div>
                      </div>
                    </div>

                    {/* Name + Title */}
                    <div className="col">
                      <h3 className={styles.dirName} ref={refs.nameRef}>
                        {d.name}
                      </h3>
                      <p className={styles.dirTitle} ref={refs.titleRef}>
                        {d.title}
                      </p>
                    </div>

                    {/* Bio + Tags */}
                    <div className="col-lg-5">
                      <p className={styles.dirBio} ref={refs.bioRef}>
                        {d.bio}
                      </p>
                      <div
                        className={styles.industriesWrap}
                        ref={refs.tagsRef}
                      >
                        {d.industries.map((ind) => (
                          <span data-cursor="-opaque" key={ind} className={styles.indTag}>
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Exp */}
                    <div className="col-auto text-end">
                      <div className={styles.dirExp}>
                        <span className={styles.expFig} ref={refs.expRef}>
                          {d.exp}
                        </span>
                        <span className={styles.expLabel} ref={refs.elabelRef}>
                          yrs<br />exp.
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}