import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MarketingPage = () => {
  const navigate = useNavigate();

  const jobPositions = [
    {
      title: "Marketing Manager",
      description:
        "รับผิดชอบในการวางแผนกลยุทธ์การตลาด, การสร้างแบรนด์ และการบริหารการสื่อสารกับลูกค้า",
      qualifications: [
        "ปริญญาตรีด้านการตลาดหรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในตำแหน่งผู้จัดการการตลาดอย่างน้อย 5 ปี",
        "ทักษะการสื่อสารและการเจรจาต่อรองที่ดี",
      ],
      location: "กรุงเทพมหานคร, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Content Marketing Specialist",
      description:
        "สร้างและจัดการเนื้อหาการตลาด, พัฒนาแคมเปญออนไลน์ และเพิ่มการเข้าถึงลูกค้าผ่านช่องทางดิจิทัล",
      qualifications: [
        "ปริญญาตรีด้านการตลาด, นิเทศศาสตร์ หรือสาขาที่เกี่ยวข้อง",
        "ทักษะในการเขียนเนื้อหาสำหรับออนไลน์และการวิเคราะห์ข้อมูล",
        "มีประสบการณ์ในการสร้างแคมเปญการตลาดดิจิทัล",
      ],
      location: "เชียงใหม่, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Social Media Manager",
      description:
        "บริหารช่องทางโซเชียลมีเดีย, สร้างและวิเคราะห์แคมเปญโฆษณาเพื่อเพิ่มการมีส่วนร่วมจากผู้ติดตาม",
      qualifications: [
        "ปริญญาตรีด้านการตลาด, นิเทศศาสตร์ หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในการบริหารโซเชียลมีเดียและการวิเคราะห์ข้อมูล",
        "ทักษะในการใช้เครื่องมือเช่น Facebook Ads, Instagram, และ Google Analytics",
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
        ตำแหน่งงานเปิดรับฝ่ายการตลาด (Marketing)
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
                className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-indigo-700
				        focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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

export default MarketingPage;