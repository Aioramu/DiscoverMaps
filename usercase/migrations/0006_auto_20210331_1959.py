# Generated by Django 3.1.7 on 2021-03-31 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usercase', '0005_auto_20210331_0826'),
    ]

    operations = [
        migrations.AddField(
            model_name='lovely',
            name='like',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='lovely',
            name='tags',
            field=models.CharField(default='', max_length=100),
        ),
    ]
