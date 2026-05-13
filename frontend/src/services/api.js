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

// ── Auth ──────────────────────────────────────────────────────────────────────
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser    = (data) => API.post("/auth/login", data);

// ── Prediction ────────────────────────────────────────────────────────────────
export const runPrediction       = (data) => API.post("/predict", data);
export const getPredictionHistory = ()    => API.get("/predict/history");

// ── Vitals ────────────────────────────────────────────────────────────────────
export const logVitals  = (data) => API.post("/vitals", data);
export const getVitals  = ()     => API.get("/vitals");

// ── User ──────────────────────────────────────────────────────────────────────
export const getUserProfile    = ()     => API.get("/user/profile");
export const updateUserProfile = (data) => API.put("/user/profile", data);