import React from 'react'
import { useNavigate } from 'react-router-dom'
import LanguageSwitch from '../components/LanguageSwitch'
import ThemeSwitch from '../components/ThemeSwitch'
import { useLanguage } from '../contexts/LanguageContext'
import schoolLogo from '../images/maxresdefault.jpg'

export default function LandingPage() {
    const navigate = useNavigate()
    const { t } = useLanguage()

    return (
        <div className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-gray-900 font-sans">

            {/* Top Controls - Absolute */}
            <div className="absolute top-6 right-6 z-50 flex gap-3 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <ThemeSwitch className="!text-white !border-white/40 hover:!bg-white/20" />
                <LanguageSwitch className="!text-white !border-white/40 hover:!bg-white/20" />
            </div>

            {/* Central Overlay Branding - Absolute Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none text-center mix-blend-overlay md:mix-blend-normal">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest drop-shadow-2xl uppercase opacity-90 whitespace-nowrap hidden md:block select-none">
                    NTUNHS
                </h1>
                <p className="text-white/80 text-sm md:text-lg tracking-[0.5em] mt-2 font-light hidden md:block select-none">
                    CLASS MATCH
                </p>
            </div>

            {/* School Name Header - Absolute Top Center */}
            <div className="absolute top-8 left-0 w-full z-40 pointer-events-none flex flex-col items-center justify-center">
                <div className="backdrop-blur-md bg-white/10 px-8 py-3 rounded-full border border-white/20 shadow-2xl flex items-center gap-4 transform transition-all hover:scale-105 duration-500">
                    <img src={schoolLogo} alt="NTUNHS Logo" className="h-10 w-auto object-contain drop-shadow-lg" />
                    <div className="text-center">
                        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                            國立臺北護理健康大學
                        </h1>
                        <p className="text-xs md:text-sm text-gray-200 tracking-wider font-light uppercase">
                            National Taipei University of Nursing and Health Sciences
                        </p>
                    </div>
                </div>
            </div>

            {/* Left Side - Course Selection */}
            <div
                className="relative group flex-1 flex items-center justify-center cursor-pointer transition-all duration-700 ease-out hover:flex-[1.8] bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-800 overflow-hidden border-r border-white/10"
                onClick={() => navigate('/login')}
            >
                {/* Dynamic Background Image/Gradient */}
                <div className="absolute inset-0 bg-[url('https://farm3.static.flickr.com/2664/5824582674_599c0a93f2_o.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay transform group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700"></div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-400/30 transition-all duration-700"></div>

                <div className="relative z-10 text-center transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    <div className="w-28 h-28 mx-auto mb-8 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] group-hover:border-emerald-400/50 group-hover:shadow-[0_8px_32px_0_rgba(52,211,153,0.3)] transition-all duration-500 rotate-3 group-hover:rotate-0">
                        <svg className="w-14 h-14 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-200 mb-3 drop-shadow-lg tracking-tight">
                        {t('nav.courseSystem') || '選課系統'}
                    </h2>
                    <div className="h-1 w-16 bg-emerald-400 mx-auto rounded-full mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <p className="text-emerald-100/90 text-lg font-light tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {t('landing.courseSystemDesc')}
                    </p>
                </div>
            </div>

            {/* Right Side - Query System */}
            <div
                className="relative group flex-1 flex items-center justify-center cursor-pointer transition-all duration-700 ease-out hover:flex-[1.8] bg-gradient-to-bl from-blue-900 via-indigo-800 to-slate-900 overflow-hidden"
                onClick={() => navigate('/query')}
            >
                {/* Dynamic Background Image/Gradient */}
                <div className="absolute inset-0 bg-[url('https://www.ntunhs.edu.tw/var/file/0/1000/randimg/mobileadv_1105_8752682_67162.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay transform group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700"></div>

                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] transform translate-x-1/2 translate-y-1/2 group-hover:bg-blue-500/30 transition-all duration-700"></div>

                <div className="relative z-10 text-center transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    <div className="w-28 h-28 mx-auto mb-8 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] group-hover:border-blue-400/50 group-hover:shadow-[0_8px_32px_0_rgba(96,165,250,0.3)] transition-all duration-500 -rotate-3 group-hover:rotate-0">
                        <svg className="w-14 h-14 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 mb-3 drop-shadow-lg tracking-tight">
                        {t('nav.searchCourses') || '查詢系統'}
                    </h2>
                    <div className="h-1 w-16 bg-blue-400 mx-auto rounded-full mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <p className="text-blue-100/90 text-lg font-light tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {t('landing.querySystemDesc')}
                    </p>
                </div>
            </div>
        </div>
    )
}
