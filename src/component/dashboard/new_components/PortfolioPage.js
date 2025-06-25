
import React from 'react';

const PortfolioPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Our Work</h1>
      <p className="text-gray-300 mb-8">This is the public Portfolio Page. A curated selection of projects would be displayed here.</p>
      {/* Example static portfolio items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3].map(item => (
          <div key={item} className="bg-gray-700 p-6 rounded-lg shadow-xl transform transition-all hover:scale-105">
            <img src={`https://picsum.photos/seed/public${item}/400/200`} alt={`Project ${item}`} className="w-full h-40 object-cover rounded-md mb-4"/>
            <h3 className="text-xl font-semibold text-white mb-2">Project Title {item}</h3>
            <p className="text-gray-400 text-sm">A brief description of this awesome project {item}. Highlighting skills and technologies used.</p>
            <a href="#" className="inline-block mt-4 text-indigo-400 hover:text-indigo-300">View Details &rarr;</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
