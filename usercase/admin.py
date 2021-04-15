from django.contrib import admin

# Register your models here.
from .models import Lovely,Prefer #import the class from models file present in the app
# Register your models here.
admin.site.register(Lovely)
admin.site.register(Prefer)
