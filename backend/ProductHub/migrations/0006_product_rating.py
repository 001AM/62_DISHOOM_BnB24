# Generated by Django 4.2.10 on 2024-02-17 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProductHub', '0005_rename_seller_id_product_seller'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='rating',
            field=models.IntegerField(blank=True, default='', null=True),
        ),
    ]