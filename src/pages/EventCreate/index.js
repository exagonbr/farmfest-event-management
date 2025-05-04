import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Fix for default marker icon in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function EventCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: 'fair',
    date: '',
    location: '',
    description: '',
    items: '', // For exchange events
    maxAttendees: '',
    position: [51.505, -0.09], // Default location
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMapClick = (e) => {
    setFormData(prev => ({
      ...prev,
      position: [e.latlng.lat, e.latlng.lng]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would typically send the data to an API
    console.log('Form submitted:', formData);
    // Redirect to home page after submission
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-green-900 mb-8">Create New Event</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg font-semibold text-green-900">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            required
            className="mt-2 block w-full px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-green-900">
            Event Type
          </label>
          <select
            name="type"
            required
            className="mt-2 block w-full px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="fair">Fair</option>
            <option value="workshop">Workshop</option>
            <option value="exchange">Exchange</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-green-900">
            Date
          </label>
          <input
            type="date"
            name="date"
            required
            className="mt-2 block w-full px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-green-900">
            Location Name
          </label>
          <input
            type="text"
            name="location"
            required
            className="mt-2 block w-full px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-green-900 mb-3">
            Select Location on Map
          </label>
          <div className="h-[450px] border border-green-300 rounded-lg overflow-hidden shadow-sm">
            <MapContainer
              center={formData.position}
              zoom={13}
              onClick={handleMapClick}
              className="h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={formData.position} />
            </MapContainer>
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-green-900">
            Description
          </label>
          <textarea
            name="description"
            rows="5"
            required
            className="mt-2 block w-full px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {formData.type === 'exchange' && (
          <div>
            <label className="block text-lg font-semibold text-green-900">
              Items for Exchange (comma-separated)
            </label>
            <input
              type="text"
              name="items"
              className="mt-2 block w-full px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
              value={formData.items}
              onChange={handleInputChange}
              placeholder="e.g., tools, seeds, equipment"
            />
          </div>
        )}

        <div>
          <label className="block text-lg font-semibold text-green-900">
            Maximum Attendees
          </label>
          <input
            type="number"
            name="maxAttendees"
            min="1"
            className="mt-2 block w-full px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
            value={formData.maxAttendees}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-end space-x-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-green-300 rounded-lg shadow-sm text-base font-semibold text-green-900 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventCreate;
