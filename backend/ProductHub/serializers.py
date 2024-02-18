from rest_framework import serializers
from .models import Product, ProductImage
from AuthenticationHub.serializers import Base64ImageField

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product_image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'seller', 'name', 'description', 'rating', 'images']