from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        post_obj = Post.objects.create(title=validated_data['title'], content=validated_data['content'], author=validated_data['author'])
        post_obj.save()

        return post_obj