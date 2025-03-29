import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SalesPage = () => {
  const navigate = useNavigate();

  const jobPositions = [
    {
      title: "Sales Manager",
      description:
        "รับผิดชอบในการวางแผนกลยุทธ์การขาย, การจัดการทีมขาย และการสร้างความสัมพันธ์กับลูกค้า",
      qualifications: [
        "ปริญญาตรีด้านการขาย, การตลาด หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในตำแหน่งผู้จัดการการขายอย่างน้อย 5 ปี",
        "ทักษะการสื่อสารและการเจรจาต่อรองที่ดี",
      ],
      location: "กรุงเทพมหานคร, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Sales Executive",
      description:
        "ดูแลลูกค้าปัจจุบัน, ค้นหาลูกค้าใหม่ และดำเนินการขายสินค้าหรือบริการตามเป้าหมายที่กำหนด",
      qualifications: [
        "ปริญญาตรีด้านการขาย, การตลาด หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในการขายสินค้า/บริการอย่างน้อย 2 ปี",
        "ทักษะการเจรจาต่อรองและการสร้างความสัมพันธ์ที่ดี",
      ],
      location: "เชียงใหม่, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Sales Support Specialist",
      description:
        "สนับสนุนทีมขายในการจัดการเอกสาร, การเตรียมการขาย และการติดตามสถานะคำสั่งซื้อ",
      qualifications: [
        "ปริญญาตรีด้านการขาย, การตลาด หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์ในการสนับสนุนทีมขายหรือบริการลูกค้า",
        "ทักษะการจัดการเอกสารและการติดตามงานได้ดี",
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
        ตำแหน่งงานเปิดรับฝ่ายขาย (Sales)
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
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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

export default SalesPage;