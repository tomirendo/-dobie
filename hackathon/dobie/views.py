from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from dobie.models import Users, Responses, Orders
import geocoder
import json
from facebook_api import facebook_api
from datetime import datetime
from geopy.distance import great_circle

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
    result = iterateOrders(Orders.objects.all())
    return JsonResponse({'error' : False , 'data' : result})

def iterateOrders(orderList):
    result = []
    for order in orderList:
        result.append({"id" : order.id, "publisher id" : order.publisher.facebook_id,
                          "description" : order.description, "category" : order.category, "payment" : order.payment,
                          "longitude" : order.lon, "latitude" : order.lat, "creation: " : order.create_date,
                          "last change" : order.last_change, "done" : order.done})
    return result

def getResponses(request):
    result = []
    for response in Responses.objects.all():
        result.append({"id" : response.id, "order id" : response.order.id, "responder id" : response.responder.facebook_id,
                        "message" : response.message, "current: " : response.current,
                        "creation: " : response.create_date, "last change" : response.last_change})
    return JsonResponse({'error' : False , 'data' : result})

def createOrder(request):
    try:
        g = geocoder.google(request.GET['location'])
    except TypeError:
        return HttpResponse("Location is not valid.")
    code = request.GET['access_token']
    u = get_user_from_code(code)
    if (u==None):
        return HttpResponse("User is not valid.")
    o1 = Orders(description=request.GET['description'],category=request.GET['category'],payment=request.GET['payment'],
                lat = g.latlng[0], lon = g.latlng[1], publisher_id=u.facebook_id)
    o1.save()
    return HttpResponse("Order created!")

def createResponse(request):
    code = request.GET['access_token']
    o_id = request.GET['order_id']
    o = get_order_from_id(int(o_id))
    u = get_user_from_code(code)
    if (u == None):
        return HttpResponse("User is not valid.")
    if(o == None):
        return HttpResponse("Order is not valid.")
    r1 = Responses(order=o,responder=u,message=request.GET['message'])
    r1.save()
    return HttpResponse("Request sent!")

def sortByDate(request):
    try:
        cat = request.GET['category']
    except:
        cat = None
    if cat == None:
        unfilled = Orders.objects.filter(done=False).order_by('last_change')
    else:
        unfilled = Orders.objects.filter(done=False).filter(category=cat).order_by('last_change')
    result = iterateOrders(unfilled)
    return JsonResponse({'error': False, 'data': result})

def sortByLocation(request):
    try:
        cat = request.GET['category']
    except:
        cat = None
    if cat == None:
        unfilled = Orders.objects.filter(done=False)
        sorted(unfilled,key=distance)
    else:
        unfilled = Orders.objects.filter(done=False).filter(category=cat)
        sorted(unfilled, key=distance)
    result = iterateOrders(unfilled)
    return JsonResponse({'error': False, 'data': result})

def distance(order):
    g = geocoder.google('me')
    return great_circle((order.lat,order.lon), g.latlng).kilometers


def get_user_from_code(code):
    u=None
    for user in Users.objects.all():
        if user.access_token == code:
             u = user
    return u

def get_order_from_id(id):
    o=None
    for order in Orders.objects.all():
        print(order.id)
        if order.id == id:
             o = order
    return o


