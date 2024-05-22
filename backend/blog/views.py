from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer
from rest_framework import permissions, status
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTAuthentication  # type: ignore


class PostViewSet(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def get(request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class PostCreate(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (JWTAuthentication, )

    @staticmethod
    def post(request):
        data = request.data
        user = request.user
        data.update({'author': user.id})
        serializer = PostSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            post = serializer.save(data)
            if post:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
