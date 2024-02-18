from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer,LoginSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
from django.conf import settings
from UserHub.models import UserInfo

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication, BasicAuthentication])
def signup_view(request):
    if request.method == 'POST':
        reg_serializer = UserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            refresh = RefreshToken.for_user(new_user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def login_view(request):
    if request.method == 'POST':
        mutable_data             = request.data.copy()
        user                     = User.objects.get(email=mutable_data.get('email'))
        mutable_data['username'] = user.username
        serializer               = LoginSerializer(data=mutable_data, context={'request': request})
        
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            response = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    try:
        refresh_token = request.data.get("refresh_token")
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logged out successfully'})
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication, BasicAuthentication])
def seller_signup_view(request):
    if request.method == 'POST':
        reg_serializer = UserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            refresh = RefreshToken.for_user(new_user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def seller_login_view(request):
    if request.method == 'POST':
        mutable_data             = request.data.copy()
        user                     = User.objects.get(email=mutable_data.get('email'))
        mutable_data['username'] = user.username
        serializer               = LoginSerializer(data=mutable_data, context={'request': request})
        
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            response = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
@authentication_classes([])
def forgot_password(request):
    if request.method == 'POST':
        user_email = request.POST.get('email')
        try:
            user = User.objects.get(email= user_email)
        except Exception as e:
            response = {
                'message': f'Failed to send email: {str(e)}',
                'success': False 
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        token = UserInfo.objects.get(user=user)
        token = token.token
        print(token)
        subject =''
        message = f'https://localhost:3000/resetpassword/{token}'
        subject = f'Password Reset'
        email = EmailMessage(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [user_email]

        )
        try:
            email.send()
            response = {
                'message': 'Email sent successfully',
                'success' : True
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                'message': f'Failed to send email: {str(e)}',
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
@authentication_classes([])
def password_save(request):
    if request.method == 'POST':
        token = request.POST.get('token').replace("-","")
        userinfo = UserInfo.objects.get(token=token)
        user = userinfo.user
        password = request.POST.get('password')
        user_email = userinfo.user.email
        user.set_password(password)
        user.save()

        message = f'Password Saved Successfully'
        subject = f'Password Reset'
        email = EmailMessage(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [user_email]

        )
        try:
            email.send()
            response = {
                'message' : 'updated successfully',
                'is_password' : True
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response = {
                'message': f'Failed to send email: {str(e)}',
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

