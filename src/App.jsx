import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfileLogin from "./pages/ProfileLogin";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import AddWorkLog from "./pages/employee/AddWorkLog";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import EmployeeDetail from "./pages/admin/EmployeeDetail";
import EditEmployee from "./pages/admin/EditEmployee";
import CalcuLate from "./pages/employee/CalcuLate";
import ITPage from "./pages/department/ITPage";
import HRPage from "./pages/department/HRPage";
import FinancePage from "./pages/department/FinancePage";
import MarketingPage from "./pages/department/MarketingPage";
import SalesPage from "./pages/department/SalesPage";
import ServicePage from "./pages/department/ServicePage";
import DesignPage from "./pages/department/DesignPage";
import EmployeePage from "./pages/employee/EmployeePage";
import PendingPage from "./pages/employee/PendingPage";
import StatusPage from "./pages/employee/StatusPage";

// Protect routes for admin role
const AdminRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated} = useAuthStore();

	if (isAuthenticated) {
		return <Navigate to='/homepage' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth} = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 relative overflow-hidden">
      <FloatingShape
        color="bg-yellow-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-yellow-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-yellow-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <div className="relative z-50 pt-20 ">
        <Navbar />
        <Routes>
          <Route
            path="/myprofile"
            element={
              <ProtectedRoute>
                {" "}
                <ProfileLogin />{" "}
              </ProtectedRoute>
            }
          />
          {/*Employees*/}
          <Route
            path="/addwork"
            element={
              <ProtectedRoute>
                {" "}
                <AddWorkLog />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/calculate"
            element={
              <ProtectedRoute>
                {" "}
                <CalcuLate />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending"
            element={
              <ProtectedRoute>
                {" "}
                <PendingPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute>
                {" "}
                <StatusPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
                <HomePage />
            }
          />

          {/* DepartMentPage */}
          <Route
            path="/HR"
            element={
              <HRPage />            
            }
          />
          <Route
            path="/IT"
            element={            
              <ITPage />             
            }
          />
          <Route
            path="/finance"
            element={              
                <FinancePage />              
            }
          />
          <Route
            path="/marketing"
            element={              
                <MarketingPage />
            }
          />
          <Route
            path="/sales"
            element={
              <SalesPage />
            }
          />
          <Route
            path="/service"
            element={                              
                <ServicePage />              
            }
          />
          <Route
            path="/design"
            element={                            
                <DesignPage />              
            }
          />
          {/*  */}

          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                {" "}
                <SignUpPage />{" "}
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                {" "}
                <LoginPage />{" "}
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                {" "}
                <ForgotPasswordPage />{" "}
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute>
                <EmployeePage />
              </ProtectedRoute>
            }
          />

          {/*Admin Only*/}
          <Route
            path="/secret-dashboard"
            element={
              <AdminRoute>
                {" "}
                <AdminPage />{" "}
              </AdminRoute>
            }
          />
          <Route
            path="/read/:id"
            element={
              <AdminRoute>
                {" "}
                <EmployeeDetail />{" "}
              </AdminRoute>
            }
          />
          <Route
            path="/editemployee/:id"
            element={
              <AdminRoute>
                {" "}
                <EditEmployee />{" "}
              </AdminRoute>
            }
          />

          {/* catch all routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
