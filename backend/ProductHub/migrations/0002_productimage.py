# Generated by Django 4.2.10 on 2024-02-17 18:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ProductHub', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_image', models.ImageField(blank=True, null=True, upload_to='ProductImages/')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ProductHub.product')),
            ],
            options={
                'db_table': 'product_images',
            },
        ),
    ]
