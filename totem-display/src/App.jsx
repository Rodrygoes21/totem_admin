import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TotemDisplay from './pages/TotemDisplay';
import DemoPage from './pages/DemoPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DemoPage />} />
        <Route path="/totem" element={<TotemDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
