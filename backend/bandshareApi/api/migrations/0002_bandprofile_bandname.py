# Generated by Django 2.1.1 on 2018-09-17 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bandprofile',
            name='bandName',
            field=models.CharField(default='placeholder', max_length=128),
            preserve_default=False,
        ),
    ]
