from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from .models import WasteGenerated, LabourWork, QualityControlMetrics, Sustainability, CarbonFootprint, OverallRating
from .serializers import WasteGeneratedSerializer, LabourWorkSerializer, QualityControlMetricsSerializer, SustainabilitySerializer, CarbonFootprintSerializer, OverallRatingSerializer, AnalyticsSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def analytics_view(request):
    # Deserialize the request data
    serializer = AnalyticsSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Save the analytics data
    try:
        # Save waste generated data
        waste_generated_data = serializer.validated_data.get('waste_generated')
        WasteGenerated.objects.bulk_create([WasteGenerated(**item) for item in waste_generated_data])

        # Save labour work data
        labour_work_data = serializer.validated_data.get('labour_work')
        LabourWork.objects.bulk_create([LabourWork(**item) for item in labour_work_data])

        # Save quality control metrics data
        quality_control_metrics_data = serializer.validated_data.get('quality_control_metrics')
        QualityControlMetrics.objects.bulk_create([QualityControlMetrics(**item) for item in quality_control_metrics_data])

        # Save sustainability data
        sustainability_data = serializer.validated_data.get('sustainability')
        Sustainability.objects.bulk_create([Sustainability(**item) for item in sustainability_data])

        # Save carbon footprint data
        carbon_footprint_data = serializer.validated_data.get('carbon_footprint')
        CarbonFootprint.objects.bulk_create([CarbonFootprint(**item) for item in carbon_footprint_data])

        # Save overall rating data
        overall_rating_data = serializer.validated_data.get('overall_rating')
        OverallRating.objects.bulk_create([OverallRating(**item) for item in overall_rating_data])

        return Response({"message": "Analytics data created successfully."}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def get_analytics_view(request, product_id):
    # Retrieve analytics data for the product
    if request.method == 'GET':
        try:
            waste_generated = WasteGenerated.objects.filter(product_id=product_id)
            labour_work = LabourWork.objects.filter(product_id=product_id)
            quality_control_metrics = QualityControlMetrics.objects.filter(product_id=product_id)
            sustainability = Sustainability.objects.filter(product_id=product_id)
            carbon_footprint = CarbonFootprint.objects.filter(product_id=product_id)
            overall_rating = OverallRating.objects.filter(product_id=product_id)

            # Serialize the data
            serializer = AnalyticsSerializer({
                'waste_generated': waste_generated,
                'labour_work': labour_work,
                'quality_control_metrics': quality_control_metrics,
                'sustainability': sustainability,
                'carbon_footprint': carbon_footprint,
                'overall_rating': overall_rating
            })

            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
