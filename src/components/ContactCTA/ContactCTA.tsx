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
    window.open(`https://wa.me/972526658209?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+972526658209';
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
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
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
                  <span className="detail-value">+972-52-6658209</span>
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
