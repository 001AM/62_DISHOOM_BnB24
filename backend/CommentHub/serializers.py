from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        depth = 1
        
class CommentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
