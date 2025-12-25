import React from 'react'
import SearchCourses from '../components/student/SearchCourses'
import LanguageSwitch from '../components/LanguageSwitch'
import ThemeSwitch from '../components/ThemeSwitch'
import schoolLogo from '../images/maxresdefault.jpg'
import { useLanguage } from '../contexts/LanguageContext'
import { useNavigate } from 'react-router-dom'

export default function CourseQueryPage() {
    const { t } = useLanguage()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <img
                            src={schoolLogo}
                            alt="Logo"
                            className="h-10 w-auto object-contain"
                        />
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                            {t('login.title') || 'ClassMatch'} - {t('nav.searchCourses') || '查詢系統'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md"
                        >
                            回首頁
                        </button>
                        <ThemeSwitch />
                        <LanguageSwitch />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-bold mb-2">歡迎使用課程查詢系統</h2>
                        <p className="opacity-90 text-sm">此系統無需登入即可查詢全校課程資訊。如需選課或查看個人化資訊，請從首頁進入「選課系統」登入。</p>
                    </div>
                    <SearchCourses />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} ClassMatch Course Selection System
                    </p>
                </div>
            </footer>
        </div>
    )
}
