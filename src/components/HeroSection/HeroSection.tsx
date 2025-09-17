import React, { useState, useEffect, useMemo } from 'react';
import './HeroSection.css';
import { getPublicPath } from '../../config/paths';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Array of video sources
  const videoSources: string[] = useMemo(() => [
    getPublicPath('videos/hero/fields.mp4'),
    getPublicPath('videos/hero/lake.mp4')
  ], []);

  // Select video randomly on each page load
  const [selectedVideo] = useState(() => {
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    return videoSources[randomIndex];
  });

  // Initialize component
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Preload all videos
  useEffect(() => {
    videoSources.forEach(videoSrc => {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.preload = 'metadata';
    });
  }, [videoSources]);


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
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={selectedVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title fade-in">
              Walk in the Footsteps of Jesus – Stay at the Heart of the Golan
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
