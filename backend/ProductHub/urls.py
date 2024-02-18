from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'ProductHub'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('products/', views.product_view,name='products'),
    path('get_products/', views.get_product_view,name='get_products'), 
]
