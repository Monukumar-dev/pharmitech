'use client';

import { useState, useEffect, useRef } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';

import MasonryGrid from './MasonryGrid';
import styles from '@/styles/Gallery.module.css';
import TextEffect from '../../components/TextEffect';

function flattenCategory(category) {
  return category.pictures_list.map((pic) => ({
    id: pic.id,
    url: pic.url,
    categoryTitle: category.title,
    src: pic.url,
    title: category.title,
  }));
}

export default function Gallery({ apiData }) {
  
  const [activeFilter, setActiveFilter]   = useState('all');
  const [lightboxOpen, setLightboxOpen]   = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentSlides, setCurrentSlides] = useState([]);

  const resultRef    = useRef(null);

  // Build filter tabs from API categories  (+ "All" at the start)
  const categories = [
    { id: 'all', title: 'All' },
    ...(apiData || []).map((cat) => ({ id: cat.id, title: cat.title })),
  ];

  // Filtered categories
  const visibleCategories =
    activeFilter === 'all'
      ? (apiData || [])
      : (apiData || []).filter((cat) => cat.id === activeFilter);

  // All visible pictures (flat) for count display
  const totalPictures = visibleCategories.reduce(
    (sum, cat) => sum + cat.pictures_list.length,
    0
  );


  // Result count re-animates on filter change
  useEffect(() => {
    const el = resultRef.current;
    if (!el) return;
    el.classList.remove(styles.inView);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => el.classList.add(styles.inView))
    );
    return () => cancelAnimationFrame(raf);
  }, [activeFilter]);

  // Open lightbox — slides = all pictures in that category section
  function handleCardClick(categoryPictures, localIdx) {
    const slides = categoryPictures.map((pic) => ({
      src: pic.url,
      title: pic.categoryTitle,
    }));
    setCurrentSlides(slides);
    setLightboxIndex(localIdx);
    setLightboxOpen(true);
  }

  return (
    <div className={styles.galleryPage}>
        <div className='container'>
          <div className="row section-row align-items-end">
              <div className="col-xl-6">
                  <div className="section-title">
                      <h3 className="wow fadeInUp">Our Gallery</h3>
                      <TextEffect text="Explore our projects across industries &amp; cleanroom solutions." />
                  </div>
              </div>
              <div className="col-xl-6">
                <div className={styles.controls}>
                    <div className={styles.filters}>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`${styles.filterBtn}${activeFilter === cat.id ? ` ${styles.active}` : ''}`}
                                onClick={() => setActiveFilter(cat.id)}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        <div className={styles.galleryWrap}>
            <div ref={resultRef} className={styles.resultCount}>
                {totalPictures} Image{totalPictures !== 1 ? 's' : ''}
            </div>

            <div className={styles.galleryGrid}>
            {visibleCategories.map((category, i) => {
                const pictures = flattenCategory(category);
                return (
                <div key={category.id}>
                    {/* Category heading — shown only in "All" view */}
                    {activeFilter === 'all' && (
                    <div className={`${styles.categoryDivider} ${i === 0 ? ` ${styles.first}` : ''}`}>
                        <TextEffect as='h3' text={category.title} />
                    </div>
                    )}
                    <MasonryGrid
                    items={pictures}
                    onCardClick={(localIdx) => handleCardClick(pictures, localIdx)}
                    />
                </div>
                );
            })}
            </div>
        </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={currentSlides}
        plugins={[Captions]}
        captions={{ showToggle: false, descriptionTextAlign: 'center' }}
        styles={{ container: { backgroundColor: 'rgba(26, 24, 20, 0.96)' } }}
      />
       </div>
    </div>
  );
}