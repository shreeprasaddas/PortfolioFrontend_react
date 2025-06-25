
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-center text-sm py-6 text-gray-400 border-t border-gray-700">
      Portfolio Dashboard App &copy; {new Date().getFullYear()}. All Rights Reserved.
      <p className="mt-1">Designed with React & Tailwind CSS.</p>
    </footer>
  );
};

export default Footer;
