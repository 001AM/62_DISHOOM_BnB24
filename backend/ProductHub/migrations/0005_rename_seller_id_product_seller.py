# Generated by Django 4.2.10 on 2024-02-17 19:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ProductHub', '0004_alter_product_seller_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='seller_id',
            new_name='seller',
        ),
    ]
