import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Portfolio from '../components/sections/Portfolio';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      {/* <Portfolio /> */}
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;