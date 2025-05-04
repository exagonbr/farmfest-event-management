import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data - In a real app, this would come from an API
const mockEvents = [
  {
    id: 1,
    title: 'Local Farmers Market',
    type: 'fair',
    date: '2024-02-20',
    location: 'Central Park',
    description: 'Weekly farmers market featuring local produce and crafts',
    attendees: 45
  },
  {
    id: 2,
    title: 'Organic Farming Workshop',
    type: 'workshop',
    date: '2024-02-22',
    location: 'Community Center',
    description: 'Learn about sustainable organic farming practices',
    attendees: 20
  },
  {
    id: 3,
    title: 'Tool Exchange',
    type: 'exchange',
    date: '2024-02-25',
    location: 'City Hall',
    description: 'Community tool sharing and exchange event',
    attendees: 30
  }
];

function Home() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = mockEvents.filter(event => {
    const matchesFilter = filter === 'all' || event.type === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-green-900">Community Events</h1>
        <Link
          to="/create-event"
          className="bg-green-700 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-800 transition-colors font-semibold"
        >
          Create Event
        </Link>
      </div>

      <div className="flex space-x-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-5 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-5 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="fair">Fairs</option>
          <option value="workshop">Workshops</option>
          <option value="exchange">Exchanges</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <Link
            key={event.id}
            to={`/event/${event.id}`}
            className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-green-900">{event.title}</h2>
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-700 text-white font-semibold">
                  {event.type}
                </span>
              </div>
              <p className="mt-3 text-green-800">{event.description}</p>
              <div className="mt-5 flex justify-between items-center text-sm text-green-600 font-medium">
                <span>{event.date}</span>
                <span>{event.location}</span>
              </div>
              <div className="mt-3 text-sm text-green-600 font-medium">
                {event.attendees} attendees
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <p className="text-green-600 text-lg font-semibold">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
