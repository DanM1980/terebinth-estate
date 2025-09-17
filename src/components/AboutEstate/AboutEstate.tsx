import React, { useState, useEffect } from 'react';
import './AboutEstate.css';
import { getImagePath } from '../../config/paths';

const AboutEstate = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const estateImages = [
    {
      src: getImagePath('images/about/DSC5126-1.jpg'),
      alt: 'Luxury countryside suite exterior view',
      title: 'Elegant Exterior'
    },
    {
      src: getImagePath('images/about/DSC5139-HDR-1.jpg'),
      alt: 'Beautiful garden and landscape view',
      title: 'Garden Views'
    },
    {
      src: getImagePath('images/about/DSC5143-1.jpg'),
      alt: 'Modern suite interior with natural lighting',
      title: 'Modern Interiors'
    },
    {
      src: getImagePath('images/about/DSC5145-2.jpg'),
      alt: 'Spacious living area with panoramic windows',
      title: 'Living Spaces'
    },
    {
      src: getImagePath('images/about/DSC5146-1.jpg'),
      alt: 'Private outdoor area with mountain views',
      title: 'Private Terraces'
    },
    {
      src: getImagePath('images/about/DSC5152-HDR-1.jpg'),
      alt: 'Luxury bedroom with elegant furnishings',
      title: 'Luxury Bedrooms'
    },
    {
      src: getImagePath('images/about/DSC5159-1.jpg'),
      alt: 'Modern bathroom with premium fixtures',
      title: 'Premium Bathrooms'
    },
    {
      src: getImagePath('images/about/DSC5160-2.jpg'),
      alt: 'Relaxation area with comfortable seating',
      title: 'Relaxation Areas'
    },
    {
      src: getImagePath('images/about/DSC5164-1.jpg'),
      alt: 'Dining area perfect for group gatherings',
      title: 'Group Dining'
    },
    {
      src: getImagePath('images/about/DSC5167-1.jpg'),
      alt: 'Outdoor seating with stunning views',
      title: 'Outdoor Seating'
    },
    {
      src: getImagePath('images/about/DSC5188-HDR-1.jpg'),
      alt: 'Panoramic view of the Golan Heights',
      title: 'Mountain Views'
    },
    {
      src: getImagePath('images/about/DSC5201-1.jpg'),
      alt: 'Peaceful garden setting for meditation',
      title: 'Meditation Gardens'
    },
    {
      src: getImagePath('images/about/DSC5203-1.jpg'),
      alt: 'Traditional stone architecture details',
      title: 'Traditional Architecture'
    },
    {
      src: getImagePath('images/about/DSC5204-1.jpg'),
      alt: 'Modern amenities with rustic charm',
      title: 'Modern Amenities'
    },
    {
      src: getImagePath('images/about/DSC5207-1.jpg'),
      alt: 'Comfortable lounge area for groups',
      title: 'Group Lounges'
    },
    {
      src: getImagePath('images/about/DSC5212-1.jpg'),
      alt: 'Beautiful sunset view from the estate',
      title: 'Sunset Views'
    },
    {
      src: getImagePath('images/about/DSC5213-1.jpg'),
      alt: 'Peaceful morning view of the landscape',
      title: 'Morning Serenity'
    }
  ];

  // Group images into chunks of 10
  const imagesPerGroup = 10;
  const imageGroups = [];
  for (let i = 0; i < estateImages.length; i += imagesPerGroup) {
    imageGroups.push(estateImages.slice(i, i + imagesPerGroup));
  }

  const currentGroup = imageGroups[currentGroupIndex] || [];
  const totalGroups = imageGroups.length;

  const amenities = [
    {
      icon: '🏠',
      title: 'Four Luxury Suites',
      description: 'Combining traditional wood and stone with modern comfort'
    },
    {
      icon: '🛁',
      title: 'Private Jacuzzi',
      description: 'Each suite features its own private jacuzzi for relaxation'
    },
    {
      icon: '🏊‍♂️',
      title: 'Heated Pool',
      description: 'Year-round heated pool with stunning mountain views'
    },
    {
      icon: '🧖‍♀️',
      title: 'Finnish Sauna',
      description: 'Authentic Finnish dry sauna for ultimate wellness'
    },
    {
      icon: '🌿',
      title: 'Spacious Gardens',
      description: 'Beautiful gardens and common areas perfect for groups'
    },
    {
      icon: '🍽️',
      title: 'Group Dining',
      description: 'Dining options available for church groups and families'
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

    const element = document.querySelector('.about-estate');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isLightboxOpen) return; // Don't auto-rotate when lightbox is open

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === currentGroup.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [currentGroup.length, isLightboxOpen]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === currentGroup.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? currentGroup.length - 1 : prevIndex - 1
    );
  };

  const nextGroup = () => {
    setCurrentGroupIndex((prevIndex) =>
      prevIndex === totalGroups - 1 ? 0 : prevIndex + 1
    );
    setCurrentImageIndex(0);
  };

  const prevGroup = () => {
    setCurrentGroupIndex((prevIndex) =>
      prevIndex === 0 ? totalGroups - 1 : prevIndex - 1
    );
    setCurrentImageIndex(0);
  };

  return (
    <section className="about-estate section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            About Our Estate
          </h2>
          <p className={`section-subtitle ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            Experience luxury and comfort in the heart of the Holy Land
          </p>
        </div>

        <div className="estate-content">
          <div className="estate-gallery">
            <div className={`gallery-container ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              <div className="gallery-main">
                <img
                  src={currentGroup[currentImageIndex]?.src}
                  alt={currentGroup[currentImageIndex]?.alt}
                  loading="lazy"
                  onClick={() => setIsLightboxOpen(true)}
                  style={{ cursor: 'pointer' }}
                />
                <div className="gallery-overlay">
                  <h3>{currentGroup[currentImageIndex]?.title}</h3>
                  <p>Click to view full size</p>
                </div>
              </div>

              <div className="gallery-thumbnails-container">
                <div className="gallery-thumbnails">
                  {currentGroup.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={getImagePath(`images/about/thumbnails/${image.src.split('/').pop()}`)}
                        alt={image.alt}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                {/* Group Navigation */}
                {totalGroups > 1 && (
                  <>
                    <button className="group-nav prev" onClick={prevGroup}>
                      ‹‹
                    </button>
                    <button className="group-nav next" onClick={nextGroup}>
                      ››
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="estate-description">
            <div className={`description-content ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              <h3>Luxury Countryside Suites</h3>
              <p>
                Our estate features four beautifully designed luxury countryside suites that
                seamlessly blend traditional wood and stone architecture with modern amenities.
                Each suite is thoughtfully crafted to provide the perfect balance of comfort
                and spiritual tranquility.
              </p>
              <p>
                Whether you're traveling as a family, a church group, or seeking a personal
                retreat, our estate offers the ideal setting for your Holy Land pilgrimage.
                Wake up to breathtaking views of the Golan Heights and the Sea of Galilee,
                and let the sacred beauty of this region enhance your spiritual journey.
              </p>
            </div>
          </div>
        </div>

        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className={`amenity-card ${isVisible ? 'fade-in visible' : 'fade-in'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="amenity-icon">
                <span>{amenity.icon}</span>
              </div>
              <h4>{amenity.title}</h4>
              <p>{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="lightbox" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
            >
              ×
            </button>
            <img
              src={currentGroup[currentImageIndex]?.src}
              alt={currentGroup[currentImageIndex]?.alt}
            />
            <div className="lightbox-info">
              <h3>{currentGroup[currentImageIndex]?.title}</h3>
              <p>{currentImageIndex + 1} / {currentGroup.length}</p>
            </div>
            <button
              className="lightbox-nav prev"
              onClick={prevImage}
            >
              ‹
            </button>
            <button
              className="lightbox-nav next"
              onClick={nextImage}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutEstate;
