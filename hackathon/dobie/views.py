from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from dobie.models import Users, Responses, Orders
import json
# Create your views here.

def facebookLogin(request):
    return HttpResponse(str(request.__dict__))

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


