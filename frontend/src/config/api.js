// src/config/api.js
// 統一的 API 配置文件

import axios from 'axios'

// 從環境變量獲取 API URL，如果沒有則使用本地開發地址
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// 移除末尾的斜線（如果有）
const baseURL = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL

export default baseURL

// ===== 新增：創建配置好的 axios 實例 =====
export const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,  // 自動發送 cookies
  headers: {
    'Content-Type': 'application/json',
  }
})

// ===== 新增：請求攔截器 - 自動添加 CSRF token =====
apiClient.interceptors.request.use(
  (config) => {
    // 獲取 CSRF token 的函數
    const getCsrfToken = () => {
      const name = 'csrftoken'
      const cookies = document.cookie.split(';')
      for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=')
        if (key === name) return value
      }
      return null
    }

    const csrfToken = getCsrfToken()
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// ===== 新增：響應攔截器 - 處理錯誤 =====
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error('CSRF 驗證失敗')
    } else if (error.response?.status === 401) {
      console.error('未授權，請重新登入')
    }
    return Promise.reject(error)
  }
)

// API 端點定義
export const API_ENDPOINTS = {
  // 認證相關
  login: `${baseURL}/login/`,
  logout: `${baseURL}/logout/`,
  register: `${baseURL}/register/`,
  
  // 課程相關
  courses: `${baseURL}/courses/`,
  coursesSearch: `${baseURL}/courses/search/`,
  coursesCreate: `${baseURL}/courses/create/`,
  courseDetail: (id) => `${baseURL}/courses/${id}/detail/`,
  courseUpdate: (id) => `${baseURL}/courses/${id}/update/`,
  courseDelete: (id) => `${baseURL}/courses/${id}/delete/`,
  courseEnroll: (id) => `${baseURL}/courses/${id}/enroll/`,
  courseDrop: (id) => `${baseURL}/courses/${id}/drop/`,
  courseFavorite: (id) => `${baseURL}/courses/${id}/favorite/`,
  
  // 篩選選項
  filterOptions: `${baseURL}/courses/filter-options/`,
  
  // 我的課程
  enrolledCourses: `${baseURL}/courses/enrolled/`,
  favoriteCourses: `${baseURL}/courses/favorites/`,
  
  // 教師相關
  teachers: `${baseURL}/teachers/`,
  
  // 學生相關
  students: `${baseURL}/students/`,
  studentUpdate: (id) => `${baseURL}/students/${id}/update/`,
  studentDelete: (id) => `${baseURL}/students/${id}/delete/`,
  
  // 教師管理
  teacherUpdate: (id) => `${baseURL}/teachers/${id}/update/`,
  teacherDelete: (id) => `${baseURL}/teachers/${id}/delete/`,
  
  // 用戶相關
  creditSummary: `${baseURL}/user/credit-summary/`,
}