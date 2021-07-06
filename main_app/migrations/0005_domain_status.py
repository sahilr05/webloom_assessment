# Generated by Django 3.2.5 on 2021-07-06 10:32
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0004_remove_domain_date_updated"),
    ]

    operations = [
        migrations.AddField(
            model_name="domain",
            name="status",
            field=models.SmallIntegerField(choices=[(1, "UP"), (0, "DOWN")], default=0),
            preserve_default=False,
        ),
    ]
