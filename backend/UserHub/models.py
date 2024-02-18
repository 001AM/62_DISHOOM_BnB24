from django.db import models

import uuid
from django.contrib.auth.models import User

class UserInfo(models.Model):
    unique_id      = models.UUIDField(default=uuid.uuid4, blank=True, null=True)
    user           = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_image  = models.ImageField(upload_to='ProfileImages/', null=True, blank=True)
    banner_image   = models.ImageField(upload_to='BannerImages/', null=True, blank=True)
    phone_code     = models.BigIntegerField(default=None, null=True, blank=True)
    phone_number   = models.BigIntegerField(default=None, null=True, blank=True)
    first_name     = models.CharField(max_length=100, null=True, blank=True)
    last_name      = models.CharField(max_length=100, null=True, blank=True)
    address_line1  = models.CharField(max_length=200, null=True, blank=True)
    address_line2  = models.CharField(max_length=200, null=True, blank=True)
    city           = models.CharField(max_length=50, null=True, blank=True)
    state          = models.CharField(max_length=50, null=True, blank=True)
    country        = models.CharField(max_length=50, null=True, blank=True)
    token          = models.UUIDField(default=uuid.uuid4, blank=True, null=True)
    pincode        = models.IntegerField(default=None, null=True, blank=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'auth_user_info'
