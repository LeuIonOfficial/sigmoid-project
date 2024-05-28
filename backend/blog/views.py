from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication  # type: ignore
from .models import Post
from .serializers import PostSerializer
from .utils import ask
from asgiref.sync import async_to_sync


class ListPostView(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def list(request):
        search = request.query_params.get("search")
        author = request.query_params.get("author")
        queryset = Post.objects.all()

        if search:
            queryset = queryset.filter(title__icontains=search)
        if author:
            queryset = queryset.filter(author=author)

        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)


class RetrievePostView(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def retrieve(request, pk=None):
        try:
            post = Post.objects.get(pk=pk)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response({"status": "post does not exist"}, status=status.HTTP_404_NOT_FOUND)


class CreatePostView(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def create(request):
        data = request.data
        user = request.user
        data.update({'author': user.id})
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save(author=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdatePostView(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def update(request, pk=None):
        try:
            user = request.user
            post = Post.objects.get(pk=pk)

            if user.id != post.author.id:
                return Response({"status": "not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

            serializer = PostSerializer(post, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response({"status": "post does not exist"}, status=status.HTTP_404_NOT_FOUND)


class DeletePostView(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def destroy(request, pk=None):
        try:
            user = request.user
            post = Post.objects.get(pk=pk)

            if user.id != post.author.id:
                return Response({"status": "not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

            post.delete()
            return Response({"status": "deleted"}, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({"status": "post does not exist"}, status=status.HTTP_404_NOT_FOUND)


class AskAIView(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def create(request):
        data = request.data
        prompt = {
            "role": "user",
            "content": f"Please respond only in English. Write an article about {data['question']}.",
        }
        response = async_to_sync(ask)(messages=[prompt])
        return Response(response, status=status.HTTP_200_OK)
