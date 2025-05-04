import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Chip, TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
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
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleAddWishlistItem = (e) => {
    e.preventDefault();
    if (!wishlistItem.trim()) return;
    console.log('Adding wishlist item:', wishlistItem);
    setWishlistItem('');
  };

  const handleToggleRequest = (itemId) => {
    console.log('Toggling request for item:', itemId);
  };

  return (
    <Box maxWidth={800} mx="auto" mt={4} mb={4}>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {event.title}
            </Typography>
            <Chip label={event.type} color="primary" />
          </Box>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            {event.location} | {event.date}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {event.description}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        Location
      </Typography>
      <Box sx={{ height: 350, borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <MapContainer center={event.position} zoom={13} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={event.position} />
        </MapContainer>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
            Wishlist
          </Typography>
          <Box sx={{ mb: 2 }}>
            <form onSubmit={handleAddWishlistItem} style={{ display: 'flex', gap: '8px' }}>
              <TextField
                label="Add item to wishlist"
                value={wishlistItem}
                onChange={(e) => setWishlistItem(e.target.value)}
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </form>
          </Box>
          <List>
            {event.wishlist.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <Button
                    variant={item.requested ? 'outlined' : 'contained'}
                    color="primary"
                    onClick={() => handleToggleRequest(item.id)}
                  >
                    {item.requested ? 'Requested' : 'Request'}
                  </Button>
                }
              >
                <ListItemText primary={item.item} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
            Chat
          </Typography>
          <Box sx={{ height: 350, overflowY: 'auto', mb: 2, border: '1px solid #ccc', borderRadius: 1, p: 2 }}>
            {event.chat.map((msg) => (
              <Box key={msg.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{msg.user}</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </Typography>
                <Typography variant="body1">{msg.message}</Typography>
              </Box>
            ))}
          </Box>
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
            <TextField
              label="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit">
              Send
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default EventDetails;
