from django.db import models

from django.contrib.auth.models import AbstractUser

from django.utils import timezone
from datetime import timedelta

class LostItemManager(models.Manager):
    def recent_lost_items(self):
        one_week_ago = timezone.now().date() - timedelta(days=7)
        return self.filter(date__gte=one_week_ago)


class User(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    
class LostItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    date = models.DateField()
    image = models.ImageField(upload_to='lost_items/', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lost_items')

    objects = LostItemManager() 

class FoundItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    date = models.DateField()
    image = models.ImageField(upload_to='found_items/', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='found_items')
    
class MatchItem(models.Model):
    lost_item = models.ForeignKey(LostItem, on_delete=models.CASCADE)
    found_item = models.ForeignKey(FoundItem, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

