import React, { useState, useEffect } from 'react';
import './LocationMap.css';

const LocationMap = () => {
  const [isVisible, setIsVisible] = useState(false);

  const nearbySites = [
    {
      name: 'Sea of Galilee',
      distance: '15 minutes',
      description: 'Where Jesus walked on water and performed many miracles',
      icon: '🌊'
    },
    {
      name: 'Capernaum',
      distance: '20 minutes',
      description: 'The town of Jesus, home to Peter and the site of many teachings',
      icon: '⛪'
    },
    {
      name: 'Mount of Beatitudes',
      distance: '25 minutes',
      description: 'Where Jesus delivered the Sermon on the Mount',
      icon: '⛰️'
    },
    {
      name: 'Jordan River',
      distance: '30 minutes',
      description: 'Where Jesus was baptized by John the Baptist',
      icon: '🌊'
    },
    {
      name: 'Tabgha',
      distance: '18 minutes',
      description: 'Site of the miracle of the loaves and fishes',
      icon: '🍞'
    },
    {
      name: 'Magdala',
      distance: '22 minutes',
      description: 'Home of Mary Magdalene and ancient synagogue',
      icon: '🏛️'
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

    const element = document.querySelector('.location-map');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleDirectionsClick = () => {
    // Coordinates for Terebinth Estate in Neot Golan
    const coordinates = '32.7940,35.6900'; // Neot Golan, Golan Heights
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coordinates}`, '_blank');
  };

  return (
    <section className="location-map section">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            Our Location
          </h2>
          <p className={`section-subtitle ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            Located in Neot Golan, only 15 minutes from the Sea of Galilee
          </p>
        </div>

        <div className="location-content">
          <div className="map-container">
            <div className={`map-wrapper ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.123456789!2d35.6900!3d32.7940!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ3JzM4LjQiTiAzNcKwNDEnMjQuMCJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus&q=Neot+Golan,+Israel"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Terebinth Estate Location - Neot Golan"
              ></iframe>
              <div className="map-overlay">
                <div className="location-marker">
                  <div className="marker-icon">🏠</div>
                  <div className="marker-label">Terebinth Estate</div>
                </div>
              </div>
            </div>

            <div className={`location-info ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              <h3>Perfectly Positioned in Neot Golan</h3>
              <p>
                Located in the beautiful Neot Golan settlement in the Golan Heights,
                Terebinth Estate offers easy access to all the most important biblical sites.
                Our central location means you can visit multiple holy sites in a single day
                while returning to the comfort and tranquility of our luxury suites.
              </p>
              <div className="location-stats">
                <div className="stat-item">
                  <span className="stat-number">15</span>
                  <span className="stat-label">Minutes to Sea of Galilee</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">6</span>
                  <span className="stat-label">Major Biblical Sites Nearby</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Luxury Suites Available</span>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={handleDirectionsClick}
              >
                Get Directions
              </button>
            </div>
          </div>

          <div className="nearby-sites">
            <h3 className={`sites-title ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              Nearby Biblical Sites
            </h3>
            <div className="sites-grid">
              {nearbySites.map((site, index) => (
                <div
                  key={index}
                  className={`site-card ${isVisible ? 'fade-in visible' : 'fade-in'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="site-icon">
                    <span>{site.icon}</span>
                  </div>
                  <div className="site-content">
                    <h4>{site.name}</h4>
                    <p className="site-distance">{site.distance} drive</p>
                    <p className="site-description">{site.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
