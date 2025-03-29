import "react-toastify/dist/ReactToastify.css"; // อย่าลืม import CSS ที่จำเป็น
import Input from "../../components/Input";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { Loader, CalendarCheck, PencilLine, CalendarClock } from "lucide-react";
import Swal from "sweetalert2";
// import  Swal  from "sweetalert2";

const AddWorkLog = () => {
  const [workLog, setWorkLog] = useState({
    date: "",
    taskDetails: "",
    progressLevel: "",
    hoursWorked: "",
  });

  const [isLoading, setIsLoading] = useState(false); // State สำหรับสถานะการโหลด

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkLog({
      ...workLog,
      [name]: name === "hoursWorked" ? Number(value) : value, // แปลง hoursWorked เป็นตัวเลข
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // แสดง SweetAlert2 เพื่อยืนยันข้อมูลก่อนส่ง
    const result = await Swal.fire({
      title: "Please confirm",
      text: `Do you want to submit the following work log?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "No, edit",
      html: `
      <strong>Date:</strong> ${workLog.date} <br />
      <strong>Task Details:</strong> ${workLog.taskDetails} <br />
      <strong>Progress Level:</strong> ${workLog.progressLevel} <br />
      <strong>Hours Worked:</strong> ${workLog.hoursWorked} hours
    `, // แสดงข้อมูลที่กรอกในฟอร์ม
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:50100/api/worklog",
          workLog,
          { withCredentials: true } // ส่ง cookies สำหรับการยืนยันตัวตน
        );

        // ใช้ SweetAlert2 (Swal) สำหรับการแจ้งเตือน success
        Swal.fire({
          icon: "success",
          title: "Work log added successfully!",
          text: response.data.message || "Work log added successfully!",
          confirmButtonText: "OK",
        });

        setWorkLog({
          date: "",
          taskDetails: "",
          progressLevel: "",
          hoursWorked: "",
        });
      } catch (error) {
        console.error("Error adding work log:", error);

        // ใช้ SweetAlert2 (Swal) สำหรับการแจ้งเตือน error
        Swal.fire({
          icon: "error",
          title: "Failed to add work log!",
          text: error.response?.data?.message || "Failed to add work log!",
          confirmButtonText: "Try again",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // ถ้าผู้ใช้เลือก "No, edit" จะไม่ทำอะไร
      setIsLoading(false);
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
            Work Log
          </h2>

          <form onSubmit={handleSubmit}>
            <Input
              icon={CalendarCheck}
              type="date"
              name="date"
              placeholder="Date"
              value={workLog.date}
              onChange={handleInputChange}
              required
            />
            <Input
              icon={PencilLine}
              type="text"
              name="taskDetails"
              placeholder="Task Details"
              value={workLog.taskDetails}
              onChange={handleInputChange}
              required
            />
            <Input
              icon={PencilLine}
              type="text"
              name="progressLevel"
              value={workLog.progressLevel}
              onChange={handleInputChange}
              placeholder="Progress Level"
              required
            />
            <Input
              icon={CalendarClock}
              type="number"
              name="hoursWorked"
              value={workLog.hoursWorked}
              onChange={handleInputChange}
              placeholder="Hours Worked"
              required
              min="1"
              max="7"
            />
            <motion.button
              className="mt-5 flex justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
              font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-emerald-600 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                <>Submit Work Log</>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddWorkLog;
