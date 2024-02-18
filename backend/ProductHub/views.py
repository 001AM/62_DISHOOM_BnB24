from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import ProductSerializer, ProductSerializer
from .models import Product, ProductImage
from rest_framework_simplejwt.authentication import JWTAuthentication

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def product_view(request):
    if request.method == 'POST':
        try:
            user_id = request.user.id
            mutable_data = request.data.copy()
            mutable_data['seller'] = user_id
            serializer = ProductSerializer(data=mutable_data)
            if serializer.is_valid():
                product = serializer.save()
                product_images_data = request.data.getlist('product_image', [])
                for product_image_data in product_images_data:
                    product_image_instance = ProductImage(product=product)
                    product_image_instance.product_image = product_image_data
                    product_image_instance.save()
                print(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
@permission_classes([AllowAny])
def get_product_view(request):
    if request.method == 'GET':
        try:
            product_id = request.GET.get('product_id')
            if not product_id:
                return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

