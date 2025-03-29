import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const { id } = useParams(); 
  const [employee, setEmployee] = useState(null); 

  useEffect(() => {
    axios
      .get(`http://localhost:50100/api/employees/read/${id}`)
      .then((res) => {
        setEmployee(res.data.employee); 
      })
      .catch((err) => {
        console.error("Error fetching employee data:", err);
      });
  }, [id]); 

  if (!employee) {
    return <div>Loading...</div>; 
  }

  // ฟังก์ชันในการเช็คว่า วันที่ใน data ตรงกับวันที่ปัจจุบันมั้ย
  const getTodayWorkLogs = () => {
    const today = new Date();
    const todayString = today.toLocaleDateString("th-TH"); 

    return employee.daywork.filter((work) => {
      const workDate = new Date(work.date);
      const workDateString = workDate.toLocaleDateString("th-TH"); 
      return workDateString === todayString; // เปรียบเทียบวันที่
    });
  };

  const todayWorkLogs = getTodayWorkLogs();

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Profile Information
        </motion.h1>

        <div className="space-y-6">
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Personal Information
            </h3>
            <p className="text-gray-300">ฝ่าย: {employee.department}</p>
            <p className="text-gray-300">ชื่อ: {employee.name}</p>
            <p className="text-gray-300">
              เลขที่ประจำตัวประชาชน: {employee.idcard}
            </p>
            <p className="text-gray-300">อีเมล: {employee.email}</p>
            <p className="text-gray-300">
              เบอร์โทรศัพท์: {employee.phonenumber}
            </p>
            <p className="text-gray-300">
              วันแรกที่เข้าทำงาน:{" "}
              {new Date(employee.startWorkDate).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">
              วันที่ครบสัญญาจ้าง:{" "}
              {new Date(employee.contractEndDate).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>

          {/* แสดงข้อมูลการทำงานประจำวัน */}
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Daily Work Logs (Today)
            </h3>
            {todayWorkLogs.length > 0 ? (
              <div className="space-y-4">
                {todayWorkLogs.map((work, index) => (
                  <div key={index} className="text-gray-300">
                    <p>
                      <strong>วันที่:</strong>{" "}
                      {new Date(work.date).toLocaleDateString("th-TH")}
                    </p>
                    <p>
                      <strong>รายละเอียดงาน:</strong> {work.taskDetails}
                    </p>
                    <p>
                      <strong>ระดับความคืบหน้า:</strong> {work.progressLevel}
                    </p>
                    <p>
                      <strong>ชั่วโมงที่ทำงาน:</strong> {work.hoursWorked}{" "}
                      ชั่วโมง
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-300">ไม่มีข้อมูลการทำงานในวันนี้</p>
            )}
            <div className="flex justify-between items-center mt-6">
              <Link
                to={"/secret-dashboard"}
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 focus:outline-none"
              >
                Back
              </Link>
              <Link
                to={`/editemployee/${employee._id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none"
              >
                Edit
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;