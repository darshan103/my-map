import React from 'react'
import MapPinpoint from './components/MapPinpoint'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyMap from './components/MyMap'
import MapInteractions from './components/MapInteractions'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MyMap />} />
        <Route path="/map-interactions" element={<MapInteractions />} />
        <Route path="/map-pinpoint" element={<MapPinpoint />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App