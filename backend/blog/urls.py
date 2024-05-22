from django.urls import path
from .views import ListPostView, RetrievePostView, CreatePostView, UpdatePostView, DeletePostView, AskAIView

urlpatterns = [
    path('posts/', ListPostView.as_view({'get': 'list'}), name='list-posts'),
    path('posts/<int:pk>/',
         RetrievePostView.as_view({'get': 'retrieve'}), name='retrieve-post'),
    path('posts/create/',
         CreatePostView.as_view({'post': 'create'}), name='create-post'),
    path('posts/<int:pk>/update/',
         UpdatePostView.as_view({'put': 'update'}), name='update-post'),
    path('posts/<int:pk>/delete/',
         DeletePostView.as_view({'delete': 'destroy'}), name='delete-post'),
    path('ask-ai/', AskAIView.as_view({'post': 'create'}), name='ask-ai'),
]
