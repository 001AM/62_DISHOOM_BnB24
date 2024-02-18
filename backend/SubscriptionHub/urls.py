from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'SubscriptionHub'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('sub_email/',views.sub_email,name='sub_email'),
    path('send_email_all/',views.send_email_all,name='send_email_all'),
]
