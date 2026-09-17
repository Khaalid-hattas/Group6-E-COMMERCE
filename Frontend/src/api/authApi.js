// src/api/authApi.js
// Matches Phase 13's table: Register, Login, Account, Profile update.

const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://group6-e-commerce-production.up.railway.app"
).replace(/\/api\/?$/, "").replace(/\/$/, "");

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

// POST /api/auth/register
// payload: { full_name, email, password, role, studio_name?, location?, bio? }
export function registerRequest(payload) {
  return request("/api/auth/register", { method: "POST", body: payload });
}

// POST /api/auth/login
// payload: { email, password }
export function loginRequest(payload) {
  return request("/api/auth/login", { method: "POST", body: payload });
}

// GET /api/auth/me
export function fetchMeRequest(token) {
  return request("/api/auth/me", { method: "GET", token });
}

// PUT /api/users/me
export function updateProfileRequest(payload, token) {
  return request("/api/users/me", { method: "PUT", body: payload, token });
}
