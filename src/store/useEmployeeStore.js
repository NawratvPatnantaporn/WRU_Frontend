import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_EMPLOYEES_URL;

// ฟังก์ชันดึงข้อมูลพนักงาน
export const fetchEmployees = async () => {
  try {
    console.log("📦 BASE_URL:", BASE_URL);
    const response = await axios.get(BASE_URL);
    return response.data; 
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error; // ขว้าง error กลับไปให้จัดการใน component
  }
};