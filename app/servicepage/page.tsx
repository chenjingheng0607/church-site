import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Make sure to install: npm install lucide-react

const ServicePage = () => {
  return (
    // No need for <Header /> or <Footer /> here, the layout file handles it.
    <div className="bg-[#F8F3E9] py-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Service List */}
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl font-bold text-[#F5A623]">Sunday Worship</h2>
            <p className="text-xl text-gray-500 mt-2">For the whole church family</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-400">Firelight</h2>
            <p className="text-xl text-gray-500 mt-2">Vibrant and energetic gathering for young people</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-400">PCW</h2>
            <p className="text-xl text-gray-500 mt-2">Space for parent and children to grow in service</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-400">MJYF</h2>
            <p className="text-xl text-gray-500 mt-2">Fellowship for teenagers</p>
          </div>
        </div>

        {/* Right Column: Image Carousel */}
        <div className="relative">
          <div className="flex overflow-hidden space-x-6">
            {/* Card 1 */}
            <div className="w-full flex-shrink-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1543599723-8e435a953a27?q=80&w=2187&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Church congregation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-6 text-center">
                  <h3 className="text-4xl font-bold mb-2 drop-shadow-md">This is our home!</h3>
                  <p className="mt-2">Our Sunday Worship is a time where the whole church comes together to experience God's presence through praise, prayer, and the preaching of His Word. It is a place for all ages to worship and grow in faith as one spiritual family.</p>
                </div>
              </div>
            </div>
            {/* You can add another card here for the carousel functionality */}
          </div>
           {/* Navigation Arrows */}
          <div className="flex justify-start space-x-4 mt-8">
            <button aria-label="Previous Slide" className="bg-transparent border-2 border-[#F5A623] text-[#F5A623] rounded-full p-3 hover:bg-[#F5A623] hover:text-white transition-colors duration-300">
              <ChevronLeft size={24} />
            </button>
            <button aria-label="Next Slide" className="bg-transparent border-2 border-[#F5A623] text-[#F5A623] rounded-full p-3 hover:bg-[#F5A623] hover:text-white transition-colors duration-300">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;