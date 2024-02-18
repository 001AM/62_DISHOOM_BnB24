from django.db import models
from ProductHub.models import Product
from django.contrib.auth.models import User

class Comment(models.Model):
    user        = models.ForeignKey(User,on_delete=models.CASCADE)
    product     = models.ForeignKey(Product, on_delete=models.CASCADE)
    comment     = models.CharField(max_length=255, blank=True, null=True)
    rating      = models.PositiveIntegerField( null=True, blank=True)

    class Meta:
        db_table = 'comments'
