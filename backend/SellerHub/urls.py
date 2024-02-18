from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'SellerHub'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('sellerprofile/', views.sellerprofile_view,name='sellerinfo'),
    path('update_sellerprofile/', views.update_sellerprofile_view,name='update_sellerprofile'),
]
