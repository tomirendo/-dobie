# Generated by Django 2.0.4 on 2018-04-26 16:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dobie', '0004_auto_20180426_1819'),
    ]

    operations = [
        migrations.RenameField(
            model_name='responses',
            old_name='responser',
            new_name='responder',
        ),
    ]
