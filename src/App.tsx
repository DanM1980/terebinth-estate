import React from 'react';
import HeroSection from './components/HeroSection';
import SpiritualConnection from './components/SpiritualConnection';
import LocationMap from './components/LocationMap';

import GuestExperience from './components/GuestExperience';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <HeroSection />
      <SpiritualConnection />
      <LocationMap />

      <GuestExperience />
      <Testimonials />
      <ContactCTA />
    </div>
  );
};

export default App;
