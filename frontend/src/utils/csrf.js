// src/utils/csrf.js

export function getCsrfToken() {
  // 從 localStorage 讀取
  const token = localStorage.getItem('csrftoken')
  if (token) {
    return token
  }
  
  // 備用：從 cookie 讀取（向下相容）
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith('csrftoken=')) {
      return decodeURIComponent(cookie.substring(10))
    }
  }
  
  return null
}

export function setCsrfToken(token) {
  if (token) {
    localStorage.setItem('csrftoken', token)
    console.log('✅ CSRF token 已儲存')
  }
}

export function clearCsrfToken() {
  localStorage.removeItem('csrftoken')
  console.log('🗑️ CSRF token 已清除')
}