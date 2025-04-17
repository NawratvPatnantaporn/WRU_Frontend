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
      const response = await axios.get(import.meta.env.VITE_API_EMPLOYEES_URL , {
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
      className="bg-white bg-opacity-50 backdrop-blur-xl shadow-lg rounded-lg overflow-hidden max-w-full mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">จำนวนพนักงานทั้งหมด</h3>
          <p className="text-3xl font-semibold">{employeeCount}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">จำนวนการปฏิบัติงานรายวันทั้งหมด</h3>
          <p className="text-3xl font-semibold">{dayworkCount}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">จำนวนแผนกทั้งหมด</h3>
          <p className="text-3xl font-semibold">{departmentCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          className="bg-white p-6 rounded-lg shadow overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            พนักงานที่ Active อยู่ในขณะนี้
          </h3>
          <table className="min-w-full text-gray-700 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">ชื่อ</th>
                <th className="px-6 py-3 text-left">แผนก</th>
                <th className="px-6 py-3 text-left">เลขบัตรประชาชน</th>
                <th className="px-6 py-3 text-left">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {activeEmployees.map((emp, i) => (
                <tr
                  key={emp._id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-3">{emp.name}</td>
                  <td className="px-6 py-3">{emp.department}</td>
                  <td className="px-6 py-3">{emp.idcard}</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-white bg-green-600 rounded-full shadow hover:bg-green-700 transition">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-4 text-gray-800">
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
                      "#5DADE2",
                      "#48C9B0",
                      "#F4D03F",
                      "#E74C3C",
                      "#AF7AC5",
                      "#F39C12",
                    ],
                    borderColor: "#ffffff",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      color: "#333333",
                      font: {
                        size: 14,
                        family: "'Helvetica', 'Arial', sans-serif",
                        weight: "bold",
                      },
                    },
                  },
                  tooltip: {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
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
