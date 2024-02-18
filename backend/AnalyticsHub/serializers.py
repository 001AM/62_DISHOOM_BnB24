from rest_framework import serializers
from .models import WasteGenerated, LabourWork, QualityControlMetrics, Sustainability, CarbonFootprint, OverallRating

class WasteGeneratedSerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteGenerated
        fields = '__all__'

class LabourWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabourWork
        fields = '__all__'

class QualityControlMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualityControlMetrics
        fields = '__all__'

class SustainabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Sustainability
        fields = '__all__'

class CarbonFootprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarbonFootprint
        fields = '__all__'

class OverallRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = OverallRating
        fields = '__all__'

class AnalyticsSerializer(serializers.Serializer):
    waste_generated = WasteGeneratedSerializer(many=True)
    labour_work = LabourWorkSerializer(many=True)
    quality_control_metrics = QualityControlMetricsSerializer(many=True)
    sustainability = SustainabilitySerializer(many=True)
    carbon_footprint = CarbonFootprintSerializer(many=True)
    overall_rating = OverallRatingSerializer(many=True)
