from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone
from .models import UserForm
from django.contrib.auth import authenticate, login
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status
from .forms import LoginForm, RegisterForm
from . import req
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import sched, time
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Customer,Lovely
from .serializer import *
from .forms import LoginForm, RegisterForm
User = get_user_model()
starttime=time.time()
sae=req.slave()
per=req.performance()
nper=req.events()
tags=req.tags()
#print(sae['features'][0]["properties"])

class ArticleView(APIView):
    def get(self, request):
        articles = UserForm.objects.all()
        return Response({"articles": articles})

@api_view(['GET','POST'])
def NewUser(request):
    if request.method != 'POST':
        form = UserCreationForm()
    else:
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            new_user = form.save()
            login(request, new_user)
            return redirect('users:index')
    context = {'form': form}
    return Response({'data:':form})
    #render(request, "usercase/register.html", {"form": form})

def login_view(request):
    form = LoginForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")
        user = authenticate(request, username=username, password=password)
        if user != None:
            # user is valid and active -> is_active
            # request.user == user
            login(request, user)
            return redirect("/")
        else:
            # attempt = request.session.get("attempt") or 0
            # request.session['attempt'] = attempt + 1
            # return redirect("/invalid-password")
            request.session['invalid_user'] = 1 # 1 == True
    return render(request, "usercase/login.html", {"form": form})

@api_view(['GET','POST'])
def customers_list(request):
    """
 List  customers, or create a new customer.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        customers = Customer.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(customers, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CustomerSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/customers/?page=' + str(nextPage), 'prevlink': '/api/customers/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def customers_detail(request, pk):
    """
 Retrieve, update or delete a customer by id/pk.
 """
    try:
        customer = Customer.objects.get(pk=pk)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CustomerSerializer(customer,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CustomerSerializer(customer, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['GET','POST'])
def like_button(request):
    print("allowed")
    if request.method =='POST':
        data=[]
        userid=request.data['userid']
        event=request.data['event_id']
        #print(userid,event,User.objects.all())
        #print(get_object_or_404(User))
        user="sda"
        user=User.objects.get(pk=userid)
        events="wrong event"
        for t in tags:
            #print(t)
            if t['id']==event:
                print(t['id'])
                events=t
        return Response({'user':str(user),'event':events})
    return Response({'user':None,'event':None})

@api_view(['GET','POST'])
def getlist(request):
    return Response({'data': sae})

@api_view(['GET','POST'])
def getperfomances(request):
    return Response({'data':per})
@api_view(['GET','POST'])
def getnotperfomances(request):
    return Response({'data':nper})
