# Generated by Django 2.2.1 on 2019-09-07 11:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('incidents', '0008_auto_20190829_1231'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='incident',
            options={'ordering': ('created_date',), 'permissions': (('can_change_assignee', 'Can directly change assignee'), ('can_review_incidents', 'Can review created incidents'), ('can_view_incident_reports', 'Can view inciddent reports'))},
        ),
    ]
