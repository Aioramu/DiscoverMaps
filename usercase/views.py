from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from django.views import generic
from django.utils import timezone
from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status, permissions
from . import req
from django.contrib.auth.models import User
from collections import Counter
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import sched, time
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Lovely
from .serializer import *

User = get_user_model()

nper={"none":"none"}
sae={"none":"none"}
per={"none":"none"}
tags={"none":"none"}
def Pivo():#need server timer!
    print("chooo")
    global nper,per,sae,tags
    sae=req.slave()
    per=req.performance()
    nper=req.events()
    tags=req.tags()
Pivo()




class ExampleView(APIView):
    permission_classes = [permissions.IsAuthenticated]#only for auth user

    def get(self, request, format=None):
        print('u')
        if request.method!='POST':
            print(request.user)
            userid=request.user
            user=User.objects.get(username=userid)
            rec=Lovely.objects.filter(user=user)
            tag=[]
            cat=[]
            for r in rec:
                tag.append(r.tags)
                if r.like!='':
                    cat.append(r.like)
            a=dict((x, tag.count(x)) for x in set(tag) if tag.count(x) > 1)
            b=dict((x, cat.count(x)) for x in set(cat) if cat.count(x) > 1)
            back,v,ass={'sb':0},{'sa':0},{'nein':0}
            for i,j in a.items():
                с=0
                f=1
                if j>с:
                    v=i
                    с=j
                elif f<j<=c:
                    f=j
                    back=i
            for i,j in b.items():
                с=0
                if j>с:
                    ass=i
                    с=j
            ids=[]
            for i in tags:
                for t in i['tags']:
                    if t==v or i==back:
                        for p in i['categories']:
                            if p==ass:
                                ids.append(int(i['id']))
            ban=[]
            for i in sae['features']:
                if int(i['id']) in ids:
                    ban.append(i)

            return Response({'data':{"type": "FeatureCollection",
            "features":ban}})

@api_view(['GET','POST'])#registration on base django model
def NewUser(request):
    if request.method == 'POST':

        data={'user':request.data['username'],'password':request.data['password'],'email':request.data['email']}

        try:
            user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])
            print(user)
            return Response({'data':user})
        except:
            return Response({'data':'error 404'})
    return Response({'data':"nothing"})
@api_view(['GET','POST'])
def like_button(request):#request to lie button
    #print("allowed")
    permission_classes = [permissions.IsAuthenticated]
    if request.method =='POST':
        data=[]
        userid=request.user#based on user token
        #print(request.data)
        event=request.data['event_id']#comes from post request body
        like=Lovely.objects.all()
        #print(userid,event,User.objects.all())
        #print(get_object_or_404(User))
        user="sda"
        user=User.objects.get(username=userid)
        events="wrong event"
        for t in tags:
            if t['id']==event:
                #print(t['id'],t['tags'],t['categories'])
                for i in t['tags']:
                    if i==t['tags'][0]:
                        like.create(user=user,like=t['categories'][0],tags=i)
                    else:
                        try:
                            like.create(user=user,like=t['categories'][1],tags=i)
                        except:
                            like.create(user=user,tags=i)
                events=t
        return Response({'user':str(user),'event':events})
    return Response({'user':None,'event':None})
#@api_view(['GET','POST'])

@api_view(['GET','POST'])
def getlist(request):
    return Response({'data': sae})

@api_view(['GET','POST'])
def getperfomances(request):
    return Response({'data':per})
@api_view(['GET','POST'])
def getnotperfomances(request):
    return Response({'data':nper})
