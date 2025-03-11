import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Game } from './pages/Game';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<Game />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/settings" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;