from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer


class GetUser(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)

        return Response(serializer.data)


# TODO: Add serializer with tokens
class CreateUser(APIView):
    def post(self, request):
        data = request.data
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
        )
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)