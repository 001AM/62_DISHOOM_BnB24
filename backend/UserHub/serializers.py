from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import serializers    
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError
from .models import UserInfo
from AuthenticationHub.serializers import Base64ImageField

class UserInfoSerializer(serializers.ModelSerializer):
    profile_image = Base64ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    banner_image = Base64ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = UserInfo
        fields = '__all__'