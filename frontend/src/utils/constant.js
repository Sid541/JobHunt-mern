// src/utils/constant.js

// Dynamic Base URL configuration
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// Centralized API endpoints
export const USER_API_END_POINT        = `${BASE_URL}/user`;
export const JOB_API_END_POINT         = `${BASE_URL}/job`;
export const COMPANY_API_END_POINT     = `${BASE_URL}/company`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/application`;