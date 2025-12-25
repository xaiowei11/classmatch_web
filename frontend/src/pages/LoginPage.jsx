import { useNavigate } from 'react-router-dom'
import schoolLogo from '../images/maxresdefault.jpg'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitch from '../components/LanguageSwitch'
import ThemeSwitch from '../components/ThemeSwitch'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const announcementItems = t('login.announcementItems')
  const instructionItems = t('login.instructionItems')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-colors">
      {/* 語言和主題切換按鈕 */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => navigate('/')}
          className="bg-white/90 text-gray-800 hover:bg-white px-4 py-2 rounded-md shadow-md text-sm font-medium transition-colors dark:bg-gray-800/90 dark:text-gray-200 dark:hover:bg-gray-700 backdrop-blur-sm"
        >
          回首頁
        </button>
        <ThemeSwitch />
        <LanguageSwitch />
      </div>

      {/* 頂部大橫幅 */}
      <div className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <img
                src={schoolLogo}
                alt="臺北護理健康大學"
                className="h-32 w-auto object-contain drop-shadow-2xl"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg text-center">
              {t('login.title')}
            </h1>
            <p className="text-white/90 text-lg text-center">
              {t('login.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* 主要內容區 */}
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">

            {/* 左側 - 登入表單 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-8 shadow-md">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{t('common.login')}</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              </div>

              <LoginForm />
            </div>

            {/* 右側 - 系統資訊 */}
            <div className="space-y-6">
              {/* 公告區 */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 rounded-lg border border-emerald-200 dark:border-gray-700 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{t('login.announcement')}</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      {Array.isArray(announcementItems) && announcementItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 使用說明 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {t('login.instructions')}
                </h3>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  {Array.isArray(instructionItems) && instructionItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-300 font-bold text-xs">{index + 1}</div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 頁尾 */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('login.footer')}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
            {t('login.browserHint')}
          </p>
        </div>
      </footer>
    </div>
  )
}