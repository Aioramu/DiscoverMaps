
from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User
# Create your models here.

class Lovely(models.Model):
    user=models.ForeignKey(User,related_name='recs',on_delete=models.CASCADE)
    like=models.CharField(max_length=100)
    tags=models.CharField(max_length=100)
