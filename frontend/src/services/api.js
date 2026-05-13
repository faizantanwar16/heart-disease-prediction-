import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ── Token Helpers ─────────────────────────────────────────────────────────────
export const saveToken   = (token) => localStorage.setItem("token", token);
export const getToken    = ()      => localStorage.getItem("token");
export const removeToken = ()      => localStorage.removeItem("token");
export const isLoggedIn  = ()      => !!localStorage.getItem("token");

const USER_STORAGE_KEY = "heartguard_user";

export const saveUser = (user) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = () => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const removeUser = () => localStorage.removeItem(USER_STORAGE_KEY);

export const logout = () => {
  removeToken();
  removeUser();
};

// ── Auth ──────────────────────────────────────────────────────────────────────
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser    = (data) => API.post("/auth/login", data);

// ── Prediction ────────────────────────────────────────────────────────────────
export const runPrediction        = (data) => API.post("/predict", data);
export const getPredictionHistory = () =>
  API.get("/predict/history").then((res) => res.data);

// ── Vitals ────────────────────────────────────────────────────────────────────
export const logVitals = (data) => API.post("/vitals", data);
export const getVitals = () => API.get("/vitals").then((res) => res.data);

// ── User ──────────────────────────────────────────────────────────────────────
export const getUserProfile    = ()     => API.get("/user/profile");
export const updateUserProfile = (data) => API.put("/user/profile", data);
