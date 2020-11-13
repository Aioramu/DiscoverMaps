import requests
import time
import json
filename='maps/src/places.json'
time=int(time.time())
def ApiJson(time,filename):
    response=requests.get('https://kudago.com/public-api/v1.4/events/?fields=place,title,address,site_url,coords,categories&location=msk&expand=place&actual_since='+str(time))
    response=response.json()
    with open(filename,mode='w',encoding='utf-8') as file_object:
        json.dump(response,file_object,ensure_ascii=False)
        #file_object.write(str(response.json()))
    Base=AppGen(filename)
    while True:
        with open(filename,'r') as file_object:
            content=json.loads(str(file_object.read()))
            cont=content['next']
        if cont != None:
            get=str(cont)
            response=requests.get(get)
            response=response.json()
            with open(filename,mode='w',encoding='utf-8') as file_object:
                json.dump(response,file_object,ensure_ascii=False)
            Base+=(AppGen(filename))
        else:
            break
    return Base

def AppGen(filename):
    with open(filename,'r') as file_object:
        #content=file_object.read()
        #print(file_object.read())
        content=json.loads(str(file_object.read()))
        cont=content['results']
    return cont #print(content['results'][0]['site_url'])#true type of get element
claim=ApiJson(time,filename)
with open(filename,'w') as file_object:
    json.dump(claim,file_object,ensure_ascii=False)
#includet test on search a real event url
"""
i=0
while i <len(claim):
    #print(claim[i]['site_url'],type(claim[i]['site_url']))
    if claim[i]['site_url']=='https://kudago.com/msk/event/vyistavka-zhivotnyie-na-monetah/':
        print(claim[i]['title'])
    i+=1
    """
