from django.contrib import admin

# Register your models here.
from .models import GetStar,UserForm,Customer #import the class from models file present in the app
# Register your models here.
admin.site.register(GetStar)
admin.site.register(UserForm)
admin.site.register(Customer)
