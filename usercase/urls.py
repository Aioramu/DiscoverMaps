from django.urls import path
from django.conf.urls import url
from . import views

app_name='usercase'
urlpatterns = [
    #path('login/', views.login_view, name='login'),
    #path('registration/', views.NewUser, name='register'),
    url(r'^api/reg/$',views.NewUser,name='regs'),
    url(r'^api/reccomended/$',views.reclist,name='rec'),
    url(r'^api/like/$',views.like_button, name='like'),
    url(r'^api/item/$', views.getlist),
    url(r'^api/events/$', views.getnotperfomances),
    url(r'^api/performance/$', views.getperfomances),
]
