import React from 'react';
import {Routes, Route, Navigate, MemoryRouter} from 'react-router-dom';
import {Game} from './pages/Game';
import {Settings} from './pages/Settings';

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/game" element={<Game />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/settings" replace />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;