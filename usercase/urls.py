from django.urls import path
from django.conf.urls import url
from . import views
from .views import ArticleView
app_name='usercase'
urlpatterns = [
    #path('login/', views.login_view, name='login'),
    #path('registration/', views.NewUser, name='register'),
    path('articles/', ArticleView.as_view()),
    url(r'^$',views.like_button, name='like'),
    url(r'^api/customers/$', views.customers_list),
    url(r'^api/customers/(?P<pk>[0-9]+)$', views.customers_detail),
    url(r'^api/item/$', views.getlist),
]
