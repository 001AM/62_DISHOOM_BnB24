# Generated by Django 4.2.10 on 2024-02-17 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProductHub', '0006_product_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='rating',
            field=models.IntegerField(blank=True, default='0', null=True),
        ),
    ]