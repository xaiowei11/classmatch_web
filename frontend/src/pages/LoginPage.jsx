import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import schoolLogo from '../images/maxresdefault.jpg'

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [roles, setRoles] = useState([])
  const navigate = useNavigate()

  // 組件載入時先獲取 CSRF token
  useEffect(() => {
    fetchCSRFToken()
  }, [])

  const fetchCSRFToken = async () => {
    try {
      // 訪問任意 GET 端點來獲取 CSRF token
      await axios.get('http://localhost:8000/api/courses/filter-options/', {
        withCredentials: true
      })
      console.log('CSRF token 已獲取')
    } catch (error) {
      console.error('獲取 CSRF token 失敗:', error)
    }
  }

  const handleLogin = async () => {
    try {
      const csrfToken = getCookie('csrftoken')
      console.log('CSRF Token:', csrfToken)
      
      const res = await axios.post('http://localhost:8000/api/login/', {
        username, password
      }, {
        withCredentials: true,
        headers: csrfToken ? {
          'X-CSRFToken': csrfToken
        } : {}
      })
      
      console.log('後端返回的完整數據：', res.data)
      
      localStorage.setItem('username', username)
      if (res.data.real_name) {
        localStorage.setItem('realName', res.data.real_name)
      }
      
      if (res.data.role) {
        navigate(`/${res.data.role}home`)
      } else if (res.data.roles) {
        setRoles(res.data.roles)
      }
    } catch (err) {
      console.error('登入錯誤:', err)
      alert('登入失敗: ' + (err.response?.data?.error || err.message))
    }
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const chooseRole = (r) => {
    navigate(`/${r}home`)
  }

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'teacher': '教師',
      'student': '學生',
      'admin': '管理員'
    }
    return roleMap[role] || role
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="rounded-3xl shadow-2xl p-10 w-full max-w-md">
        {/* 學校 Logo */}
        <div className="flex justify-center">
          <img 
            src={schoolLogo} 
            alt="學校logo" 
            className="w-64 h-auto object-contain"
          />
        </div>
        
        {/* 登入表單 */}
        <div className="space-y-4">
          <input 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-gray-800"
            placeholder="帳號" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          
          <input 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-gray-800"
            placeholder="密碼" 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          
          <button 
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 active:scale-95 transition-all shadow-md hover:shadow-lg"
            onClick={handleLogin}
          >
            登入
          </button>
        </div>

        {/* 角色選擇 */}
        {roles.length > 1 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">選擇身份</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {roles.map(r => (
                <button 
                  key={r}
                  className="px-6 py-2 bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-green-500 hover:text-white hover:border-green-500 active:scale-95 transition-all"
                  onClick={() => chooseRole(r)}
                >
                  {getRoleDisplayName(r)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}