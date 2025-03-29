import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DesignPage = () => {
  const navigate = useNavigate();

  const jobPositions = [
    {
      title: "Graphic Designer",
      description:
        "รับผิดชอบในการออกแบบกราฟิกสำหรับโฆษณา, สื่อการตลาด, และเว็บไซต์ เพื่อเสริมสร้างภาพลักษณ์ของแบรนด์",
      qualifications: [
        "ปริญญาตรีด้านการออกแบบกราฟิก, ศิลปะการออกแบบ หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในการออกแบบกราฟิกอย่างน้อย 3 ปี",
        "ทักษะการใช้โปรแกรม Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      ],
      location: "กรุงเทพมหานคร, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "UI/UX Designer",
      description:
        "ออกแบบประสบการณ์ผู้ใช้ (UX) และอินเตอร์เฟซผู้ใช้ (UI) ให้กับเว็บไซต์และแอปพลิเคชันเพื่อให้เหมาะสมกับความต้องการของผู้ใช้",
      qualifications: [
        "ปริญญาตรีด้านการออกแบบประสบการณ์ผู้ใช้ (UX), การออกแบบอินเตอร์เฟซ (UI) หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในการออกแบบ UI/UX อย่างน้อย 2 ปี",
        "ทักษะในการใช้เครื่องมือออกแบบ เช่น Figma, Sketch, Adobe XD",
      ],
      location: "เชียงใหม่, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Motion Graphic Designer",
      description:
        "ออกแบบแอนิเมชั่น, วิดีโอ, และกราฟิกเคลื่อนไหวเพื่อสร้างสื่อที่น่าสนใจและเสริมการสื่อสารของแบรนด์",
      qualifications: [
        "ปริญญาตรีด้านการออกแบบกราฟิก, การผลิตสื่อ หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในการออกแบบ Motion Graphic หรือแอนิเมชั่น",
        "ทักษะในการใช้โปรแกรม After Effects, Premiere Pro หรือเครื่องมืออื่น ๆ ที่เกี่ยวข้อง",
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
        ตำแหน่งงานเปิดรับฝ่ายออกแบบ (Design)
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
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-red-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-red-700
				focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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

export default DesignPage;