from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from dobie.models import Users, Responses, Orders
import geocoder
import json
# Create your views here.


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
