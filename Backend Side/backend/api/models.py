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
    CATEGORY_CHOICES = [
        ('Electronic', 'Electronic'),
        ('Accessories', 'Accessories'),
        ('Transportation Card', 'Transportation Card'),
        ('ID Card', 'ID Card'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Other')
    color = models.CharField(max_length=30, blank=True, null=True)
    location = models.CharField(max_length=255)
    date = models.DateField()
    image = models.ImageField(upload_to='media/lost_items/', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lost_items')

    objects = LostItemManager() 

    def __str__(self):
        return f"Lost {self.name} reported by {self.user.email}"

class FoundItem(models.Model):
    CATEGORY_CHOICES = [
        ('Electronic', 'Electronic'),
        ('Accessories', 'Accessories'),
        ('Transportation Card', 'Transportation Card'),
        ('ID Card', 'ID Card'),
        ('Other', 'Other'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Other')
    color = models.CharField(max_length=30, blank=True, null=True)
    location = models.CharField(max_length=255)
    date = models.DateField()
    image = models.ImageField(upload_to='media/found_items/', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='found_items')

    def __str__(self):
        return f"Found {self.name} reported by {self.user.email}"
    
class MatchItem(models.Model):
    lost_item = models.ForeignKey(LostItem, on_delete=models.CASCADE)
    found_item = models.ForeignKey(FoundItem, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('lost_item', 'found_item')

