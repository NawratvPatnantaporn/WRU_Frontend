import { BarChart, User, UserPlus, CalendarCheck, Clock } from "lucide-react";
import { useState } from "react"
import { motion } from "framer-motion"
import CreateEmployeeForm from "../../components/CreateEmployeeForm"
import EmployeeList from "../../components/EmployeeList"
import AnalyticsTab from "../../components/DashBoard"
import ConfirmWorkLog from "../../components/ConfirmWorkLog";
import Attendance from "../../components/Attendance";

const tabs = [
  { id: "create", label: "Create", icon: UserPlus },
  { id: "employees", label: "Employees", icon: User },
  { id: "dashboard", label: "DashBoard", icon: BarChart },
  { id: "confirmworklog", label: "Confirm WorkLog", icon: CalendarCheck },
  { id: "attendance", label: "Attendance", icon: Clock },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create")
  return (
    <div className="flex flex-col justify-center  sm:px-6 lg:px-8">
      <div className="relative z-10 container mx-auto px-4 ">
        <motion.h1
          className="text-4xl font-bold mb-8 text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "create" && <CreateEmployeeForm />}
        {activeTab === "employees" && <EmployeeList />}
        {activeTab === "dashboard" && <AnalyticsTab />}
        {activeTab === "confirmworklog" && <ConfirmWorkLog />}
        {activeTab === "attendance" && <Attendance />}
      </div>
    </div>
  );
}

export default AdminPage