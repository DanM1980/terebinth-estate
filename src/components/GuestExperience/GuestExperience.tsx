import React, { useState, useEffect } from 'react';
import './GuestExperience.css';

const GuestExperience = () => {
  const [isVisible, setIsVisible] = useState(false);

  const experiences = [
    {
      icon: '🗺️',
      title: 'Guided Tours',
      description: 'Expert-led tours to holy sites including Capernaum, Mount of Beatitudes, and the Jordan River',
      details: 'Our knowledgeable guides will take you on a spiritual journey through the most significant biblical locations, sharing historical and spiritual insights that bring the scriptures to life.'
    },
    {
      icon: '⛪',
      title: 'Biblical Evenings',
      description: 'Worship gatherings and biblical study sessions in our beautiful garden setting',
      details: 'Join fellow believers for meaningful worship and study sessions under the stars, creating lasting memories and deepening your faith in the land where Jesus walked.'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family-Friendly',
      description: 'Perfect facilities and activities for families with children of all ages',
      details: 'Our estate is designed to welcome families, with safe spaces for children to play and explore while parents enjoy spiritual reflection and relaxation.'
    },
    {
      icon: '🍽️',
      title: 'Group Hosting',
      description: 'Dining options and meeting spaces for church groups and pilgrimages',
      details: 'We specialize in hosting church groups and pilgrimage tours, offering group dining, meeting spaces, and customized experiences for your spiritual journey.'
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

    const element = document.querySelector('.guest-experience');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section className="guest-experience section">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            Unique Guest Experience
          </h2>
          <p className={`section-subtitle ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            More than just accommodation – a complete spiritual journey
          </p>
        </div>

        <div className="experiences-grid">
          {experiences.map((experience, index) => (
            <div 
              key={index}
              className={`experience-card ${isVisible ? 'fade-in visible' : 'fade-in'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="experience-icon">
                <span>{experience.icon}</span>
              </div>
              <div className="experience-content">
                <h3>{experience.title}</h3>
                <p className="experience-description">{experience.description}</p>
                <p className="experience-details">{experience.details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`experience-cta ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <div className="cta-content">
            <h3>Ready to Begin Your Spiritual Journey?</h3>
            <p>
              Join hundreds of pilgrims who have found peace, inspiration, and deeper faith 
              during their stay at Terebinth Estate. Let us help you create an unforgettable 
              Holy Land experience.
            </p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => window.open('https://wa.me/972XXXXXXXXX?text=Hello! I would like to learn more about your guided tours and group hosting.', '_blank')}
              >
                Learn More
              </button>
              <button 
                className="btn btn-gold"
                onClick={() => window.open('https://wa.me/972XXXXXXXXX?text=Hello! I would like to book a stay for my group.', '_blank')}
              >
                Book for Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestExperience;
