import { motion } from "framer-motion";
import Input from "../components/Input";
import {
  Mail,
  User,
  Computer,
  IdCard,
  Phone,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
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
    // password: "",
  });
  const navigate = useNavigate();

  const { signup, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, name, department, idcard, phonenumber } =
      newEmployee;

    // ตรวจสอบว่าไม่มีฟิลด์ใดๆ ที่ขาด
    if (
      !email ||
      !name ||
      !department ||
      !idcard ||
      !phonenumber 
      // !password
    ) {
      const missingFields = [];

      // หาค่าฟิลด์ที่ขาด
      if (!email) missingFields.push("อีเมล");
      if (!name) missingFields.push("ชื่อ");
      if (!department) missingFields.push("แผนก");
      if (!idcard) missingFields.push("รหัสบัตรประชาชน");
      if (!phonenumber) missingFields.push("หมายเลขโทรศัพท์");
      // if (!password) missingFields.push("รหัสผ่าน");

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
      await signup(email, name, department, idcard, phonenumber);
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
        className="sm:mx-auto sm:w-full sm:max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-500 to-emerald-500 text-transparent bg-clip-text">
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

            <motion.button
              className="mt-5 flex justify-center w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold rounded-lg shadow-md hover:from-sky-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                <>
                  <UserPlus className="mr-2" /> Sign Up
                </>
              )}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"} className="text-sky-700 hover:underline">
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;