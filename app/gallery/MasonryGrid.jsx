'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from '@/styles/Gallery.module.css';

function useColCount() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w <= 600 ? 1 : w <= 1000 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
}

function ProjectCard({ item, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.inView);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href="#"
      className={styles.projectCard}
      onClick={(e) => { e.preventDefault(); onClick(); }}
      data-cursor-text="View"
    >
      <div className={styles.cardImgWrap}>
        <img src={item.url} alt={item.categoryTitle} loading="lazy" />
        <div className={styles.cardOverlay}>
          <div className={styles.overlayTitle}>{item.categoryTitle}</div>
        </div>
        <div className={styles.cardArrow}>→</div>
      </div>
    </a>
  );
}

export default function MasonryGrid({ items, onCardClick }) {
  const colCount = useColCount();
  const wrapRef = useRef(null);
  const [columns, setColumns] = useState([]);

  const distribute = useCallback(() => {
    if (!items.length) { setColumns([]); return; }

    const GAP = 16;
    const getColWidth = () => {
      const wrapW = wrapRef.current?.offsetWidth ?? window.innerWidth - 96;
      return (wrapW - GAP * (colCount - 1)) / colCount;
    };

    const promises = items.map(
      (item) => new Promise((resolve) => {
        const img = new Image();
        img.onload  = () => resolve({ item, w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => resolve({ item, w: 4, h: 3 });
        img.src = item.url;
      })
    );

    Promise.all(promises).then((results) => {
      const colHeights = Array(colCount).fill(0);
      const cols = Array.from({ length: colCount }, () => []);
      const cw = getColWidth();

      results.forEach(({ item, w, h }) => {
        const idx = colHeights.indexOf(Math.min(...colHeights));
        cols[idx].push(item);
        colHeights[idx] += cw * (h / w) + GAP;
      });

      setColumns(cols);
    });
  }, [items, colCount]);

  useEffect(() => { distribute(); }, [distribute]);

  if (!columns.length) return null;

  return (
    <div className={styles.masonryColWrap} ref={wrapRef}>
      {columns.map((col, ci) => (
        <div key={ci} className={styles.masonryCol}>
          {col.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              onClick={() => onCardClick(items.indexOf(item))}
            />
          ))}
        </div>
      ))}
    </div>
  );
}