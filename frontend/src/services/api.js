const BASE_URL = import.meta.env.VITE_API_URL;

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ─── User ─────────────────────────────────────────────────────────────────────

export const getUserProfile = async () => {
  const res = await fetch(`${BASE_URL}/api/user/profile`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const updateUserProfile = async (data) => {
  const res = await fetch(`${BASE_URL}/api/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ─── Vitals ───────────────────────────────────────────────────────────────────

export const logVitals = async (data) => {
  const res = await fetch(`${BASE_URL}/api/vitals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getVitals = async () => {
  const res = await fetch(`${BASE_URL}/api/vitals`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

// ─── Predictions ──────────────────────────────────────────────────────────────

export const getPredictionHistory = async () => {
  const res = await fetch(`${BASE_URL}/api/predict/history`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const runPrediction = async (data) => {
  const res = await fetch(`${BASE_URL}/api/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ─── Token Helpers ────────────────────────────────────────────────────────────

export const saveToken = (token) => localStorage.setItem("hg_token", token);
export const getToken  = ()      => localStorage.getItem("hg_token");
export const removeToken = ()    => localStorage.removeItem("hg_token");

export const saveUser = (user) => localStorage.setItem("hg_user", JSON.stringify(user));
export const getUser  = ()     => JSON.parse(localStorage.getItem("hg_user") || "null");
export const removeUser = ()   => localStorage.removeItem("hg_user");

export const logout = () => { removeToken(); removeUser(); };
export const isLoggedIn = () => !!getToken();