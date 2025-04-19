# Generated by Django 5.2 on 2025-04-19 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='lostitem',
            name='category',
            field=models.CharField(choices=[('Electronic', 'Electronic'), ('Accessories', 'Accessories'), ('Transportation Card', 'Transportation Card'), ('ID Card', 'ID Card'), ('Other', 'Other')], default='Other', max_length=50),
        ),
        migrations.AddField(
            model_name='lostitem',
            name='color',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='matchitem',
            unique_together={('lost_item', 'found_item')},
        ),
    ]
