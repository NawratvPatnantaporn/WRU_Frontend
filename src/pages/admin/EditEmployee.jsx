import axios from "axios";
import { motion } from "framer-motion";
import {  useEffect, useState } from "react";
import Input from "../../components/Input";
import { useAuthStore } from "../../store/authStore";
import { Pencil, Loader, Mail, User, Computer, IdCard, Phone} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const departments = ["HR", "IT", "FINANCE", "DESIGN", "MARKETING", "SALES", "SERVICE"];

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newEmployee, setNewEmployee] = useState({
    email: "",
    name: "",
    department: "",
    idcard: "",
    phonenumber: "",
  });
  const [currentEmployee, setCurrentEmployee] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:50100/api/employees/read/${id}`)
      .then((res) => {
        setNewEmployee(res.data.employee);
        setCurrentEmployee(res.data.employee);
      })
      .catch((err) => {
        console.error("Error fetching employee data:", err);
      });
  }, [id]); 


  const { isLoading } = useAuthStore;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ตรวจหาข้อมูลที่เปลี่ยนแปลง
      const changedFields = Object.keys(newEmployee).filter(
        (key) => newEmployee[key] !== currentEmployee[key]
      );

      if (changedFields.length === 0) {
        Swal.fire({
          title: "ไม่มีการเปลี่ยนแปลง",
          text: "กรุณาแก้ไขข้อมูลก่อนบันทึก",
          icon: "info",
          confirmButtonText: "ตกลง",
        });
        return;
      }

      // แสดงข้อความยืนยันพร้อมข้อมูลที่เปลี่ยน
      const changeDetails = changedFields
        .map(
          (field) =>
            `${field}: "${currentEmployee[field]}" → "${newEmployee[field]}"`
        )
        .join("\n");

      const result = await Swal.fire({
        title: "ยืนยันการอัปเดต?",
        html: `<p>คุณกำลังจะอัปเดตข้อมูลต่อไปนี้:</p><pre style="text-align:left; background-color: #f8f9fa; padding:10px; border-radius:5px;">${changeDetails}</pre><p>คุณต้องการบันทึกข้อมูลหรือไม่?</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่, บันทึกเลย!",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        // ส่งข้อมูลไปที่ API PUT
        await axios.put(
          `http://localhost:50100/api/employees/${id}`,
          newEmployee,
          { withCredentials: true }
        );

        // แสดงข้อความสำเร็จด้วย Swal
        Swal.fire({
          title: "สำเร็จ!",
          html: `<p>อัปเดตข้อมูลพนักงานสำเร็จ:</p><pre style="text-align:left; background-color: #f8f9fa; padding:10px; border-radius:5px;">${changeDetails}</pre>`,
          icon: "success",
          confirmButtonText: "ตกลง",
        });

        // นำทางกลับไปยังหน้า dashboard
        navigate("/secret-dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // แสดงข้อความข้อผิดพลาดที่ได้รับจาก backend
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      } else {
        console.error("Error updating employee data:", error);
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถอัปเดตข้อมูลพนักงานได้",
          icon: "error",
          confirmButtonText: "ลองอีกครั้ง",
        });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Edit Information
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
            <form onSubmit={handleSubmit}>
              <div>
                <Input
                  icon={Mail}
                  type="mail"
                  placeholder="Email Address"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                />
                <Input
                  icon={User}
                  type="text"
                  placeholder="Full Name"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, name: e.target.value })
                  }
                />
                <div className="relative mb-4">
                  <Computer
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500"
                    size={20}
                  />
                  <select
                    id="department"
                    name="department"
                    value={newEmployee.department}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        department: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200 appearance-none"
                    required
                  >
                    <option value="">Select a department</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  icon={IdCard}
                  type="text"
                  placeholder="ID Card"
                  value={newEmployee.idcard}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, idcard: e.target.value })
                  }
                />
                <Input
                  icon={Phone}
                  type="text"
                  placeholder="Phone Number"
                  value={newEmployee.phonenumber}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      phonenumber: e.target.value,
                    })
                  }
                />
              </div>

              <motion.button
                className="mt-5 flex justify-center w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className=" animate-spin mx-auto" size={24} />
                ) : (
                  <>
                    <Pencil /> Edit
                  </>
                )}
              </motion.button>
            </form>

            {/* ปุ่มยกเลิก / กลับ */}
            <motion.button
              onClick={() => navigate("/secret-dashboard")}
              className="mt-5 w-full py-3 px-4 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ยกเลิก / กลับ
            </motion.button>
          </motion.div>

          {/* แสดงข้อมูลการทำงานประจำวัน */}
          {/* <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Daily Work Logs (Today)
            </h3>
            {todayWorkLogs.length > 0 ? (
              <div className="space-y-4">
                {todayWorkLogs.map((work, index) => (
                  <div key={index} className="text-gray-300">
                    <div>
                      <label className="text-gray-300">Date</label>
                      <Input type="text" placeholder="Enter Date" />
                    </div>
                    <div>
                      <label className="text-gray-300">TaskDetails</label>
                      <Input type="text" placeholder="Enter Details" />
                    </div>
                    <div>
                      <label className="text-gray-300">ProgressLevel</label>
                      <Input type="text" placeholder="Enter Level" />
                    </div>
                    <div>
                      <label className="text-gray-300">HoursWorked</label>
                      <Input type="text" placeholder="Enter Hours" />
                    </div>
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
            </div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
  
};

export default EditEmployee;
