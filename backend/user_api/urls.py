from django.urls import path
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('me', views.UserView.as_view(), name='me'),
    path('', view=views.ListUsers.as_view(), name='author'),
    path('/<int:pk>/', views.AuthorView.as_view(), name='author'),
]
