from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import SellerInfoSerializer
from .models import SellerInfo
from rest_framework_simplejwt.authentication import JWTAuthentication

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def sellerprofile_view(request):
    if request.method == 'POST':
        try:
            userid = request.user.id
            request.data['user'] = userid
            serializer = SellerInfoSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'User Info saved successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SellerInfo.DoesNotExist:
            return Response({'message': 'Seller Info not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        try:
            user_id = request.user.id
            seller_info_instance = SellerInfo.objects.get(user=user_id)
            serializer = SellerInfoSerializer(seller_info_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except SellerInfo.DoesNotExist:
            return Response({'message': 'Seller Info not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def update_sellerprofile_view(request):
    if request.method == 'POST':
        try:
            user_id = request.user.id
            seller_info_instance = SellerInfo.objects.get(user=user_id)
            mutable_data = request.data.copy()
            mutable_data['user'] = user_id
            serializer = SellerInfoSerializer(instance=seller_info_instance, data=mutable_data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'seller Info saved successfully'}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SellerInfo.DoesNotExist:
            return Response({'message': 'Seller Info not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)        
