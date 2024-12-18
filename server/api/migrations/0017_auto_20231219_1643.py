# Generated by Django 3.2.13 on 2023-12-19 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_crpf_device_agent_repo_access_key'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Default', max_length=255, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='profile_pic',
            name='skills',
            field=models.ManyToManyField(to='api.Category'),
        ),
    ]
