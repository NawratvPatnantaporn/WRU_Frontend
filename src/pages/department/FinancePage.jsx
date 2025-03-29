import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FinancePage = () => {
  const navigate = useNavigate();

  const jobPositions = [
    {
      title: "Financial Analyst",
      description:
        "วิเคราะห์ข้อมูลทางการเงินและแนวโน้มตลาดเพื่อช่วยการตัดสินใจเชิงกลยุทธ์สำหรับองค์กร",
      qualifications: [
        "ปริญญาตรีด้านการเงิน เศรษฐศาสตร์ หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์วิเคราะห์ข้อมูลทางการเงินอย่างน้อย 2 ปี",
        "มีความสามารถในการใช้ Excel, Power BI หรือซอฟต์แวร์วิเคราะห์อื่น ๆ",
      ],
      location: "กรุงเทพมหานคร, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Accounting Manager",
      description:
        "บริหารจัดการและตรวจสอบบัญชีเพื่อให้สอดคล้องกับนโยบายทางการเงินและกฎหมาย",
      qualifications: [
        "ปริญญาตรีหรือโทด้านบัญชี หรือสาขาที่เกี่ยวข้อง",
        "มีประสบการณ์การทำงานในตำแหน่งผู้จัดการบัญชีอย่างน้อย 5 ปี",
        "ความสามารถในการใช้โปรแกรมบัญชี เช่น SAP หรือ QuickBooks",
      ],
      location: "เชียงใหม่, ประเทศไทย",
      applyLink: "#",
    },
    {
      title: "Investment Manager",
      description:
        "บริหารจัดการพอร์ตการลงทุนและวางกลยุทธ์เพื่อสร้างผลตอบแทนที่ยั่งยืน",
      qualifications: [
        "ปริญญาตรีด้านการเงิน การลงทุน หรือ MBA",
        "มีใบอนุญาต CFA หรือใบประกาศนียบัตรที่เกี่ยวข้อง",
        "ประสบการณ์ในด้านการลงทุนอย่างน้อย 3 ปี",
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
        ตำแหน่งงานเปิดรับฝ่ายการเงิน (Finance)
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
                className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-700
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

export default FinancePage;