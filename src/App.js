import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import EventCreate from './pages/EventCreate';
import EventDetails from './pages/EventDetails';
import MapView from './pages/MapView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="create-event" element={<EventCreate />} />
        <Route path="event/:id" element={<EventDetails />} />
        <Route path="map" element={<MapView />} />
      </Route>
    </Routes>
  );
}

export default App;
