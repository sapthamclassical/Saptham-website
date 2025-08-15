import React from 'react';

const Vision = () => {
  return (
    <section id="vision" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
            Our <span className="text-orange-500">Vision</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          
          {/* Vision */}
          <div className="group p-6 flex flex-col justify-between bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 hover:-translate-y-1">
            <div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our vision is to create a vibrant platform for Bharatanatyam and Carnatic music,
                nurturing young talent while making classical arts accessible and relevant in today’s world.  
                We aim to preserve tradition, inspire innovation, and foster appreciation for the cultural richness
                of Indian classical arts within our campus and beyond.
              </p>
            </div>
          </div>

          {/* Objectives */}
          <div className="group p-6 flex flex-col justify-between bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 hover:-translate-y-1">
            <div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                Objectives
              </h3>
              <ul className="text-gray-700 leading-relaxed space-y-2">
                <li>• Provide a creative platform for innovation in classical arts.</li>
                <li>• Offer opportunities for performances and cultural events.</li>
                <li>• Promote classical arts to wider audiences through outreach and fusion works.</li>
                <li>• Encourage collaboration across campuses and disciplines.</li>
                <li>• Build networks through partnerships and cultural exchanges.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Vision;
