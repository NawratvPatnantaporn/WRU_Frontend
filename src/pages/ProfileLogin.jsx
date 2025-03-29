import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  // ดึงวันที่ปัจจุบันในรูปแบบ yyyy-mm-dd
  const today = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // กรองข้อมูลการทำงานเพื่อแสดงเฉพาะข้อมูลของวันนี้
  const todayWorkLogs = user.daywork.filter((work) => {
    const workDate = new Date(work.date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return workDate === today;
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r text-white text-transparent bg-clip-text">
        My Profile
      </h2>

      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">แผนกที่สังกัด : {user.department}</p>
          <p className="text-gray-300">ชื่อ : {user.name}</p>
          <p className="text-gray-300">เลขที่ประจำตัวประชาชน : {user.idcard}</p>
          <p className="text-gray-300">อีเมล : {user.email}</p>
          <p className="text-gray-300">เบอร์โทรศัพท์ : {user.phonenumber}</p>
          <p className="text-gray-300">
            วันแรกที่เข้าทำงาน :{" "}
            {new Date(user.startWorkDate).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            วันที่ครบสัญญาจ้าง :{" "}
            {new Date(user.contractEndDate).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            อายุการทำงานรวม : {user.totalWorkDuration}
          </p>
          <p className="text-gray-300">
            จะหมดสัญญาใน : {user.remainingContractDuration}
          </p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            Today's Work Logs
          </h3>
          {todayWorkLogs.length > 0 ? (
            <div className="space-y-4">
              {todayWorkLogs.map((work, index) => (
                <div key={index} className="text-gray-300">
                  <p>
                    <strong>วันที่ :</strong>{" "}
                    {new Date(work.date).toLocaleDateString("th-TH")}
                  </p>
                  <p>
                    <strong>รายละเอียดงาน :</strong> {work.taskDetails}
                  </p>
                  <p>
                    <strong>ระดับความคืบหน้า :</strong> {work.progressLevel}
                  </p>
                  <p>
                    <strong>ชั่วโมงที่ทำงาน :</strong> {work.hoursWorked} ชั่วโมง
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">ยังไม่มีข้อมูลการทำงานสำหรับวันนี้</p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;