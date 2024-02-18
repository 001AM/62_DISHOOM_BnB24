from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import CommentSerializer,CommentPostSerializer
from .models import Comment
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def comments_view(request):
    if request.method == 'POST':
        try:
            mutable_data = request.data.copy()
            mutable_data['user'] = request.user.id # Pass user_id instead of User object
            serializer = CommentPostSerializer(data=mutable_data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Comment saved successfully'}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
@permission_classes([AllowAny])
def get_comments(request):
    if request.method == 'GET':
        try:
            product_id = request.GET.get('product_id')
            if not product_id:
                return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            comments = Comment.objects.filter(product=product_id)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response({'message': 'Comments not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

