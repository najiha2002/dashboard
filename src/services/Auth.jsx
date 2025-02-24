// Auth.jsx
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// Store token securely
const storeToken = (token) => {
  localStorage.setItem("token", token);
};

// Retrieve token
const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token (Logout)
const removeToken = () => {
  localStorage.removeItem("token");
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!getToken(); // Returns true if token exists
};

// Login function
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    if (response.data.access_token) {
      storeToken(response.data.access_token);
      return { success: true, message: "Login successful" };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Login failed" };
  }
};

// Logout function
const logout = () => {
  removeToken();
  window.location.href = "/login"; // Redirect to login page
};

// Get user profile
const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

// Export functions
export { login, logout, isAuthenticated, getUserProfile };
