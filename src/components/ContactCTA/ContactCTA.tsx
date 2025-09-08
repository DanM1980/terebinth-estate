import React, { useState, useEffect } from 'react';
import './ContactCTA.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  groupSize: string;
  message: string;
}

const ContactCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    groupSize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('.contact-cta');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend or email service
      // For now, we'll just show a success message
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        groupSize: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hello! I'm interested in booking a stay at Terebinth Estate. Could you please provide more information about availability and rates?`;
    window.open(`https://wa.me/972XXXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+972XXXXXXXXX';
  };

  return (
    <section className="contact-cta section">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            Plan Your Faith Journey Today
          </h2>
          <p className={`section-subtitle ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            Ready to experience the Holy Land? Contact us to start planning your spiritual pilgrimage.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className={`info-card ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              <h3>Get in Touch</h3>
              <p>
                We're here to help you plan the perfect spiritual journey. Whether you're
                traveling as a family, church group, or seeking a personal retreat, we'll
                work with you to create an unforgettable experience.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <span>📱</span>
                  </div>
                  <div className="method-content">
                    <h4>WhatsApp</h4>
                    <p>Quick responses and easy booking</p>
                    <button
                      className="btn btn-primary"
                      onClick={handleWhatsAppClick}
                    >
                      Chat on WhatsApp
                    </button>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <span>📞</span>
                  </div>
                  <div className="method-content">
                    <h4>Phone Call</h4>
                    <p>Speak directly with our team</p>
                    <button
                      className="btn btn-secondary"
                      onClick={handlePhoneClick}
                    >
                      Call Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="contact-details">
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">+972-XX-XXX-XXXX</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">info@terebinth-estate.com</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">Golan Heights, Israel</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <div className={`form-card ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              <h3>Send Us a Message</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="groupSize">Group Size</label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleInputChange}
                  >
                    <option value="">Select group size</option>
                    <option value="1-2">1-2 people</option>
                    <option value="3-4">3-4 people</option>
                    <option value="5-8">5-8 people</option>
                    <option value="9-15">9-15 people</option>
                    <option value="16+">16+ people</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell us about your spiritual journey plans, preferred dates, and any special requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-gold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-status success">
                    ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-status error">
                    ❌ Sorry, there was an error sending your message. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
