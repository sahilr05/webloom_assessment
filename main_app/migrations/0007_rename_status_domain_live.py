# Generated by Django 3.2.5 on 2021-07-06 11:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0006_alter_domain_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='domain',
            old_name='status',
            new_name='live',
        ),
    ]
