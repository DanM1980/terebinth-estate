import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah & Michael Johnson',
      location: 'Texas, USA',
      image: '/images/testimonials/testimonial-1.jpg',
      quote: 'Staying here brought us closer to the places we\'ve read about in the Bible. The guided tours were incredible, and our children were captivated by the stories. Truly unforgettable.',
      rating: 5,
      group: 'Family of 5'
    },
    {
      id: 2,
      name: 'Pastor David Williams',
      location: 'California, USA',
      image: '/images/testimonials/testimonial-2.jpg',
      quote: 'Perfect for our church group – comfort, peace, and faith all in one. The facilities exceeded our expectations, and the spiritual atmosphere was exactly what we needed.',
      rating: 5,
      group: 'Church Group (25 people)'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      location: 'Florida, USA',
      image: '/images/testimonials/testimonial-3.jpg',
      quote: 'The private jacuzzi and heated pool were perfect after long days of touring. But what made it special was waking up to that view of the Sea of Galilee every morning.',
      rating: 5,
      group: 'Couple'
    },
    {
      id: 4,
      name: 'Reverend James Thompson',
      location: 'Georgia, USA',
      image: '/images/testimonials/testimonial-4.jpg',
      quote: 'Our biblical evening sessions in the garden were transformative. The location, the facilities, and the spiritual guidance provided an experience our congregation will never forget.',
      rating: 5,
      group: 'Church Leadership Retreat'
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

    const element = document.querySelector('.testimonials');
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
    const interval = setInterval(() => {
      setCurrentTestimonial((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            What Our Guests Say
          </h2>
          <p className={`section-subtitle ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            Real experiences from pilgrims who have walked in the footsteps of Jesus
          </p>
        </div>

        <div className="testimonials-container">
          <div className={`testimonial-main ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <span>"</span>
                </div>
                <blockquote className="testimonial-quote">
                  {testimonials[currentTestimonial].quote}
                </blockquote>
                <div className="testimonial-rating">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
              </div>
              
              <div className="testimonial-author">
                <div className="author-image">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    loading="lazy"
                  />
                </div>
                <div className="author-info">
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <p className="author-location">{testimonials[currentTestimonial].location}</p>
                  <p className="author-group">{testimonials[currentTestimonial].group}</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-navigation">
              <button className="nav-btn prev" onClick={prevTestimonial}>
                ‹
              </button>
              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
              <button className="nav-btn next" onClick={nextTestimonial}>
                ›
              </button>
            </div>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial-mini ${isVisible ? 'fade-in visible' : 'fade-in'} ${index === currentTestimonial ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className="mini-quote">
                  "{testimonial.quote.substring(0, 80)}..."
                </div>
                <div className="mini-author">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                  />
                  <div>
                    <h5>{testimonial.name}</h5>
                    <p>{testimonial.location}</p>
                  </div>
                </div>
                <div className="mini-rating">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
