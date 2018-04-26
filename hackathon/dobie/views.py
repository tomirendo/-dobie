from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from dobie.models import Users, Responses, Orders
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
    return HttpResponse(json.dumps({'error' : False}))

def getOrders(request):
    dict = {}
    for order in Orders.objects.all():
        dict[order.id] = {"id" : order.id, "publisher id" : order.publisher.facebook_id, "description" : order.description,
                          "category" : order.category, "payment" : order.payment, "creation: " : order.create_date,
                          "last change" : order.last_change, "done" : order.done}
    return JsonResponse(dict)

def createUser(request):
    r = request.GET['session_id']
    return HttpResponse(request.GET['session_id'])


