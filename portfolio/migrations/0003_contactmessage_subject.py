# Generated by Django 5.2 on 2025-04-30 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_contactmessage_experience_skill_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactmessage',
            name='subject',
            field=models.CharField(default='Sans objet', max_length=200),
        ),
    ]
