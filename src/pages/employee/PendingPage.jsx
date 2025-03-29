import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const PendingPage = () => {
  const [pendingLogs, setPendingLogs] = useState([]);

  // ดึงข้อมูลผู้ใช้ที่มี pendingWorkLogs
  useEffect(() => {
    const fetchUserPendingLogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:50100/api/worklog/userPendingWorkLogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // ตั้งค่า pendingLogs หรืออาจเป็น [] หากไม่มีข้อมูล
        setPendingLogs(response.data.pendingWorkLogs || []);
      } catch (err) {
        console.error("Error fetching pending logs:", err.response);
        setPendingLogs([]); // ตั้งค่า pendingLogs เป็นอาร์เรย์ว่าง
      }
    };

    fetchUserPendingLogs();
  }, []);

  const handleCancel = async (workLogId, workLog) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel the following work log?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      html: `
        <strong>Date:</strong> ${new Date(
          workLog.date
        ).toLocaleDateString()} <br />
        <strong>Task Details:</strong> ${workLog.taskDetails} <br />
        <strong>Progress Level:</strong> ${workLog.progressLevel} <br />
        <strong>Hours Worked:</strong> ${workLog.hoursWorked} hours
      `,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:50100/api/worklog/CancelAddWork/${workLogId}`,
          {}, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Success",
          text:
            response.data.message ||
            "Work log has been cancelled successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        // รีเฟรชข้อมูล work logs โดยลบ work log ที่ถูกยกเลิก
        setPendingLogs(pendingLogs.filter((log) => log._id !== workLogId));
      } catch (err) {
        console.error("Error cancelling work logs:", err.response);
        Swal.fire({
          title: "Error",
          text: err.response?.data?.message || "Error cancelling work logs",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <motion.div
      className="bg-gray-900 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        WorkLog Awaiting Confirmation
      </h1>
      <div className="overflow-y-auto max-h-96 ">
        {pendingLogs.length === 0 ? (
          <p className="text-white text-center text-xl">
            No pending work logs found
          </p>
        ) : (
          <ul className="space-y-6">
            {pendingLogs.map((log) => (
              <li
                key={log._id}
                className="p-4 border rounded-lg shadow-md bg-gray-800"
              >
                <p className="text-sm text-white">
                  Date: {new Date(log.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-white">
                  Task Details: {log.taskDetails}
                </p>
                <p className="text-sm text-white">
                  Progress Level: {log.progressLevel}
                </p>
                <p className="text-sm text-white">
                  Hours Worked: {log.hoursWorked}
                </p>
                <button
                  onClick={() => handleCancel(log._id, log)}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default PendingPage;