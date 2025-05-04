import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8080/api/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${AUTH_API_BASE_URL}/register`,
      userData,
      {
        withCredentials: true, // ✅ this is crucial
      }
    );
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(
      `${AUTH_API_BASE_URL}/login`,
      loginData,
      {
        withCredentials: true, // ✅ add this too
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

