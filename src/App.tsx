import {Routes, Route, Navigate, MemoryRouter} from 'react-router-dom';
import {Game} from './pages/Game';

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Navigate to="/game" replace />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;