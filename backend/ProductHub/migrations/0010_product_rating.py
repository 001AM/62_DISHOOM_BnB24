# Generated by Django 4.2.10 on 2024-02-17 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProductHub', '0009_remove_product_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='rating',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
