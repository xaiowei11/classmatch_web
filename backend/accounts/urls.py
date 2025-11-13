# urls.py
# 請將這個內容加到你的 Django app 的 urls.py 中

from django.urls import path
from . import views

urlpatterns = [
    # ===== 基本功能 API =====
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # ===== 學生功能 API =====
    path('user/credit-summary/', views.get_credit_summary, name='credit_summary'),
    
    # ===== 管理員功能 API =====
    path('teachers/', views.get_teachers, name='get_teachers'),  # ← 移除 api/ 前綴
    path('courses/create/', views.create_course, name='create_course'),  # ← 移除 api/ 前綴
    path('courses/', views.get_all_courses, name='get_all_courses'),  # ← 新增
    path('courses/<int:course_id>/', views.delete_course, name='delete_course'),  # ← 新增
]