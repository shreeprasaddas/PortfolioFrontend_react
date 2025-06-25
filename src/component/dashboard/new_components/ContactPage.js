
import React from 'react';

const ContactPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-300">This is the Contact Page. Details on how to reach us would go here.</p>
      <form className="mt-8 max-w-lg mx-auto bg-gray-700 p-6 rounded-lg shadow-xl">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2 text-left">Name</label>
          <input type="text" id="name" className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-800 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2 text-left">Email</label>
          <input type="email" id="email" className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-800 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2 text-left">Message</label>
          <textarea id="message" rows="4" className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-800 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors" type="button">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
