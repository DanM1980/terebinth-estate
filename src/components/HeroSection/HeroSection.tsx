import React, { useState, useEffect, useMemo } from 'react';
import './HeroSection.css';
import { getImagePath, getPublicPath } from '../../config/paths';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [videoFailed, setVideoFailed] = useState<boolean>(false);

  // Array of video sources
  const videoSources: string[] = useMemo(() => [
    getPublicPath('videos/hero/fields.mp4'),
    getPublicPath('videos/hero/lake.mp4')
  ], []);

  // Array of hero background images (fallback)
  const heroImages: string[] = useMemo(() => [
    getImagePath('images/hero/DJI_0011_10.jpg'),
    getImagePath('images/hero/DJI_0011_13.jpg'),
    getImagePath('images/hero/GX010233_stabilized.mp4_snapshot_00.44.705~2.jpg')
  ], []);

  // Select video randomly on each page load
  const [selectedVideo] = useState(() => {
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    return videoSources[randomIndex];
  });

  // Cookie management functions
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string, days: number = 30): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // Initialize background image from cookie or random (for fallback)
  useEffect(() => {
    const savedIndex = getCookie('heroImageIndex');
    if (savedIndex !== null) {
      const nextIndex = (parseInt(savedIndex) + 1) % heroImages.length;
      setCurrentImageIndex(nextIndex);
      setCookie('heroImageIndex', nextIndex.toString());
    } else {
      const randomIndex = Math.floor(Math.random() * heroImages.length);
      setCurrentImageIndex(randomIndex);
      setCookie('heroImageIndex', randomIndex.toString());
    }
    setIsLoaded(true);
  }, [heroImages.length]);

  // Preload all videos and fallback images
  useEffect(() => {
    // Preload all videos
    videoSources.forEach(videoSrc => {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.preload = 'metadata';
    });

    // Preload all fallback images
    heroImages.forEach(imageSrc => {
      const image = new Image();
      image.src = imageSrc;
    });
  }, [videoSources, heroImages]);


  const handleWhatsAppClick = (): void => {
    // Replace with actual WhatsApp number
    window.open('https://wa.me/972526658209?text=Hello! I would like to book a stay at Terebinth Estate.', '_blank');
  };

  const handlePhoneClick = (): void => {
    // Replace with actual phone number
    window.location.href = 'tel:+972526658209';
  };



  return (
    <section className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
      {!videoFailed ? (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
        >
          <source src={selectedVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="hero-background">
          <div className="hero-image-container">
            <img
              src={heroImages[currentImageIndex]}
              alt="Galilee aerial view"
              className="hero-background-image"
              loading="eager"
            />
            <div className="hero-image-overlay"></div>
          </div>
          <div className="hero-overlay"></div>
        </div>
      )}

      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title fade-in">
              Walk in the Footsteps of Jesus – Stay at the Heart of the Galilee
            </h1>
            <h2 className="hero-subtitle fade-in">
              Luxury countryside suites in the Golan Heights, just minutes from the Sea of Galilee and the Jordan River.
            </h2>
            <div className="hero-buttons fade-in">
              <button
                className="btn btn-primary"
                onClick={handleWhatsAppClick}
              >
                Book Your Stay
              </button>
              <button
                className="btn btn-secondary"
                onClick={handlePhoneClick}
              >
                Call Us Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default HeroSection;
