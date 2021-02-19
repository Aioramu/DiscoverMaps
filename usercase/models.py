
from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User
# Create your models here.
class Customer(models.Model):
    first_name = models.CharField("First name", max_length=255)
    email = models.EmailField()
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    def __str__(self):
        return self.first_name

class UserForm(models.Model):
    username=models.CharField(max_length=200)
    password=models.CharField(max_length=200)
    def __str__(self):
        return self.username,self.password
class GetStar(models.Model):
    likebutton=models.ManyToManyField(User,blank=True, related_name='favorites')
    def __str__(self):
        return self.likebutton

class Lovely(models.Model):
    user=models.ForeignKey(User,related_name='recs',on_delete=models.CASCADE)
    like=models.CharField(max_length=100)
    tags=models.CharField(max_length=100)
