import requests
import time
time=int(time.time())
response=requests.get('https://kudago.com/public-api/v1.4/events/?fields=title,address,site_url,coords,categories,tags&location=msk&actual_since='+str(time))
filename='places.json'
with open(filename,'w') as file_object:
    file_object.write(str(response.json()))
i=1
while i<100:

    i+=1
    get='https://kudago.com/public-api/v1.4/events/?fields=title,address,site_url,coords,categories,&location=msk&actual_since='+str(time)+'&page='+str(i)
    response=requests.get(get)
    with open(filename,'a') as file_object:
        file_object.write(str(response.json()))
