import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ServicePage = () => {
  const navigate = useNavigate();

  const jobPositions = [
    {
      title: "Service Manager",
      description:
        "รับผิดชอบในการวางแผนกลยุทธ์การบริการ, การจัดการทีมบริการลูกค้า และการพัฒนาคุณภาพบริการ",
      qualifications: [
        "ปริญญาตรีด้านการบริการ, การจัดการธุรกิจ หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในตำแหน่งผู้จัดการบริการลูกค้าหรือบริการอย่างน้อย 5 ปี",
        "ทักษะการสื่อสารและการแก้ปัญหาที่ดี",
      ],
      location: "กรุงเทพมหานคร, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Customer Service Representative",
      description:
        "ให้บริการลูกค้าโดยการตอบคำถาม, แก้ไขปัญหาที่เกิดขึ้น และให้ข้อมูลสินค้า/บริการ",
      qualifications: [
        "ปริญญาตรีด้านการบริการลูกค้า, การตลาด หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในการให้บริการลูกค้าหรือการแก้ไขปัญหาลูกค้า",
        "ทักษะในการสื่อสารและการใช้เทคโนโลยีในการให้บริการลูกค้า",
      ],
      location: "เชียงใหม่, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Technical Support Specialist",
      description:
        "ให้การสนับสนุนทางเทคนิคแก่ลูกค้าในการใช้ผลิตภัณฑ์และบริการต่าง ๆ",
      qualifications: [
        "ปริญญาตรีด้านเทคโนโลยีสารสนเทศ, วิศวกรรมคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในการให้บริการทางเทคนิคหรือสนับสนุนลูกค้า",
        "ทักษะในการแก้ไขปัญหาทางเทคนิคและการใช้ซอฟต์แวร์ที่เกี่ยวข้อง",
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
        ตำแหน่งงานเปิดรับฝ่ายบริการ (Service)
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
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700
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

export default ServicePage;