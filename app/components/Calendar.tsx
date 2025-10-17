// components/Calendar.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Bell } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
  parseISO
} from 'date-fns';

// --- Types ---
interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO date string
}

// --- The Main Component ---
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Record<string, CalendarEvent[]>>({});
  
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(lastDayOfMonth)
  });
  
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));

  useEffect(() => {
    const fetchEvents = async () => {
      const timeMin = startOfWeek(firstDayOfMonth).toISOString();
      const timeMax = endOfWeek(lastDayOfMonth).toISOString();

      try {
        const response = await fetch(`/api/calendar-events?timeMin=${timeMin}&timeMax=${timeMax}`);
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const data = await response.json();

        // Group events by date for easy lookup
        const groupedEvents: Record<string, CalendarEvent[]> = {};
        data.events.forEach((event: CalendarEvent) => {
            const eventDate = format(parseISO(event.start), 'yyyy-MM-dd');
            if (!groupedEvents[eventDate]) {
                groupedEvents[eventDate] = [];
            }
            groupedEvents[eventDate].push(event);
        });
        setEvents(groupedEvents);

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [currentDate]);


  return (
    <div className="bg-[#FDFBF8] p-8 font-sans">
      <div className="text-left mb-8">
        <h1 className="text-5xl font-bold text-orange-500">What's happening</h1>
        <p className="text-gray-600 mt-2 text-lg">Stay connected with our upcoming services, events, and special gatherings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Left Sidebar (Static for now) --- */}
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Filtering</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          
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
              <button onClick={goToPreviousMonth} className="p-2 rounded-md hover:bg-gray-100">
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button onClick={goToNextMonth} className="p-2 rounded-md hover:bg-gray-100">
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{format(currentDate, 'MMMM yyyy')}</h2>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="bg-orange-100 text-orange-600 font-semibold px-4 py-1.5 rounded-md hover:bg-orange-200"
            >
              Today
            </button>
          </div>

          <div className="grid grid-cols-7">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2 border-b">
                {day}
              </div>
            ))}
            
            {daysInMonth.map((day, index) => {
              const dayKey = format(day, 'yyyy-MM-dd');
              const dayEvents = events[dayKey] || [];
              
              return (
                <div key={index} className={`relative pt-2 pb-8 px-2 border-t border-l border-gray-200 ${!isSameMonth(day, currentDate) ? 'bg-gray-50' : ''}`}>
                  <span className={`font-medium flex items-center justify-center w-8 h-8 rounded-full 
                    ${!isSameMonth(day, currentDate) ? 'text-gray-400' : 'text-gray-800'}
                    ${isToday(day) ? 'bg-orange-500 text-white' : ''}
                  `}>
                    {format(day, 'd')}
                  </span>
                   <div className="mt-1 space-y-1">
                      {dayEvents.map((event) => (
                        <div key={event.id} className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 truncate">
                          {event.title}
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