import { useState, useEffect } from 'react'
import API_BASE_URL from '../../config/api'


export default function MyCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    academic_year: '114',
    semester: '1'
  })

  //const API_BASE_URL = 'http://localhost:8000/api'

  // 定義節次時間
  const periods = [
    { period: 1, time: '08:10-09:00' },
    { period: 2, time: '09:10-10:00' },
    { period: 3, time: '10:10-11:00' },
    { period: 4, time: '11:10-12:00' },
    { period: 5, time: '12:40-13:30' },
    { period: 6, time: '13:40-14:30' },
    { period: 7, time: '14:40-15:30' },
    { period: 8, time: '15:40-16:30' },
    { period: 9, time: '16:40-17:30' },
    { period: 10, time: '17:40-18:30' },
  ]

  // 定義星期
  const weekdays = [
    { value: '1', label: '星期一' },
    { value: '2', label: '星期二' },
    { value: '3', label: '星期三' },
    { value: '4', label: '星期四' },
    { value: '5', label: '星期五' },
    { value: '6', label: '星期六' },
    { value: '7', label: '星期日' },
  ]

  useEffect(() => {
    fetchEnrolledCourses()
  }, [filters])

  const fetchEnrolledCourses = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/enrolled/?academic_year=${filters.academic_year}&semester=${filters.semester}`,
        {
          credentials: 'include'
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        console.log('API 回傳資料:', data)
        
        // 處理課程資料，展開 class_times
        const processedCourses = []
        data.forEach(enrollment => {
          if (enrollment.class_times && enrollment.class_times.length > 0) {
            enrollment.class_times.forEach(classTime => {
              processedCourses.push({
                id: `${enrollment.id}-${classTime.weekday}-${classTime.start_period}`,
                course_id: enrollment.id,
                course_code: enrollment.course_code,
                course_name: enrollment.course_name,
                credits: enrollment.credits,
                teacher_name: enrollment.teachers && enrollment.teachers.length > 0
                  ? enrollment.teachers.map(t => t.name).join('、')
                  : '未設定',
                classroom: classTime.classroom,
                weekday: classTime.weekday_display,
                weekday_value: classTime.weekday,
                start_period: classTime.start_period,
                end_period: classTime.end_period,
                time_display: `${classTime.weekday_display} 第${classTime.start_period}-${classTime.end_period}節`
              })
            })
          }
        })
        
        console.log('處理後的課程:', processedCourses)
        setCourses(processedCourses)
      } else {
        console.error('獲取課程失敗')
        setCourses([])
      }
    } catch (error) {
      console.error('獲取已選課程失敗:', error)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  // 根據星期和節次獲取課程
  const getCourseAt = (weekday, period) => {
    const result = courses.filter(course => {
      // 確保型別一致的比較
      const courseWeekday = String(course.weekday_value)
      const weekdayStr = String(weekday)
      const coursePeriodStart = Number(course.start_period)
      const coursePeriodEnd = Number(course.end_period)
      const periodNum = Number(period)
      
      const match = courseWeekday === weekdayStr && 
                    periodNum >= coursePeriodStart && 
                    periodNum <= coursePeriodEnd
      
      return match
    })
    return result
  }

  // 檢查這個格子是否應該被合併（是某課程的延續）
  const shouldMerge = (weekday, period) => {
    const coursesAtThisPeriod = courses.filter(course => {
      const courseWeekday = String(course.weekday_value)
      const weekdayStr = String(weekday)
      const coursePeriodStart = Number(course.start_period)
      const coursePeriodEnd = Number(course.end_period)
      const periodNum = Number(period)
      
      return courseWeekday === weekdayStr && 
             periodNum > coursePeriodStart && 
             periodNum <= coursePeriodEnd
    })
    return coursesAtThisPeriod.length > 0
  }

  // 計算課程應該佔據幾個格子（rowSpan）
  const getRowSpan = (course) => {
    return course.end_period - course.start_period + 1
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">我的課表</h2>
        
        {/* 學年度和學期選擇 */}
        <div className="flex gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">學年度</label>
            <select
              value={filters.academic_year}
              onChange={(e) => setFilters(prev => ({ ...prev, academic_year: e.target.value }))}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="113">113</option>
              <option value="114">114</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">學期</label>
            <select
              value={filters.semester}
              onChange={(e) => setFilters(prev => ({ ...prev, semester: e.target.value }))}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">上學期</option>
              <option value="2">下學期</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">載入中...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 w-32">
                  時間
                </th>
                {weekdays.map(day => (
                  <th key={day.value} className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 w-40">
                    {day.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map(({ period, time }) => (
                <tr key={period} className="h-20">
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 bg-gray-50 h-20">
                    <div className="font-medium">第{period}節</div>
                    <div className="text-xs text-gray-500">{time}</div>
                  </td>
                  {weekdays.map(day => {
                    // 如果這個格子應該被合併（是某課程的延續），不渲染
                    if (shouldMerge(day.value, period)) {
                      return null
                    }

                    const coursesHere = getCourseAt(day.value, period)
                    
                    if (coursesHere.length > 0) {
                      const course = coursesHere[0]
                      const rowSpan = getRowSpan(course)
                      
                      return (
                        <td 
                          key={day.value} 
                          className="border border-gray-300 p-2 align-middle w-40"
                          rowSpan={rowSpan}
                        >
                          <div className="bg-blue-100 rounded p-3 flex flex-col items-center justify-center gap-1" 
                               style={{ height: `${rowSpan * 80 - 16}px` }}>
                            <div className="font-semibold text-sm text-gray-800 text-center line-clamp-2 overflow-hidden">
                              {course.course_name}
                            </div>
                            {/* <div className="text-xs text-gray-600 text-center">
                              {course.teacher_name}
                            </div> */}
                            <div className="text-xs text-gray-600 text-center">
                              {course.classroom}
                            </div>
                          </div>
                        </td>
                      )
                    }

                    return (
                      <td key={day.value} className="border border-gray-300 px-2 py-3 w-40 h-20">
                        {/* 空格 */}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && courses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">目前沒有已選課程</p>
        </div>
      )}
    </div>
  )
}