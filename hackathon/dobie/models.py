from django.db import models

# Create your models here.
from django.db import models
import geocoder
from geopy.distance import great_circle

import uuid

class Users(models.Model):
    facebook_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    name = models.CharField(max_length=400)
    access_token = models.CharField(max_length=400)
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_change = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.name


class Orders(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    publisher = models.ForeignKey(Users, on_delete=models.CASCADE)
    description = models.CharField(max_length=4000)
    category = models.CharField(max_length=200)
    payment = models.FloatField(default=0.0)
    lon = models.FloatField(default=0.0)
    lat = models.FloatField(default=0.0)
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_change = models.DateTimeField(auto_now=True, auto_now_add=False)
    done = models.BooleanField(default=False)
    dist = models.FloatField(default=0.0)
    def distance(self):
        g = geocoder.ip('me')
        return great_circle((self.lat, self.lon), g.latlng).kilometers
    def __str__(self):
        return self.category +" : "+str(self.id)

class Responses(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    responder = models.ForeignKey(Users, on_delete=models.CASCADE)
    message = models.CharField(max_length=4000)
    current = models.BooleanField(default=False)  # True iff this is the dude who will make order, False iff response deleted
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_change = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return str(self.id)

