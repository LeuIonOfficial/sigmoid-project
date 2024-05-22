from django.urls import path, include
from .views import MyTokenObtainPairView

urlpatterns = [
    path('user/', include('user_api.urls')),
    path('blog/', include('blog.urls')),
]
