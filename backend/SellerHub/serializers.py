from rest_framework import serializers
from .models import SellerInfo
from AuthenticationHub.serializers import Base64ImageField

class SellerInfoSerializer(serializers.ModelSerializer):
    profile_image = Base64ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = SellerInfo
        fields = '__all__'