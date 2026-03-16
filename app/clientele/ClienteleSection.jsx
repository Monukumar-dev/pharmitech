"use client";

import { notFound } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "@/store/slices/clientSlice";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./ClienteleSection.module.css";

import PageHeader from "@/components/PageHeader";
import Preloader from "@/components/Preloader";

gsap.registerPlugin(useGSAP);

export default function ClienteleSection() {
  const dispatch = useDispatch();
  const { clients = [], loading, error } = useSelector(
    (state) => state.client
  );

  const containerRef = useRef();
  const rowsRef = useRef([]);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    if (!clients.length) {
      dispatch(fetchClients());
    }
  }, [dispatch, clients.length]);

  /* ---------------- GSAP ---------------- */
  useGSAP(() => {
  if (!clients.length) return;

  rowsRef.current.forEach((row, index) => {
    if (!row) return;

    gsap.killTweensOf(row);

    const images = row.querySelectorAll("img");

    Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else img.onload = resolve;
          })
      )
    ).then(() => {
      const width = row.scrollWidth / 2;
      const isReverse = index % 2 !== 0;

      const SPEED = 80;
      const duration = width / SPEED;

      if (isReverse) {
        // ✅ Right direction → start at -width, move to 0, loop
        gsap.set(row, { x: -width });
        gsap.to(row, {
          x: 0,
          duration,
          ease: "none",
          repeat: -1,
          onRepeat() {
            gsap.set(row, { x: -width });
          },
        });
      } else {
        // ✅ Left direction ← start at 0, move to -width, loop
        gsap.set(row, { x: 0 });
        gsap.to(row, {
          x: -width,
          duration,
          ease: "none",
          repeat: -1,
          onRepeat() {
            gsap.set(row, { x: 0 });
          },
        });
      }
    });
  });
}, [clients]);

  /* ---------------- ERROR ---------------- */
  if (!loading && error) {
    notFound();
  }

  /* ---------------- SPLIT INTO 3 ROWS ---------------- */
  const size = Math.ceil(clients.length / 3);
  const row1 = clients.slice(0, size);
  const row2 = clients.slice(size, size * 2);
  const row3 = clients.slice(size * 2);

  const rows = [row1, row2, row3];

  return (
    <>
    {loading && <Preloader opacity={0.95} />}
      <PageHeader
        title="Our Clientele"
        backgroundImage="/images/hero-bg-image-silver111.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Clientele" },
        ]}
      />

      

      <section ref={containerRef} className={`${styles.section} bgPattern1`}>
        <div className={styles.wrapper}>
          {clients.length > 0 &&
            rows.map((row, rowIndex) => (
              <div className={styles.marqueeOuter} key={rowIndex}>
                <div
                  className={styles.marquee}
                  ref={(el) => (rowsRef.current[rowIndex] = el)}
                >
                  {[...row, ...row].map((client, i) => (
                    <Logo key={i} client={client} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

function Logo({ client }) {
  return (
    <div className={styles.logoCard}>
      <img
        src={client.client_logo_url}
        alt={client.client_name}
      />
    </div>
  );
}
