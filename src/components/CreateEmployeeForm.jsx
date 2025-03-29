import { useState } from "react"
import { motion } from "framer-motion"
import Input from "../components/Input";
import { PlusCircle, Loader, Mail, User, Computer, IdCard, Phone, KeyRound } from "lucide-react"
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";


const departments = ["HR", "IT", "FINANCE", "DESIGN", "MARKETING", "SALES", "SERVICE"];

const CreateEmployeeForm = () => {
    const [newEmployee, setNewEmployee] = useState({
        email: "",
        name: "",
        department:"",
        idcard: "",
        phonenumber: "",
        password: "",
    });

    const { isLoading } = useAuthStore

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        // Send a POST request to create a new employee
        const response = await axios.post(
          "http://localhost:50100/api/employees/create",
          newEmployee,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // Show success alert with the backend response
        Swal.fire({
          title: "Success!",
          text:
            response.data.message ||
            `Employee ${response.data.name} created successfully!`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });

        // Reset form after successful creation
        setNewEmployee({
          email: "",
          name: "",
          department: "",
          idcard: "",
          phonenumber: "",
          password: "",
        });
      } catch (error) {
        // Handle errors and show the backend error message
        const errorMessage =
          error.response?.data?.message || "Error creating employee";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#d33",
        });

        console.error("Error creating employee:", error);
      }
    };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-300">
        Create New Employee
      </h2>
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
                setNewEmployee({ ...newEmployee, department: e.target.value })
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
              setNewEmployee({ ...newEmployee, phonenumber: e.target.value })
            }
          />
          <Input
            icon={KeyRound}
            type="password"
            placeholder="Password"
            value={newEmployee.password}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, password: e.target.value })
            }
          />
        </div>

        <motion.button
          className="mt-5 flex justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600
					hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
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
              <PlusCircle /> Create Employee
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default CreateEmployeeForm