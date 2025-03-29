import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const ConfirmWorkLog = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ดึงข้อมูลผู้ใช้ที่มี pendingWorkLogs
  useEffect(() => {
    const fetchUsersWithPendingLogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:50100/api/worklog/PendingWorkLogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Error fetching users with pending logs"
        );
        setLoading(false);
      }
    };

    fetchUsersWithPendingLogs();
  }, []);

  // ฟังก์ชันอนุมัติ work log
  const handleApprove = async (userId, workLogId, workLog) => {
    const result = await Swal.fire({
      title: "Please confirm",
      text: "Do you want to approve this work log?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
        setLoading(true);
        const response = await axios.post(
          `http://localhost:50100/api/worklog/approveWorkLog/${userId}/${workLogId}`,
          {}, // หากต้องการส่งข้อมูลใด ๆ สามารถเพิ่มที่นี่
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // แจ้งเตือนสำเร็จ
        Swal.fire(
          "Approved!",
          response.data.message || "Work log approved successfully!",
          "success"
        );

        // อัปเดต state
        setUsers((prevUsers) =>
          prevUsers
            .map((user) =>
              user._id === userId
                ? {
                    ...user,
                    pendingWorkLogs: user.pendingWorkLogs.filter(
                      (log) => log._id !== workLogId
                    ),
                  }
                : user
            )
            .filter((user) => user.pendingWorkLogs.length > 0)
        );
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error approving work log");

        // แจ้งเตือนข้อผิดพลาด
        Swal.fire(
          "Error!",
          err.response?.data?.message || "Error approving work log",
          "error"
        );
        setLoading(false);
      }
    }
  };

  // ฟังก์ชันปฏิเสธ work log
  const handleReject = async (userId, workLogId, workLog) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this work log?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
        setLoading(true);
        const response = await axios.post(
          `http://localhost:50100/api/worklog/rejectWorkLog/${userId}/${workLogId}`,
          {}, // หากต้องการส่งข้อมูลใด ๆ สามารถเพิ่มที่นี่
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // แจ้งเตือนสำเร็จ
        Swal.fire(
          "Rejected!",
          response.data.message || "Work log rejected successfully!",
          "success"
        );

        // อัปเดต state
        setUsers((prevUsers) =>
          prevUsers
            .map((user) =>
              user._id === userId
                ? {
                    ...user,
                    pendingWorkLogs: user.pendingWorkLogs.filter(
                      (log) => log._id !== workLogId
                    ),
                  }
                : user
            )
            .filter((user) => user.pendingWorkLogs.length > 0)
        );
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error rejecting work log");

        // แจ้งเตือนข้อผิดพลาด
        Swal.fire(
          "Error!",
          err.response?.data?.message || "Error rejecting work log",
          "error"
        );
        setLoading(false);
      }
    }
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <motion.div
      className="bg-gray-900 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        Approve Work Logs
      </h1>
      <div className="overflow-y-auto max-h-96 ">
        {users.length === 0 ? (
          <p className="text-white text-center text-xl">
            No pending work logs found
          </p>
        ) : (
          <ul className="space-y-6">
            {users.map((user) => (
              <li
                key={user._id}
                className="p-4 border rounded-lg shadow-md bg-gray-800"
              >
                <h3 className="text-xl font-semibold text-white">
                  {user.name}
                </h3>
                <p className="text-white">{user.email}</p>
                <h4 className="mt-4 text-lg font-semibold text-blue-400">
                  Pending Work Logs:
                </h4>
                {user.pendingWorkLogs.length === 0 ? (
                  <p className="text-white">No pending work logs</p>
                ) : (
                  <ul className="mt-2 space-y-4">
                    {user.pendingWorkLogs.map((log, index) => (
                      <li
                        key={index}
                        className="border p-4 rounded-lg shadow-sm bg-gray-800"
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
                          onClick={() => handleApprove(user._id, log._id, log)}
                          className="mt-4 mr-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user._id, log._id, log)}
                          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default ConfirmWorkLog;