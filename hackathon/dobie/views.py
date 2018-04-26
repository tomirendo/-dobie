from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from dobie.models import Users, Responses, Orders
import geocoder
import json
from facebook_api import facebook_api
from datetime import datetime

# Create your views here.

def facebookLogin(request):
    access_token = request.GET['access_token']
    user_info = facebook_api.get_user_info(access_token)
    query = Users.objects.filter(facebook_id= user_info.facebook_id)
    if query:
        user = query[0]
        user.first_name = user_info.first_name
        user.last_name = user_info.last_name
        user.access_token = access_token
        user.last_change = datetime.now()
    else : 
        user = Users(first_name = user_info.first_name,
           last_name = user_info.last_name,
           name = user_info.full_name,
           access_token = access_token,
           facebook_id = user_info.facebook_id,
           create_date = datetime.now(),
           last_change = datetime.now())
    user.save()
    return HttpResponse(json.dumps({'error' : False, 'facebook_id' : user_info.facebook_id}))

def getOrders(request):
    dict = {}
    for order in Orders.objects.all():
        dict[order.id] = {"id" : order.id, "publisher id" : order.publisher.facebook_id,
                          "description" : order.description, "category" : order.category, "payment" : order.payment,
                          "longitude" : order.lon, "latitude" : order.lat, "creation: " : order.create_date,
                          "last change" : order.last_change, "done" : order.done}
    return JsonResponse(dict)

def createOrder(request):
    # g = geocoder.ip(location)
    o1 = Orders(description=request.GET['description'],category=request.GET['category'],payment=request.GET['payment'],
                lat = 0.0, lon = 0.0, publisher_id="1111111")
    o1.save()
    return HttpResponse()

