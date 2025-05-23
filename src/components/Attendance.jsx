import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_EMPLOYEES_URL ,
          { withCredentials: true }
        );
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลพนักงานได้");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleSearch = (event) => {
    const date = event.target.value;
    setSearchDate(date);

    if (date) {
      const filtered = employees.filter((employee) => {
        const loginDate = employee.lastLogin
          ? new Date(employee.lastLogin).setHours(0, 0, 0, 0)
          : null;
        const logoutDate = employee.lastLogout
          ? new Date(employee.lastLogout).setHours(0, 0, 0, 0)
          : null;

        return (
          loginDate === new Date(date).setHours(0, 0, 0, 0) ||
          logoutDate === new Date(date).setHours(0, 0, 0, 0)
        );
      });
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  };

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-xl shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto my-6 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* ค้นหาตามวันที่ */}
      <div className="flex justify-center mb-6">
        <input
          type="date"
          value={searchDate}
          onChange={handleSearch}
          className="px-4 py-2 bg-gray-600 text-gray-300 rounded-md w-full max-w-xs focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* แสดงข้อมูลพนักงาน */}
      {isLoading ? (
        <p className="text-center text-gray-300 py-4">กำลังโหลดข้อมูล...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="overflow-y-auto max-h-96 ">
                <table className="min-w-full divide-y divide-gray-300 text-sm text-gray-800">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    ลำดับ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    ชื่อ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    แผนก
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    เวลาเข้า
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    เวลาออก
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    สถานะ
                  </th>
                </tr>
              </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee, index) => (
                    <tr key={employee._id} className="hover:bg-slate-100">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {employee.lastLogin
                          ? new Date(employee.lastLogin).toLocaleString()
                          : "ไม่มีข้อมูล"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {employee.lastLogout
                          ? new Date(employee.lastLogout).toLocaleString()
                          : "ไม่มีข้อมูล"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`font-bold ${
                            employee.lastLogin &&
                            (!employee.lastLogout ||
                              new Date(employee.lastLogin) >
                                new Date(employee.lastLogout))
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {employee.lastLogin &&
                          (!employee.lastLogout ||
                            new Date(employee.lastLogin) >
                              new Date(employee.lastLogout))
                            ? "inActive"
                            : "Logged Out"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-700 py-4">
                      ไม่พบข้อมูลสำหรับวันที่นี้
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Attendance;
