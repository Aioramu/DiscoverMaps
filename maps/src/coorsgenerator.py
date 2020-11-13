import json
with open('places.json','r') as file_obj:
    cn=json.loads(str(file_obj.read()))
print(cn[5])
coord=[]
for i in range(len(cn)):
    #print(i)
    if cn[i]['place']!= None:
        if cn[i]['place']['coords'] !=None:
            coord.append((cn[i]['place']['coords']))
    #print(coord)
with open('coords.json','w') as file_obj:
    cn=json.dump(coord,file_obj,ensure_ascii=False)
