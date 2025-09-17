import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StatusCheck from "./pages/StatusCheck";
import SchoolTransactions from "./pages/SchoolTransactions";
import Login from "./pages/Login";
import Analytics from "./pages/Analytics"; // 👈 must match file name exactly

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

// Layout with conditional Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {!hideNavbar && <Navbar />}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/status-check" element={<PrivateRoute><StatusCheck /></PrivateRoute>} />
          <Route path="/school-details" element={<PrivateRoute><SchoolTransactions /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />

          {/* Default → redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

