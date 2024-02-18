from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserInfoSerializer
from .models import UserInfo

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def userprofile_view(request):
    if request.method == 'POST':
        try:
            user_id = request.user.id
            seller_info_instance = UserInfo.objects.get(user=user_id)
            mutable_data = request.data.copy()
            mutable_data['user'] = user_id
            serializer = UserInfoSerializer(instance=seller_info_instance, data=mutable_data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'User Info saved successfully'}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserInfo.DoesNotExist:
            return Response({'message': 'User Info not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        try:
            user_id = request.user.id
            user_info_instance = UserInfo.objects.get(user=user_id)
            serializer = UserInfoSerializer(user_info_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserInfo.DoesNotExist:
            return Response({'message': 'User Info not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_userprofile_view(request):
    if request.method == 'POST':
        try:
            user_id = request.user.id
            seller_info_instance = UserInfo.objects.get(user=user_id)
            mutable_data = request.data.copy()
            mutable_data['user'] = user_id
            serializer = UserInfoSerializer(instance=seller_info_instance, data=mutable_data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'User Info saved successfully'}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserInfo.DoesNotExist:
            return Response({'message': 'User Info not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
