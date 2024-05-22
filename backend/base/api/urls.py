from django.urls import path, include

from rest_framework_simplejwt.views import ( # type: ignore
    TokenRefreshView,
)
from .views import MyTokenObtainPairView

urlpatterns = [
    path('', include('user_api.urls')),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include('blog.urls'))
]
