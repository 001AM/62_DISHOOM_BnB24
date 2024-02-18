from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'AdminHub'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    # path('userinfo/', views.userinfo_view,name='userinfo'),
]
