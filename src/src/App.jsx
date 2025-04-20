import { Routes, Route, Navigate } from 'react-router-dom';
import MakePage from './pages/Make';
import TakePage from './pages/Take';
import SettlePage from './pages/Settle';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/make" replace />} />
          <Route path="/make" element={<MakePage />} />
          <Route path="/take" element={<TakePage />} />
          <Route path="/settle" element={<SettlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
