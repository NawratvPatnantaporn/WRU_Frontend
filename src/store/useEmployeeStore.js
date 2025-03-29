import axios from "axios";

const BASE_URL = "http://localhost:50100/api/employees/";

// ฟังก์ชันดึงข้อมูลพนักงาน
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; 
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error; // ขว้าง error กลับไปให้จัดการใน component
  }
};