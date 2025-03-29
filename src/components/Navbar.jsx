import {
  Bell,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const isEmployee = user?.role === "employee"; // เพิ่มเงื่อนไข role เป็น employee

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to={"/homepage"}
            className="text-2xl font-bold text-blue-400 items-center space-x-2 flex"
          >
            We Are You
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link className="relative group text-gray-300 hover:text-yellow-400 transition duration-300 ease-in-out">
                <Bell
                  className="inline-block mr-1 group-yellow:text-emerald-400"
                  size={20}
                />
                <span className="hidden sm:inline">Notification</span>
                <span className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-blue-400 transition duration-300 ease-in-out">
                  3
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link
                to={"/secret-dashboard"}
                className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">DashBoard</span>
              </Link>
            )}

            {isEmployee && (
              <Link
                to={"/employee-dashboard"}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <User size={18} />
                <span className="hidden sm:inline ml-2">DashBoard</span>
              </Link>
            )}

            {user ? (
              <>
                <Link
                  to={"/myprofile"}
                  className="hover:text-blue-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <User size={18} />
                  <p className="hidden sm:inline ml-2">{user.name}</p>
                </Link>
                <button
                  onClick={logout}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline ml-2">Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;