from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'CommentHub'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('comments/', views.comments_view,name='comments'),
    path('get_comments/', views.get_comments, name='get_comments'),
]
