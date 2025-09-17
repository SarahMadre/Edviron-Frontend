// Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login"); // redirect to login
  };

  return (
    <nav
      style={{ backgroundColor: "rgb(18, 92, 150)" }}
      className="text-white p-4 flex justify-between items-center"
    >
      <h1 className="font-bold text-xl">School Payment Dashboard</h1>

      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/school-details" className="hover:underline">
          School Transactions
        </Link>
        <Link to="/status-check" className="hover:underline">
          Status Check
        </Link>
        <Link to="/analytics" className="hover:underline">
          Analytics
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          // className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
