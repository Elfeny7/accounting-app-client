import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/Dashboard';
import Transaction from './pages/Transaction';
import { Routes, Route } from "react-router-dom";
import Report from './pages/Report';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute><Sidebar /></ProtectedRoute>}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
    </>
  )
}

export default App