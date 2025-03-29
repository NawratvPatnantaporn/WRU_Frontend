import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
// import toast from "react-hot-toast";

const API_URL = "http://localhost:50100/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (
    email,
    name,
    department,
    idcard,
    phonenumber,
    password
  ) => {
    set({ isLoading: true, error: null });

    if (
      !email ||
      !name ||
      !department ||
      !idcard ||
      !phonenumber ||
      !password
    ) {
      const missingFields = [];

      // หาค่าฟิลด์ที่ขาด
      if (!email) missingFields.push("อีเมล");
      if (!name) missingFields.push("ชื่อ");
      if (!department) missingFields.push("แผนก");
      if (!idcard) missingFields.push("รหัสบัตรประชาชน");
      if (!phonenumber) missingFields.push("หมายเลขโทรศัพท์");
      if (!password) missingFields.push("รหัสผ่าน");

      // แสดงข้อความแจ้งเตือนด้วย toast
      toast.error(`กรุณากรอกข้อมูล: ${missingFields.join(", ")}`, {
        position: "top-right",
        autoClose: 3000,
      });
      set({ isLoading: false });
      return; 
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        name,
        department,
        idcard,
        phonenumber,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
}));
