
import React from 'react';

const HomePage = () => { // Corresponds to /about route which used "Home" component
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-300">This is the About Page (previously Home). Information about the company or project.</p>
      <div className="mt-6 text-left max-w-2xl mx-auto">
        <p className="mb-3">We are a passionate team dedicated to creating amazing web experiences.</p>
        <p className="mb-3">Our mission is to leverage cutting-edge technologies to solve real-world problems and deliver value to our users.</p>
        <p>This portfolio dashboard is an example of our commitment to quality and user-centric design.</p>
      </div>
    </div>
  );
};

export default HomePage;
