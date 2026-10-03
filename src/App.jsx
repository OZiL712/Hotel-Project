import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLayout from './pages/admin/AdminLayout';
import SettingsManager from './pages/admin/SettingsManager';
import RoomManager from './pages/admin/RoomManager';
import BookingsDashboard from './pages/admin/BookingsDashboard';
import Developer from './pages/Developer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/999887passR" element={<AdminLayout />}>
          <Route index element={<Navigate to="/999887passR/bookings" replace />} />
          <Route path="bookings" element={<BookingsDashboard />} />
          <Route path="rooms" element={<RoomManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
