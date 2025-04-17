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
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-40 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to={"/homepage"}
            className="text-2xl font-bold text-sky-600 flex items-center space-x-2"
          >
            We Are You
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-sky-600 font-medium transition"
            >
              Home
            </Link>

            {user && (
              <Link className="relative group text-gray-700 hover:text-amber-600 transition">
                <Bell className="inline-block mr-1" size={20} />
                <span className="hidden sm:inline">Notification</span>
                <span className="absolute -top-2 -left-2 bg-rose-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-rose-400 transition">
                  3
                </span>
              </Link>
            )}

            {isAdmin && (
              <Link
                to={"/secret-dashboard"}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md font-medium transition flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">DashBoard</span>
              </Link>
            )}

            {isEmployee && (
              <Link
                to={"/employee-dashboard"}
                className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md flex items-center transition"
              >
                <User size={18} />
                <span className="hidden sm:inline ml-2">DashBoard</span>
              </Link>
            )}

            {user ? (
              <>
                <Link
                  to={"/myprofile"}
                  className="hover:text-sky-600 text-gray-800 py-2 px-4 rounded-md flex items-center transition"
                >
                  <User size={18} />
                  <p className="hidden sm:inline ml-2">{user.name}</p>
                </Link>
                <button
                  onClick={logout}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md flex items-center transition"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline ml-2">Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md flex items-center transition"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md flex items-center transition"
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