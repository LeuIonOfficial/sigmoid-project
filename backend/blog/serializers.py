from rest_framework import serializers
from .models import Post
from user_api.models import AppUser
from user_api.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        post_obj = Post.objects.create(
            title=validated_data['title'], content=validated_data['content'], author=validated_data['author'])
        post_obj.save()

        return post_obj

    @staticmethod
    def get_author(obj):
        author = AppUser.objects.get(id=obj.author.id)
        return UserSerializer(author).data
