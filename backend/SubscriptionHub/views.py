from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
from django.conf import settings
from UserHub.models import UserInfo
from SubscriptionHub.models import SubscriptionDetails
from django.contrib.auth.models import User
from django.template.loader import render_to_string

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def send_email_all(request):
    subject = request.data.get('subject')
    message = request.data.get('message')
    html_template = request.FILES.get('files')  # Fix: Use request.FILES to get uploaded files
    sub_obj = SubscriptionDetails.objects.all()  # Fix: Use all() to get all objects
    recipient_list = [obj.email for obj in sub_obj]

    if not subject or not message or not recipient_list:
        return Response({'error': 'Subject, message, and recipient_list are required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    email_content = render_to_string(html_template.name, {'message': message})  # Fix: Use html_template.name to get the file name
    mail = EmailMessage(
        subject,
        email_content,
        settings.EMAIL_HOST_USER,
        recipient_list,
    )
    mail.content_subtype = "html"  # Specify content type as HTML
    mail.send(fail_silently=False)

    return Response({'success': 'Email sent successfully.'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
@authentication_classes([])
def sub_email(request):
    if request.method == 'POST':
        sub_email = request.POST.get('email')
        try:
            user = User.objects.get(email=sub_email)
            if user:
                is_user = True
            else:
                is_user = False
        except:
            is_user = False
        sub_obj = SubscriptionDetails()
        sub_obj.email = sub_email
        sub_obj.is_user = is_user
        sub_obj.save()

        message = f'Subscribed to Email Successfully'
        subject = f'Email Subscription'
        email = EmailMessage(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [sub_email]

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