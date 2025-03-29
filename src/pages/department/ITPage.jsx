import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ITPage = () => {
  const navigate = useNavigate();

  const jobPositions = [
    {
      title: "Software Developer",
      description:
        "พัฒนาและดูแลซอฟต์แวร์สำหรับระบบต่าง ๆ โดยใช้ภาษาโปรแกรมที่ทันสมัย เช่น JavaScript, Python หรือ Java",
      qualifications: [
        "ปริญญาตรีด้านวิทยาการคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในภาษาโปรแกรม เช่น JavaScript, Python หรือ Java",
        "ทักษะการออกแบบระบบและการแก้ไขปัญหาที่ดี",
      ],
      location: "กรุงเทพมหานคร, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "System Administrator",
      description:
        "ดูแลระบบเครือข่าย เซิร์ฟเวอร์ และระบบคลาวด์ให้ทำงานได้อย่างเสถียร",
      qualifications: [
        "ปริญญาตรีด้านเทคโนโลยีสารสนเทศหรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์การดูแลเซิร์ฟเวอร์ Windows/Linux",
        "ทักษะในด้านเครือข่ายและระบบความปลอดภัย",
      ],
      location: "เชียงใหม่, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Data Analyst",
      description:
        "วิเคราะห์ข้อมูลเชิงลึกเพื่อสนับสนุนการตัดสินใจในเชิงกลยุทธ์",
      qualifications: [
        "ปริญญาตรีด้านสถิติ วิทยาศาสตร์ข้อมูล หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในการใช้เครื่องมือ เช่น Power BI, Tableau หรือ Excel",
        "ความสามารถในการเขียน SQL เพื่อจัดการและวิเคราะห์ข้อมูล",
      ],
      location: "กรุงเทพมหานคร, ประเทศไทย",
      applyLink: "#",
    },
  ];

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h1 className="text-white text-3xl font-bold text-center mb-8">
        ตำแหน่งงานเปิดรับฝ่ายเทคโนโลยีสารสนเทศ (IT)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobPositions.map((position, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold">{position.title}</h2>
            <p className="text-gray-700 mt-2">{position.description}</p>
            <h3 className="font-semibold mt-4">คุณสมบัติที่ต้องการ</h3>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {position.qualifications.map((qualification, i) => (
                <li key={i}>{qualification}</li>
              ))}
            </ul>
            <p className="mt-4 mb-4 text-gray-600">
              สถานที่ทำงาน: {position.location}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignup}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700
				        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                สมัครงาน
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ITPage;
