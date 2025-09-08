import React from 'react';
import HeroSection from './components/HeroSection';
import SpiritualConnection from './components/SpiritualConnection';
import AboutEstate from './components/AboutEstate';
import GuestExperience from './components/GuestExperience';
import Testimonials from './components/Testimonials';
import LocationMap from './components/LocationMap';
import ContactCTA from './components/ContactCTA';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <HeroSection />
      <SpiritualConnection />
      <AboutEstate />
      <GuestExperience />
      <Testimonials />
      <LocationMap />
      <ContactCTA />
    </div>
  );
};

export default App;
