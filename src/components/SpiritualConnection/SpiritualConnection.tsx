import React, { useState, useEffect } from 'react';
import './SpiritualConnection.css';
import { getImagePath } from '../../config/paths';

interface SpiritualImage {
  src: string;
  alt: string;
  title: string;
  quote: string;
  citation: string;
}

const SpiritualConnection: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Array of spiritual images
  const spiritualImages: SpiritualImage[] = [
    {
      src: getImagePath('images/spiritual/IMG_20210215_170417-EFFECTS.jpg'),
      alt: 'Spiritual landscape view',
      title: 'The Promised Land',
      quote: '"And I will give unto thee, and to thy seed after thee, the land wherein thou art a stranger, all the land of Canaan, for an everlasting possession."',
      citation: 'Genesis 17:8'
    },
    {
      src: getImagePath('images/spiritual/IMG_20240127_151929-EDIT.jpg'),
      alt: 'Sacred landscape',
      title: 'God\'s Creation',
      quote: '"In the beginning was the Word, and the Word was with God, and the Word was God."',
      citation: 'John 1:1'
    },
    {
      src: getImagePath('images/spiritual/IMG_20240304_145902-EDIT.jpg'),
      alt: 'Biblical landscape view',
      title: 'The Lord\'s Prayer',
      quote: '"Our Father which art in heaven, Hallowed be thy name. Thy kingdom come, Thy will be done in earth, as it is in heaven."',
      citation: 'Matthew 6:9-10'
    },
    {
      src: getImagePath('images/spiritual/IMG_20250206_165350.jpg'),
      alt: 'Golan Heights landscape',
      title: 'The Good Shepherd',
      quote: '"The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters."',
      citation: 'Psalm 23:1-2'
    },
    {
      src: getImagePath('images/spiritual/IMG_20250206_165445.jpg'),
      alt: 'Sea of Galilee view',
      title: 'Walking on Water',
      quote: '"And Peter answered him and said, Lord, if it be thou, bid me come unto thee on the water. And he said, Come."',
      citation: 'Matthew 14:28-29'
    },
    {
      src: getImagePath('images/spiritual/GX010061_stabilized.mp4_snapshot_03.38.365.jpg'),
      alt: 'Aerial view of the Holy Land',
      title: 'The Great Commission',
      quote: '"Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost."',
      citation: 'Matthew 28:19'
    },
    {
      src: getImagePath('images/spiritual/IMG_6853.JPG'),
      alt: 'Peaceful landscape',
      title: 'Perfect Peace',
      quote: '"Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee."',
      citation: 'Isaiah 26:3'
    },
    {
      src: getImagePath('images/spiritual/DSC_1876.JPG'),
      alt: 'Beautiful Golan Heights landscape',
      title: 'God\'s Glory',
      quote: '"The heavens declare the glory of God; and the firmament sheweth his handywork."',
      citation: 'Psalm 19:1'
    },
    {
      src: getImagePath('images/spiritual/DSC_2850.JPG'),
      alt: 'Serene landscape view',
      title: 'Be Still and Know',
      quote: '"Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth."',
      citation: 'Psalm 46:10'
    },
    {
      src: getImagePath('images/spiritual/DSC_2881.JPG'),
      alt: 'Majestic mountain view',
      title: 'My Help Cometh',
      quote: '"I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the Lord, which made heaven and earth."',
      citation: 'Psalm 121:1-2'
    },
    {
      src: getImagePath('images/spiritual/DSC_0065.JPG'),
      alt: 'Beautiful Golan Heights landscape',
      title: 'The Lord\'s Blessing',
      quote: '"The Lord bless thee, and keep thee: The Lord make his face shine upon thee, and be gracious unto thee."',
      citation: 'Numbers 6:24-25'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('.spiritual-connection');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === spiritualImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [spiritualImages.length]);

  const nextImage = (): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === spiritualImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = (): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? spiritualImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="spiritual-connection section">
      <div className="container">
        <div className="spiritual-content">
          <div className="spiritual-text">
            <h2 className={`spiritual-title ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              Experience the Holy Land
            </h2>
            <p className={`spiritual-description ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              Our estate is located in the heart of the Golan Heights, overlooking the Sea of Galilee.
              Just a short drive from Capernaum, the Mount of Beatitudes, and the Jordan River –
              where pilgrims come to experience the Holy Land.
            </p>
            <p className={`spiritual-description ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              Wake up to breathtaking views of the same landscapes that Jesus walked, and let the
              spiritual significance of this sacred region enhance your pilgrimage experience.
            </p>
          </div>

          <div className="spiritual-image">
            <div className={`image-container ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              <img
                src={spiritualImages[currentImageIndex].src}
                alt={spiritualImages[currentImageIndex].alt}
                loading="lazy"
              />
              <div className="image-overlay">
                <div className="biblical-quote">
                  <h3>{spiritualImages[currentImageIndex].title}</h3>
                  <blockquote>
                    {spiritualImages[currentImageIndex].quote}
                  </blockquote>
                  <cite>{spiritualImages[currentImageIndex].citation}</cite>
                </div>
              </div>

              {/* Navigation arrows */}
              <button className="spiritual-nav prev" onClick={prevImage}>
                ‹
              </button>
              <button className="spiritual-nav next" onClick={nextImage}>
                ›
              </button>

              {/* Image counter */}
              <div className="spiritual-counter">
                <span>{currentImageIndex + 1} / {spiritualImages.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="spiritual-features">
          <div className={`feature-item ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div className="feature-icon">
              <span>⛪</span>
            </div>
            <h3>Sacred Sites</h3>
            <p>Minutes from Capernaum, Mount of Beatitudes, and the Jordan River</p>
          </div>

          <div className={`feature-item ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div className="feature-icon">
              <span>🌅</span>
            </div>
            <h3>Biblical Views</h3>
            <p>Wake up to the same landscapes that Jesus walked and taught</p>
          </div>

          <div className={`feature-item ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div className="feature-icon">
              <span>🙏</span>
            </div>
            <h3>Spiritual Peace</h3>
            <p>Find tranquility and connection in this holy region</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiritualConnection;
