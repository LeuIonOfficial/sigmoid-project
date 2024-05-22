from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import PostViewSet, AskAIViewSet

router = SimpleRouter()
router.register(r'post', PostViewSet, basename='post')
router.register(r'ai', AskAIViewSet, basename='ai')

urlpatterns = [
    path('post', PostViewSet.as_view({'get': 'list', 'post': 'create', 'put': 'update', 'delete': 'destroy'})),
    path('ai', AskAIViewSet.as_view({'post': 'create'}))
]
