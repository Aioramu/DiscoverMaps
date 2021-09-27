from usercase.celery import app
from celery import shared_task
from .models import Lovely,Prefer
from django.contrib.auth import get_user_model
app.autodiscover_tasks()
User = get_user_model()

@app.task
def create_recs(userid):

    userid=User.objects.get(username=userid)
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
    for i,j in a.items():#tags
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
    for i,j in b.items():#catagories
        if j>r:
            ass=i
            r=j
        elif f<j<=r:
            f=j
            billy=i
    try:
        Prefer.objects.get(user=user)
    except:
        Prefer.objects.create(user=user)
    like=Prefer.objects.filter(user=user)
    for model in like:
        model.tag1=str(back)
        model.tag2=str(v)
        model.category1=str(ass)
        model.category2=str(billy)
        model.save()

#@shared_task
