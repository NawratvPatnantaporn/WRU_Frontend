import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, KeyRound, LogIn, ArrowRight, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useAuthStore();
  //, error
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // พยายามเข้าสู่ระบบ
      await login(email, password);
    } catch (error) {
      console.log(error);

      // ถ้าเกิดข้อผิดพลาดจากการล็อกอิน
      if (error.response) {
        const errorMessage =
          error.response.data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";

        // ถ้าข้อผิดพลาดมาจาก backend
        Swal.fire({
          icon: "error",
          title: errorMessage,
          confirmButtonText: "ตกลง",
        });
      } else {
        // ถ้าไม่สามารถติดต่อกับ backend ได้
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
          confirmButtonText: "ตกลง",
        });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r text-white text-transparent bg-clip-text">
            Welcome
          </h2>

          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              icon={KeyRound}
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-yellow-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {/* {error && (
              <p className="text-red-500 font-semibold mb-2">{error}</p>
            )} */}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin  mx-auto" />
              ) : (
                <>
                  <LogIn /> Login
                </>
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Not a member?{" "}
            <Link to="/signup" className="text-yellow-400 hover:underline">
              Sign Up <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default LoginPage;
