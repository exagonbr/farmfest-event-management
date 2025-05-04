import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mock data - In a real app, this would come from an API
const mockActivities = [
  {
    id: 1,
    position: [51.505, -0.09],
    intensity: 0.8,
    events: 12,
    participants: 150,
  },
  {
    id: 2,
    position: [51.51, -0.1],
    intensity: 0.5,
    events: 8,
    participants: 90,
  },
  {
    id: 3,
    position: [51.515, -0.095],
    intensity: 0.3,
    events: 5,
    participants: 45,
  }
];

const mockEvents = [
  {
    id: 1,
    title: 'Local Farmers Market',
    type: 'fair',
    date: '2024-02-20',
    position: [51.505, -0.09],
    attendees: 45
  },
  {
    id: 2,
    title: 'Organic Farming Workshop',
    type: 'workshop',
    position: [51.51, -0.1],
    date: '2024-02-22',
    attendees: 20
  }
];

function MapView() {
  const [timeRange, setTimeRange] = useState('week');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [center] = useState([51.505, -0.09]); // Default center

  // In a real app, this would fetch data based on the time range
  useEffect(() => {
    console.log('Fetching data for time range:', timeRange);
  }, [timeRange]);

  const getCircleColor = (intensity) => {
    return intensity > 0.6 ? '#FF0000' :
           intensity > 0.3 ? '#FF6B6B' :
           '#FFA07A';
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
          
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={showHeatmap}
              onChange={(e) => setShowHeatmap(e.target.checked)}
              className="form-checkbox h-5 w-5 text-primary"
            />
            <span className="ml-2">Show Activity Heatmap</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={showEvents}
              onChange={(e) => setShowEvents(e.target.checked)}
              className="form-checkbox h-5 w-5 text-primary"
            />
            <span className="ml-2">Show Events</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-red-500 rounded-full inline-block mr-2"></span>
            <span>High Activity</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-red-300 rounded-full inline-block mr-2"></span>
            <span>Medium Activity</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-red-200 rounded-full inline-block mr-2"></span>
            <span>Low Activity</span>
          </div>
        </div>
      </div>

      <div className="h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
        <MapContainer center={center} zoom={13} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {showHeatmap && mockActivities.map((activity) => (
            <Circle
              key={activity.id}
              center={activity.position}
              radius={500}
              pathOptions={{
                color: getCircleColor(activity.intensity),
                fillColor: getCircleColor(activity.intensity),
                fillOpacity: 0.4
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">Activity Zone</h3>
                  <p>Events: {activity.events}</p>
                  <p>Participants: {activity.participants}</p>
                </div>
              </Popup>
            </Circle>
          ))}

          {showEvents && mockEvents.map((event) => (
            <Circle
              key={event.id}
              center={event.position}
              radius={200}
              pathOptions={{
                color: '#4F7942',
                fillColor: '#4F7942',
                fillOpacity: 0.6
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p>Type: {event.type}</p>
                  <p>Date: {event.date}</p>
                  <p>Attendees: {event.attendees}</p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
