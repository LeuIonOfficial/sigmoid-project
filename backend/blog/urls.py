from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import PostViewSet

router = SimpleRouter()
router.register(r'post', PostViewSet)

urlpatterns = [
    path('post', PostViewSet.as_view({'get': 'list', 'post': 'create', 'put': 'update', 'delete': 'destroy'})),
]
