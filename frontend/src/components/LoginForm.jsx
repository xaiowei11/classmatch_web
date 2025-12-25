import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS, setStoredCsrfToken } from '../config/api'
import { useLanguage } from '../contexts/LanguageContext'
import { useToast } from '../contexts/ToastContext'
import ChangePasswordModal from './ChangePasswordModal'

export default function LoginForm({ onSuccess }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState([])
    const [showForceModal, setShowForceModal] = useState(false)
    const [pendingNavigatePath, setPendingNavigatePath] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { t } = useLanguage()
    const { toast } = useToast()

    const handleLogin = async () => {
        if (!username || !password) {
            toast.warning(t('login.emptyFields'))
            return
        }

        setIsLoading(true)
        try {
            console.log('開始登入流程...')

            // ✅ 登入前先清除所有舊的認證資訊
            localStorage.clear()

            // 清除所有 cookies
            document.cookie.split(";").forEach(function (c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });

            // ✅ 登入請求不需要 CSRF token（後端已設置 @csrf_exempt）
            const res = await axios.post(API_ENDPOINTS.login, {
                username,
                password
            }, {
                withCredentials: true
            })

            console.log('登入成功，回應數據:', res.data)

            // 儲存用戶資訊
            localStorage.setItem('username', username)
            if (res.data.real_name) {
                localStorage.setItem('realName', res.data.real_name)
            }

            // ✅ 儲存後端回傳的 CSRF Token（使用小寫 csrftoken）
            if (res.data.csrfToken) {
                setStoredCsrfToken(res.data.csrfToken)
            }

            toast.success(t('common.success'))

            // 檢查是否需要強制修改密碼
            const shouldForce = res.data.force_password_change
            if (shouldForce) {
                setShowForceModal(true)
            }

            // 根據角色導向
            if (res.data.role) {
                const path = `/${res.data.role}home`
                handleSuccessNavigation(path, shouldForce)
            } else if (res.data.roles && res.data.roles.length > 0) {
                if (res.data.roles.length === 1) {
                    const path = `/${res.data.roles[0]}home`
                    handleSuccessNavigation(path, shouldForce)
                } else {
                    setRoles(res.data.roles)
                }
            } else {
                toast.error('無法識別用戶身份,請聯繫管理員')
            }
        } catch (err) {
            console.error('登入錯誤:', err)
            localStorage.clear()

            const errorMessage = err.response?.data?.error
                || err.response?.data?.detail
                || err.message

            toast.error(t('login.loginError') + ': ' + errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSuccessNavigation = (path, shouldForce) => {
        if (onSuccess) {
            onSuccess(path, shouldForce)
        } else {
            if (!shouldForce) {
                navigate(path)
            } else {
                setPendingNavigatePath(path)
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    const chooseRole = (r) => {
        const path = `/${r}home`
        if (onSuccess) {
            // Assume logic for multiple roles doesn't involve force password change for simplicity or it's already handled
            navigate(path)
        } else {
            navigate(path)
        }
    }

    const getRoleDisplayName = (role) => {
        return t(`roles.${role}`) || role
    }

    const getRoleIcon = (role) => {
        const iconMap = {
            'teacher': '👨‍🏫',
            'student': '🎓',
            'admin': '⚙️'
        }
        return iconMap[role] || '👤'
    }

    const handleModalClose = () => {
        setShowForceModal(false)
        // If there was a pending path, navigate to it now
        if (pendingNavigatePath) {
            navigate(pendingNavigatePath)
        }
        // If onSuccess was passed, maybe we should call it now?
        // But usually onSuccess is for immediately after login.
        // If force password change is required, we stay on page until modal closes?
        // The original logic was: login -> if force -> show modal -> modal close -> navigate.
    }

    return (
        <div className="w-full">
            <ChangePasswordModal
                isOpen={showForceModal}
                onClose={handleModalClose}
                isMandatory={true}
            />

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('login.username')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder={t('login.usernamePlaceholder')}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('login.password')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input
                            type="password"
                            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder={t('login.passwordPlaceholder')}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>

                <button
                    className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-md font-medium hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('login.loggingIn')}
                        </>
                    ) : (
                        <>
                            {t('login.loginButton')}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </>
                    )}
                </button>

                {roles.length > 1 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('login.selectRole')}：</p>
                        <div className="flex flex-wrap gap-2">
                            {roles.map(r => (
                                <button
                                    key={r}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-md hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-600 transition-all text-gray-700 dark:text-gray-200"
                                    onClick={() => chooseRole(r)}
                                >
                                    <span className="text-lg">{getRoleIcon(r)}</span>
                                    <span className="font-medium text-inherit">{getRoleDisplayName(r)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
