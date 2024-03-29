from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from django.views import generic
from django.utils import timezone
from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework import status, permissions
#from . import req
from django.contrib.auth.models import User
from collections import Counter
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Lovely,Prefer
from .serializer import *
from .tasks import create_recs
from datetime import date
import pymongo
from pymongo import MongoClient
from bson import json_util
import json

connection_string = 'mongodb://username:RooTpasS@mongodb/myFirstDatabase?retryWrites=true&w=majority'
#client = MongoClient(connection_string)

client = MongoClient('172.29.0.1:27018',username='username',password='RooTpasS',authSource='admin')

db = client['db_name']

#today = date.today()
User = get_user_model()
events_collection=db.events
performance_collection=db.performance
all_collection=db.all
tags_collection=db.tags

class ExampleView(APIView):
    permission_classes = [permissions.IsAuthenticated]#only for auth user

    def get(self, request, format=None):
        #print('u')
        if request.method!='POST':
            #print(request.user)
            userid=request.user
            user=User.objects.get(username=userid)
            rec=Prefer.objects.get(user=user)
            v=str(rec.tag1)
            back=str(rec.tag2)
            ass=str(rec.category1)
            billy=str(rec.category1)
            ids=[]
            counter=0
            tags=tags_collection.find_one()
            tags=json.loads(json_util.dumps(tags))
            for i in tags['items']:
                for t in i['tags']:
                    if t==v or t==back:
                        for p in i['categories']:
                            if p==ass or p==billy:
                                print("С",p)
                                counter+=1
                                ids.append(int(i['id']))

            ban=[]
            data=performance_collection.find_one()
            data=json.loads(json_util.dumps(data))
            for i in data['features']:
                if int(i['id']) in ids:
                    ban.append(i)
            print(ban)
            return Response({"type": "FeatureCollection",
            "features":ban})

@api_view(['GET','POST'])#registration on base django model
def NewUser(request):
    if request.method == 'POST':

        data={'user':request.data['username'],'password':request.data['password'],'email':request.data['email']}

        try:
            user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])
            print("user",str(user))
            return Response({'data':"welcome"})
        except:
            return Response({'data':'Error:User exist or something goes wrong!'})
    return Response({'data':"nothing"})
@api_view(['GET','POST'])
def delete_like(request):
    permission_classes = [permissions.IsAuthenticated]
    userid=request.user
    user=User.objects.get(username=userid)
    rec=Lovely.objects.filter(user=user)
    print(rec)
    rec.delete()
    return Response({'data':"you recomendation are clear now!"})
@api_view(['GET','POST'])
def recomendationV2(request):
    if request.method!='POST':
        #print(request.user)
        userid=request.user
        user=User.objects.get(username=userid)
        rec=Lovely.objects.filter(user=user)
        tag=[]
        cat=[]
        for r in rec:
            tag.append(r.tags)
            if r.like!='':
                cat.append(r.like)
        a={}
        for i in tag:
            if i!='новое на сайте':
                if i in a.keys():
                    a[i]+=1
                else:
                    a[i]=1
        b={}
        for i in cat:
            if i in b.keys():
                b[i]+=1
            else:
                b[i]=1


        back,v,ass,billy={'sb':0},{'sa':0},{'nein':0},{'sda':1}
        choo=''
        r=0
        f=1
        c=0
        for i,j in a.items():
            if j>r:

                v=i
                r=j
            elif f<j<=r:
                f=j
                back=i
            elif c<j<=f:
                c=j
                choo=i
        r=0
        f=1
        for i,j in b.items():
            if j>r:
                ass=i
                r=j
            elif f<j<=r:
                f=j
                billy=i
        ids=[]
        counter=0
        for i in tags:
            for t in i['tags']:
                if t==v or t==back or t==choo:
                    for p in i['categories']:
                        if p==ass or p==billy:
                            counter+=1
                            ids.append(int(i['id']))
        ban=[]
        for i in sae['features']:
            if int(i['id']) in ids:
                ban.append(i)
        #print(ban)
        return Response({'data':{"type": "FeatureCollection",
        "features":ban}})
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
        tags=tags_collection.find_one()
        tags=json.loads(json_util.dumps(tags))
        #print(tags)
        for t in tags['items']:
            #print(t,event)
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

        create_recs.delay(userid.username)
        return Response({'user':str(user),'event':events})
    return Response({'user':None,'event':None})
#@api_view(['GET','POST'])

@api_view(['GET','POST'])
def getlist(request):
    data=all_collection.find_one()
    data=json.loads(json_util.dumps(data))
    print(type(data))
    del data['_id']
    return Response({'data': data})

@api_view(['GET','POST'])
def getperfomances(request):
    data=performance_collection.find_one()
    data=json.loads(json_util.dumps(data))
    print(type(data))#only pers
    return Response({'data':data})
@api_view(['GET','POST'])
def getnotperfomances(request):
    data=events_collection.find_one()
    data=json.loads(json_util.dumps(data))
    print(type(data))
    return Response({'data':data})
