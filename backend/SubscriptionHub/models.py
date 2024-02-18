from django.db import models
from django.contrib.auth.models import User

class SubscriptionDetails(models.Model):
    email = models.EmailField(blank=True, null=True)
    is_user = models.BooleanField(default=False,blank=True,null=True)

    class Meta:
        db_table ='subscription_details'