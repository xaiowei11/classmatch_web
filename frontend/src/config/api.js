// src/config/api.js
// 統一的 API 配置文件

// 從環境變量獲取 API URL，如果沒有則使用本地開發地址
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// 移除末尾的斜線（如果有）
const baseURL = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL

export default baseURL

// 也可以導出完整的 API 端點
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