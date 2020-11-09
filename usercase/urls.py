from django.urls import path

from . import views

app_name='usercase'
urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('registration/', views.NewUser, name='register'),
    
]
