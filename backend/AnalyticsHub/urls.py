from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'AnalyticsHub'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('analytics/', views.analytics_view, name='analytics_view'),
    path('get_analytics/<int:product_id>/', views.get_analytics_view, name='get_analytics'),
]