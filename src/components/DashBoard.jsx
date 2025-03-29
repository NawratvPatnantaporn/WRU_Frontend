import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [dayworkCount, setDayworkCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [departmentData, setDepartmentData] = useState({
    labels: [],
    data: [],
  });
  const [activeEmployees, setActiveEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:50100/api/employees", {
        withCredentials: true,
      });
      const employees = response.data;

      setEmployeeCount(employees.length);
      setDayworkCount(
        employees.reduce((acc, emp) => acc + (emp.daywork?.length || 0), 0)
      );

      const departmentCounts = {};
      employees.forEach((emp) => {
        if (emp.department) {
          departmentCounts[emp.department] =
            (departmentCounts[emp.department] || 0) + 1;
        }
      });

      setDepartmentData({
        labels: Object.keys(departmentCounts),
        data: Object.values(departmentCounts),
      });
      setDepartmentCount(Object.keys(departmentCounts).length);

      setActiveEmployees(
        employees.filter(
          (emp) =>
            !emp.lastLogout ||
            new Date(emp.lastLogin) > new Date(emp.lastLogout)
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-full mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
        <div className="bg-gray-600 p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-white">จำนวนพนักงานทั้งหมด</h3>
          <p className="text-3xl">{employeeCount}</p>
        </div>
        <div className="bg-gray-600 p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-white">
            จำนวนการปฏิบัติงานรายวันทั้งหมด
          </h3>
          <p className="text-3xl">{dayworkCount}</p>
        </div>
        <div className="bg-gray-600 p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-white">จำนวนแผนกทั้งหมด</h3>
          <p className="text-3xl">{departmentCount}</p>
        </div>
      </div>

      {/* แบ่งตารางและกราฟออกเป็นสองคอลัมน์ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* ตารางรายชื่อพนักงาน Active */}
        <motion.div
          className="bg-gray-600 p-6 rounded-lg shadow overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-4 text-white">
            พนักงานที่ Active อยู่ในขณะนี้
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left">ชื่อ</th>
                  <th className="px-6 py-3 text-left">แผนก</th>
                  <th className="px-6 py-3 text-left">เลขบัตรประชาชน</th>
                  <th className="px-6 py-3 text-left">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {activeEmployees.map((emp) => (
                  <tr key={emp._id} className="border-t border-gray-700">
                    <td className="px-6 py-3">{emp.name}</td>
                    <td className="px-6 py-3">{emp.department}</td>
                    <td className="px-6 py-3">{emp.idcard}</td>
                    <td className="px-6 py-3">
                      {/* ปรับแต่งปุ่มสถานะ Active */}
                      <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* กราฟแสดงแผนก */}
        <motion.div
          className="bg-gray-600 p-6 rounded-lg shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-4 text-white">
            กราฟแผนก : จำนวนพนักงาน
          </h3>
          <div className="w-full h-64">
            <Pie
              data={{
                labels: departmentData.labels,
                datasets: [
                  {
                    data: departmentData.data,
                    backgroundColor: [
                      "#5DADE2", // Blue
                      "#48C9B0", // Teal
                      "#F4D03F", // Yellow
                      "#E74C3C", // Red
                      "#AF7AC5", // Purple
                      "#F39C12", // Orange
                    ],
                    borderColor: "#ffffff", // ขอบสีขาวให้ดูสะอาดตา
                    borderWidth: 2, // ความกว้างของขอบ
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      color: "#ffffff", // สีฟอนต์ของแผนก (สีเทาเข้ม)
                      font: {
                        size: 14, // ขนาดฟอนต์
                        family: "'Helvetica', 'Arial', sans-serif", // ฟอนต์ที่ดูมืออาชีพ
                        weight: "bold", // ทำให้หนาขึ้นเล็กน้อย
                      },
                    },
                  },
                  tooltip: {
                    backgroundColor: "rgba(0,0,0,0.8)", // พื้นหลังสีดำโปร่งแสงสำหรับ tooltip
                    titleColor: "#ffffff", // สีฟอนต์ใน tooltip
                    bodyColor: "#ffffff", // สีข้อความใน tooltip
                    borderWidth: 1,
                    borderColor: "#e0e0e0",
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
