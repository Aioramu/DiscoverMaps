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
"""     Documentation json response
    "type": "FeatureCollection",
    "features": [
        {"type": "Feature", "id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}, "properties": {"balloonContentHeader": "
        <font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'>
        </p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter":
        "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка",
         "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
"""
def AppGen(filename):
    with open(filename,'r') as file_object:
        #content=file_object.read()
        #print(file_object.read())
        content=json.loads(str(file_object.read()))
        cont=content['results']
    return cont


def Slave():
    deyn={"type":"FeatureCollection"}#обязательное начало
    #
    deyn['features']=[]

    claim=ApiJson(time,filename)
    print(len(claim))

    for i in range(len(claim)):
        try:
            coor=[claim[i]['place']['coords']['lat'],claim[i]['place']['coords']['lon']]

            st=claim[i]['place']['site_url']
            cl={"type": "Feature", "id": str(i), "geometry":{"type": "Point", "coordinates":coor},"properties":{"balloonContentHeader":"<font size=3><b><a target='_blank' href='"+claim[i]['site_url']+"'>"+claim[i]['title']+"</a></b></font>",
            "balloonContentBody":"<p><a href='"+claim[i]['place']['site_url']+"'>"+claim[i]['place']['title']+"</a></p>"+claim[i]['place']['address']+"<p><p>"+claim[i]['place']['subway']+"</p>","clusterCaption":"<font size=3><b><p target='_blank'>"+claim[i]['title']+"</p></b></font>",
             "hintContent": "<strong>"+claim[i]['place']['address']+"</strong>"}}
            deyn['features'].append(cl)
        except:
            pass
    print(deyn['features'][0]['geometry'],len(deyn['features']))

    with open(filename,'w') as file_object:
        json.dump(deyn,file_object,ensure_ascii=False)
    return deyn
#include test on search a real event url
"""
i=0
while i <len(claim):
    #print(claim[i]['site_url'],type(claim[i]['site_url']))
    if claim[i]['site_url']=='https://kudago.com/msk/event/vyistavka-zhivotnyie-na-monetah/':
        print(claim[i]['title'])
    i+=1
    """
