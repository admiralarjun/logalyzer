# Generated by Django 3.2.13 on 2023-12-14 17:07

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20231214_1240'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile_pic',
            name='name',
            field=models.CharField(default=django.utils.timezone.now, max_length=200),
            preserve_default=False,
        ),
    ]
