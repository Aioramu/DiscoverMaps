
from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

class Lovely(models.Model):
    user=models.ForeignKey(User,related_name='recs',on_delete=models.CASCADE)
    pub_date = models.DateTimeField('date published',default=timezone.now)
    like=models.CharField(max_length=100,default="")
    tags=models.CharField(max_length=100,default="")


class Prefer(models.Model):
    user=models.ForeignKey(User,related_name='pref',on_delete=models.CASCADE)
    tag1=models.CharField(max_length=100,default="")
    tag2=models.CharField(max_length=100,default="")
    category1=models.CharField(max_length=100,default="")
    category2=models.CharField(max_length=100,default="")
