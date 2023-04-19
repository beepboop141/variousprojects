'''
The following code is for finding out who you follow that doesn't follow you back on Instagram- is this good for your mental health? Probably not.
Nevertheless, to run it: 
go to Instagram- settings- privacy and security- download data in json format 
wait for an hourish? for the email to come 
create a new folder and put in the followers and following_1.json 
go to the same directory as that folder and run this script
tadaaaaa!!! 
'''
import json 

with open('following.json') as f:
    data1 = json.load(f)

with open('followers_1.json') as f2:
    data2 = json.load(f2)

arr1 = [item["string_list_data"][0]["value"] for item in data1["relationships_following"]]
arr2 = [item["string_list_data"][0]["value"] for item in data2]

result = set(arr1) - set(arr2) #Difference in two arrays

for item in result:
    print(item)
