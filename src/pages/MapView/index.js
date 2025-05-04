import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
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
  const [center] = useState([51.505, -0.09]);

  useEffect(() => {
    console.log('Fetching data for time range:', timeRange);
  }, [timeRange]);

  const getCircleColor = (intensity) => {
    return intensity > 0.6 ? '#FF0000' :
           intensity > 0.3 ? '#FF6B6B' :
           '#FFA07A';
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="time-range-label">Time Range</InputLabel>
          <Select
            labelId="time-range-label"
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">Past Week</MenuItem>
            <MenuItem value="month">Past Month</MenuItem>
            <MenuItem value="year">Past Year</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Checkbox checked={showHeatmap} onChange={(e) => setShowHeatmap(e.target.checked)} />}
          label="Show Activity Heatmap"
        />
        <FormControlLabel
          control={<Checkbox checked={showEvents} onChange={(e) => setShowEvents(e.target.checked)} />}
          label="Show Events"
        />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 16, height: 16, bgcolor: '#FF0000', borderRadius: '50%' }} />
            <Typography>High Activity</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 16, height: 16, bgcolor: '#FF6B6B', borderRadius: '50%' }} />
            <Typography>Medium Activity</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 16, height: 16, bgcolor: '#FFA07A', borderRadius: '50%' }} />
            <Typography>Low Activity</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ height: 600, borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper', boxShadow: 1 }}>
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
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">Activity Zone</Typography>
                  <Typography>Events: {activity.events}</Typography>
                  <Typography>Participants: {activity.participants}</Typography>
                </Box>
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
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">{event.title}</Typography>
                  <Typography>Type: {event.type}</Typography>
                  <Typography>Date: {event.date}</Typography>
                  <Typography>Attendees: {event.attendees}</Typography>
                </Box>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
}

export default MapView;
