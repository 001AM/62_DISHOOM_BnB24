# Generated by Django 4.2.10 on 2024-02-17 19:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ProductHub', '0008_alter_product_rating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='rating',
        ),
    ]
