
from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

class Lovely(models.Model):
    user=models.ForeignKey(User,related_name='recs',on_delete=models.CASCADE)
    pub_date = models.DateTimeField('date published',default=timezone.now)
    tags=models.CharField(max_length=100)
