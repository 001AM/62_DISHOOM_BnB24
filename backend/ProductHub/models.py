from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=True, null=True)
    description = models.TextField(blank=True, null=True) 
    rating = models.PositiveIntegerField(null=True, blank=True)
    
    class Meta:
        db_table ='product_info'

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    product_image = models.ImageField(upload_to='ProductImages/',blank=True, null=True)

    class Meta:
        db_table ='product_images'