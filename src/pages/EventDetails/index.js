import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mock data - In a real app, this would come from an API
const mockEvent = {
  id: 1,
  title: 'Local Farmers Market',
  type: 'fair',
  date: '2024-02-20',
  location: 'Central Park',
  description: 'Weekly farmers market featuring local produce and crafts',
  position: [51.505, -0.09],
  attendees: [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ],
  wishlist: [
    { id: 1, item: 'Organic vegetables', requested: false },
    { id: 2, item: 'Homemade jams', requested: true }
  ],
  chat: [
    { id: 1, user: 'John Doe', message: 'Looking forward to the event!', timestamp: '2024-02-19T10:00:00' },
    { id: 2, user: 'Jane Smith', message: 'Will there be any workshops?', timestamp: '2024-02-19T10:05:00' }
  ]
};

function EventDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [wishlistItem, setWishlistItem] = useState('');
  const [event] = useState(() => {
    // In a real app, this would fetch from an API using the id
    console.log('Fetching event with id:', id);
    return mockEvent;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, this would be handled by a WebSocket connection
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleAddWishlistItem = (e) => {
    e.preventDefault();
    if (!wishlistItem.trim()) return;

    // In a real app, this would be sent to an API
    console.log('Adding wishlist item:', wishlistItem);
    setWishlistItem('');
  };

  const handleToggleRequest = (itemId) => {
    // In a real app, this would update the API
    console.log('Toggling request for item:', itemId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-green-900">{event.title}</h1>
            <p className="text-green-700 mt-3 text-lg">{event.location}</p>
          </div>
          <span className="inline-block px-4 py-2 rounded-full bg-green-700 text-white font-semibold text-lg">
            {event.type}
          </span>
        </div>

        <p className="text-green-800 mb-6 text-lg">{event.description}</p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-green-900">Location</h2>
          <div className="h-[350px] rounded-lg overflow-hidden shadow-sm">
            <MapContainer center={event.position} zoom={13} className="h-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={event.position} />
            </MapContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-900">Wishlist</h2>
            <div className="bg-green-50 rounded-lg p-6 shadow-inner">
              <form onSubmit={handleAddWishlistItem} className="mb-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={wishlistItem}
                    onChange={(e) => setWishlistItem(e.target.value)}
                    placeholder="Add item to wishlist"
                    className="flex-1 px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </form>
              <ul className="space-y-3">
                {event.wishlist.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                  >
                    <span className="text-green-800 font-medium">{item.item}</span>
                    <button
                      onClick={() => handleToggleRequest(item.id)}
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        item.requested
                          ? 'bg-green-200 text-green-700'
                          : 'bg-green-700 text-white hover:bg-green-800'
                      }`}
                    >
                      {item.requested ? 'Requested' : 'Request'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-900">Chat</h2>
            <div className="bg-green-50 rounded-lg p-6 shadow-inner">
              <div className="h-[350px] overflow-y-auto mb-6">
                {event.chat.map((msg) => (
                  <div key={msg.id} className="mb-4">
                    <div className="flex justify-between text-sm text-green-700 font-semibold">
                      <span>{msg.user}</span>
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="mt-1 text-green-800">{msg.message}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
