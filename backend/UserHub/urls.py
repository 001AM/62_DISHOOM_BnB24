from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'UserHub'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('userprofile/', views.userprofile_view,name='userprofile'),
    path('update_userprofile/', views.update_userprofile_view,name='update_userprofile'),
]
