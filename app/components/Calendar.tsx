'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Bell } from 'lucide-react';

// --- Types for our data ---
type EventCategory = 'Service' | 'Bible Study' | 'Fellowship' | 'Outreach' | 'Youth' | 'Music';

interface CalendarEvent {
  date: string; // YYYY-MM-DD format
  category: EventCategory;
  name: string;
}

// --- Data based on the image ---
const categories: { name: EventCategory; color: string }[] = [
  { name: 'Service', color: 'bg-blue-500' },
  { name: 'Bible Study', color: 'bg-purple-500' },
  { name: 'Fellowship', color: 'bg-yellow-500' },
  { name: 'Outreach', color: 'bg-red-500' },
  { name: 'Youth', color: 'bg-pink-500' },
  { name: 'Music', color: 'bg-sky-400' },
];

const events: CalendarEvent[] = [
  { date: '2025-08-31', category: 'Service', name: 'Service' },
  { date: '2025-09-01', category: 'Youth', name: 'Youth' },
  { date: '2025-09-07', category: 'Service', name: 'Service' },
  { date: '2025-09-14', category: 'Service', name: 'Service' },
  { date: '2025-09-16', category: 'Outreach', name: 'Outreach' },
  { date: '2025-09-16', category: 'Music', name: 'Music' },
  { date: '2025-09-17', category: 'Bible Study', name: 'Bible Study' },
  { date: '2025-09-17', category: 'Music', name: 'Music' },
  { date: '2025-09-18', category: 'Fellowship', name: 'Fellowship' },
  { date: '2025-09-18', category: 'Outreach', name: 'Outreach' },
  { date: '2025-09-18', category: 'Youth', name: 'Youth' },
  { date: '2025-09-21', category: 'Service', name: 'Service' },
  { date: '2025-09-22', category: 'Fellowship', name: 'Fellowship' },
  { date: '2025-09-23', category: 'Outreach', name: 'Outreach' },
  { date: '2025-09-28', category: 'Service', name: 'Service' },
];


// --- Helper function to get category color ---
const getCategoryColor = (categoryName: EventCategory) => {
  const category = categories.find(c => c.name === categoryName);
  return category ? category.color : 'bg-gray-400';
};

// --- The Main Component ---
const Calendar = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All Events'>('Service');
  const [selectedDate] = useState(14); // September 14 is selected in the image

  const calendarDays = [
    { day: 31, isCurrentMonth: false }, { day: 1, isCurrentMonth: true }, { day: 2, isCurrentMonth: true }, { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true }, { day: 5, isCurrentMonth: true }, { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true }, { day: 9, isCurrentMonth: true }, { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true }, { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true }, { day: 16, isCurrentMonth: true }, { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true }, { day: 19, isCurrentMonth: true }, { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true }, { day: 23, isCurrentMonth: true }, { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true }, { day: 1, isCurrentMonth: false }, { day: 2, isCurrentMonth: false }, { day: 3, isCurrentMonth: false }, { day: 4, isCurrentMonth: false },
  ];
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getEventsForDate = (day: number, isCurrentMonth: boolean) => {
    const month = isCurrentMonth ? '09' : (day > 15 ? '08' : '10');
    const dateStr = `2025-${month}-${day.toString().padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  }

  return (
    <div className="bg-[#FDFBF8] p-8 font-sans">
      <div className="text-left mb-8">
        <h1 className="text-5xl font-bold text-orange-500">What's happening</h1>
        <p className="text-gray-600 mt-2 text-lg">Stay connected with our upcoming services, events, and special gatherings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Left Sidebar --- */}
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Filtering</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          
          <h3 className="font-bold text-gray-800 mb-3">Categories</h3>
          <ul className="space-y-2">
            <li
              onClick={() => setSelectedCategory('All Events')}
              className={`cursor-pointer px-4 py-2 rounded-md ${selectedCategory === 'All Events' ? 'bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
            >
              All Events
            </li>
            {categories.map(cat => (
              <li
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-md ${selectedCategory === cat.name ? 'bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
              >
                <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                {cat.name}
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
             <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <p className="font-semibold">Sunday, September 14</p>
                <p>0 events</p>
             </div>
             <div className="bg-orange-100 border border-orange-200 text-gray-700 p-4 rounded-lg text-sm">
                <p className="font-bold">Sunday Worship Service</p>
                <p className="my-1">10:30AM - Sanctuary Hall</p>
                <p className="mb-4">Link to register: <a href="http://hello.com.my" className="text-orange-600 hover:underline">http://hello.com.my</a></p>
                <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2">
                  <Bell size={16} />
                  Remind me
                </button>
             </div>
          </div>
        </aside>

        {/* --- Right Calendar --- */}
        <main className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-md hover:bg-gray-100">
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-800">September 2025</h2>
            <button className="bg-orange-100 text-orange-600 font-semibold px-4 py-1.5 rounded-md hover:bg-orange-200">
              Today
            </button>
          </div>

          <div className="grid grid-cols-7 gap-px">
             {/* Day Headers */}
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {calendarDays.map((date, index) => {
              const dayEvents = getEventsForDate(date.day, date.isCurrentMonth);
              return (
                <div key={index} className={`relative pt-2 pb-8 px-2 border-t border-l border-gray-200 ${date.day === selectedDate && date.isCurrentMonth ? 'bg-gray-100' : ''}`}>
                  <span className={`font-medium ${date.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}`}>{date.day}</span>
                   <div className="mt-1 space-y-1">
                      {dayEvents.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex items-center gap-1.5 text-xs">
                          <span className={`w-2 h-2 rounded-full ${getCategoryColor(event.category)}`}></span>
                          <span className="text-gray-700">{event.name}</span>
                        </div>
                      ))}
                    </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;