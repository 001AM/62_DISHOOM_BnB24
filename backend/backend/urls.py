
from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
# import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    path('admininfo/', include('AdminHub.urls')),
    path('analysis/', include('AnalyticsHub.urls')),
    path('authentication/', include('AuthenticationHub.urls')),
    path('comment/', include('CommentHub.urls')),
    path('product/', include('ProductHub.urls')),
    path('report/', include('ReportHub.urls')),
    path('seller/', include('SellerHub.urls')),
    path('subscription/', include('SubscriptionHub.urls')),
    path('user/', include('UserHub.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)