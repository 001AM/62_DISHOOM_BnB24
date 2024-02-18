from django.db import models
from django.contrib.auth.models import User
from ProductHub.models import Product

class WasteGenerated(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)  # Seller associated with the waste entry
    quantity = models.DecimalField(max_digits=10, decimal_places=2)  # Quantity of waste generated
    unit = models.CharField(max_length=50, null=True, blank=True)  # Unit of measurement (e.g., kg, tons)
    month = models.DateField(null=True, blank=True)
    year = models.DateField(null=True, blank=True)

    class Meta:
        db_table = 'AnalyticsHub_waste_generated'

class LabourWork(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)  # Seller associated with the labor work entry
    hours = models.DecimalField(max_digits=5, decimal_places=2)  # Number of labor hours
    description = models.TextField(null=True, blank=True)  # Description of the labor work
    labour = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'AnalyticsHub_labour_work'

class QualityControlMetrics(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)  # Seller associated with the quality control metrics
    metric_name = models.CharField(max_length=100, null=True, blank=True)  # Name of the quality control metric

    class Meta:
        db_table = 'AnalyticsHub_quality_control_metrics'

class Sustainability(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)  # Seller associated with the sustainability entry
    sustainability_description = models.TextField(null=True, blank=True)  # Description of sustainability efforts

    class Meta:
        db_table = 'AnalyticsHub_sustainability'

class CarbonFootprint(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    seller = models.ForeignKey('auth.User', on_delete=models.CASCADE)  # Seller associated with the carbon footprint entry
    carbon_footprint = models.DecimalField(max_digits=10, decimal_places=2)  # Carbon footprint value
    unit = models.CharField(max_length=50, null=True, blank=True)  # Unit of measurement (e.g., kgCO2)

    class Meta:
        db_table = 'AnalyticsHub_carbon_footprint'

class OverallRating(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)  # Seller associated with the overall rating
    rating = models.FloatField()  # Overall rating (e.g., average of all ratings)
    num_reviews = models.PositiveIntegerField()  # Number of reviews contributing to the rating

    class Meta:
        db_table = 'AnalyticsHub_overall_rating'