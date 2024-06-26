from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, UserLoginSerializer, UserRegisterSerializer
from rest_framework import permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import AppUser


# TODO: Add custom validation for username, email, password
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    @staticmethod
    def post(request):
        clean_data = request.data
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def post(request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                }, status=status.HTTP_200_OK)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    @staticmethod
    def get(request):
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def get(request):
        data = request.user
        serializer = UserSerializer(instance=data)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class AuthorView(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def retrieve(pk=None):
        try:
            author = AppUser.objects.get(pk=pk)
            serializer = UserSerializer(author)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserSerializer.DoesNotExist:
            return Response({"status": "author does not exist"}, status=status.HTTP_404_NOT_FOUND)


class ListUsers(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def get(request):
        data = AppUser.objects.all()
        serializer = UserSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
