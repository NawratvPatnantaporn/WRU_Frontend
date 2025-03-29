import {  Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import axios from "axios";

const CalcuLate = () => {
  const { user, isLoading } = useAuthStore();
  const [earnings, setEarnings] = useState(null);
  const [error, setError] = useState("");

  // ดึงวันที่ปัจจุบันในรูปแบบ yyyy-mm-dd
  const today = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // กรองข้อมูลการทำงานเพื่อแสดงเฉพาะข้อมูลของวันนี้
  const todayWorkLogs = user?.daywork.filter((work) => {
    const workDate = new Date(work.date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return workDate === today;
  });

  // ฟังก์ชันสำหรับคำนวณรายได้
  const handleCalculate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:50100/api/worklog/CalcuLate"
      );
      setEarnings(response.data.totalEarnings);
      setError(""); // เคลียร์ข้อผิดพลาดที่อาจเกิดขึ้น
    } catch (error) {
      setError(error.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
            Today's Work Summary
          </h2>

          {/* ตรวจสอบว่า user มีข้อมูลการทำงานสำหรับวันนี้หรือไม่ */}
          {todayWorkLogs?.length > 0 ? (
            <div className="mb-4 text-center text-gray-200">
              {todayWorkLogs.map((work, index) => (
                <div key={index} className="text-gray-300">
                  <p className="text-lg">
                    <span className="font-semibold text-blue-400">
                      Hours Worked:{" "}
                    </span>
                    {work.hoursWorked} hours
                  </p>
                  <p className="text-lg mt-2">
                    <span className="font-semibold text-blue-400">
                      Price rate:{" "}
                    </span>
                    {user?.rate}฿
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No work logs for today.</p>
          )}

          {/* แสดงผลลัพธ์การคำนวณรายได้ */}
          {earnings !== null && (
            <div className="mt-4 text-center text-gray-300">
              <p className="text-lg">
                <span className="font-semibold text-blue-400">
                  Total Earnings:{" "}
                </span>
                {earnings}฿
              </p>
            </div>
          )}

          {/* แสดงข้อผิดพลาดถ้ามี */}
          {error && (
            <div className="mt-4 text-center text-red-500">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleCalculate}>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full flex justify-center py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                <>CalcuLate</>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CalcuLate;