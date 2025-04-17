import { motion } from "framer-motion"
import { Trash, Pencil, BookUser } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchEmployees} from "../store/useEmployeeStore";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // ฟังก์ชันสำหรับดึงข้อมูลพนักงาน
  const getEmployees = async () => {
    try {
      const data = await fetchEmployees();
      console.log(data);
      setEmployees(data); // เก็บข้อมูลใน state
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false); // ปิดสถานะการโหลด
    }
  };

  // ฟังก์ชันสำหรับข้อมูลลบพนักงาน 
  const deleteEmployee = async (id) => {
    try {
      // ใช้ SweetAlert2 เพื่อถามยืนยันการลบ
      const result = await Swal.fire({
        title: "ยืนยันการลบ?",
        text: "คุณต้องการลบพนักงานนี้ใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      // หากผู้ใช้คลิก "ยืนยัน"
      if (result.isConfirmed) {
        console.log("Deleting employee with ID:", id);

        // เรียก API DELETE เพื่อลบพนักงาน
        await axios.delete(`${import.meta.env.VITE_API_EMPLOYEES_URL}/${id}`, {
          withCredentials: true,
        });

        // อัปเดต state หลังจากลบสำเร็จ
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));

        // แจ้งเตือนสำเร็จด้วย SweetAlert2
        Swal.fire({
          title: "ลบสำเร็จ!",
          text: "พนักงานถูกลบเรียบร้อยแล้ว.",
          icon: "success",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Error deleting employee:", error);

      // แจ้งเตือนข้อผิดพลาดด้วย SweetAlert2
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถลบพนักงานได้ กรุณาลองใหม่อีกครั้ง.",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(lowercasedQuery) ||
      employee.department.toLowerCase().includes(lowercasedQuery) ||
      employee.email.toLowerCase().includes(lowercasedQuery)
    );
  });

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ดึงข้อมูลเมื่อ component ถูก mount
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-xl shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {loading ? (
        <p className="text-center text-gray-300 py-4">Loading employees...</p>
      ) : (
          <table className="min-w-full divide-y divide-gray-300 text-sm text-gray-800">
            <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                  className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider"
              >
                Department
              </th>
              <th
                scope="col"
                  className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                  className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                  className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider"
              >
                ID Card
              </th>
              <th
                scope="col"
                  className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

            <tbody className="bg-white bg-opacity-50 backdrop-blur-xl divide-y divide-gray-200 text-gray-600">
            {currentEmployees.map((employee) => (
              <tr key={employee._id} className="hover:bg-slate-100">
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700">
                    {employee.department}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{employee.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{employee.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{employee.idcard}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        console.log("Employee ID:", employee._id); 
                        deleteEmployee(employee._id);
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                    <Link
                      to={`/editemployee/${employee._id}`}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <Pencil className="h-5 w-5" />
                    </Link>
                    <Link
                      to={`/read/${employee._id}`}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <BookUser className="h-5 w-5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && currentEmployees.length === 0 && (
        <p className="text-center text-gray-600 py-4">ไม่พบข้อมูลพนักงาน</p>
      )}

      {/* Pagination and Search Box */}
      <div className="flex items-center justify-between mt-4">
        {/* Pagination */}
        <div className="flex justify-start space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700"
          >
            Prev
          </button>
          <span className="px-4 py-2 text-gray-600">
            Page {currentPage} of {Math.ceil(filteredEmployees.length / itemsPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredEmployees.length / itemsPerPage)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700"
          >
            Next
          </button>
        </div>

        {/* Search Box */}
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="ค้นหาพนักงาน..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md w-full max-w-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default EmployeeList