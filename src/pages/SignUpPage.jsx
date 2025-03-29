import { motion } from "framer-motion";
import Input from "../components/Input";
import {
  Mail,
  User,
  Computer,
  IdCard,
  Phone,
  KeyRound,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";
import Swal from "sweetalert2";

// const departments = [
//   "HR",
//   "IT",
//   "FINANCE",
//   "DESIGN",
//   "MARKETING",
//   "SALES",
//   "SERVICE",
// ];

const SignUpPage = () => {
  const [newEmployee, setNewEmployee] = useState({
    email: "",
    name: "",
    department: "",
    idcard: "",
    phonenumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const { signup, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, name, department, idcard, phonenumber, password } =
      newEmployee;

    // ตรวจสอบว่าไม่มีฟิลด์ใดๆ ที่ขาด
    if (
      !email ||
      !name ||
      !department ||
      !idcard ||
      !phonenumber ||
      !password
    ) {
      const missingFields = [];

      // หาค่าฟิลด์ที่ขาด
      if (!email) missingFields.push("อีเมล");
      if (!name) missingFields.push("ชื่อ");
      if (!department) missingFields.push("แผนก");
      if (!idcard) missingFields.push("รหัสบัตรประชาชน");
      if (!phonenumber) missingFields.push("หมายเลขโทรศัพท์");
      if (!password) missingFields.push("รหัสผ่าน");

      // แสดงข้อความแจ้งเตือนด้วย Swal
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ครบถ้วน",
        text: `กรุณากรอกข้อมูล: ${missingFields.join(", ")}`,
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      // ส่งข้อมูลไปที่ API เพื่อสมัครสมาชิก
      await signup(email, name, department, idcard, phonenumber, password);
      // หากสมัครสมาชิกสำเร็จ นำทางไปหน้า homepage
      navigate("/homepage");
    } catch (error) {
      console.log(error);

      // ถ้าเกิดข้อผิดพลาดจาก backend
      if (error.response) {
        // แสดงข้อความจาก response ของ backend
        const errorMessage =
          error.response.data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก";
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: errorMessage,
          confirmButtonText: "ตกลง",
        });
      } else {
        // หากไม่มี response จาก backend แสดงข้อความนี้
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถติดต่อกับเซิร์ฟเวอร์ได้",
          confirmButtonText: "ตกลง",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            Create Your Account
          </h2>

          <form onSubmit={handleSignUp}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={newEmployee.email}
              name="email"
              onChange={handleChange}
            />
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={newEmployee.name}
              name="name"
              onChange={handleChange}
            />
            <Input
              icon={Computer}
              type="text"
              placeholder="Department"
              value={newEmployee.department}
              name="department"
              onChange={handleChange}
            />
            {/* <div className="relative mb-4">
              <Computer
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500"
                size={20}
              />
              <select
                id="department"
                name="department"
                value={newEmployee.department}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, department: e.target.value })
                }
                className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200 appearance-none"
                required
              >
                <option value="">Select a department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div> */}
            <Input
              icon={IdCard}
              type="text"
              placeholder="ID Card"
              value={newEmployee.idcard}
              name="idcard"
              onChange={handleChange}
            />
            <Input
              icon={Phone}
              type="text"
              placeholder="Phone Number"
              value={newEmployee.phonenumber}
              name="phonenumber"
              onChange={handleChange}
            />
            <Input
              icon={KeyRound}
              type="password"
              placeholder="Password"
              value={newEmployee.password}
              name="password"
              onChange={handleChange}
            />
            <PasswordStrengthMeter password={newEmployee.password} />

            <motion.button
              className="mt-5 flex justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className=" animate-spin mx-auto" size={24} />
              ) : (
                <>
                  <UserPlus /> Sign Up
                </>
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-yellow-400 hover:underline">
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;