from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('me/', views.GetUser.as_view(), name='me'),
    path('register/', views.CreateUser.as_view(), name='register'),
]
