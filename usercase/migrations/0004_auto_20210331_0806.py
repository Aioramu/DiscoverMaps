# Generated by Django 3.1.7 on 2021-03-31 08:06

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('usercase', '0003_auto_20210226_1106'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lovely',
            name='like',
        ),
        migrations.AddField(
            model_name='lovely',
            name='pub_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 31, 8, 5, 49, 639480, tzinfo=utc), verbose_name='date published'),
        ),
    ]
