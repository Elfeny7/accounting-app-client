import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/Dashboard';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Sidebar /></ProtectedRoute>}>
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App