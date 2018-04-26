from django.db import models

# Create your models here.
from django.db import models


class Users(models.model):
    facebook_id = models.IntegerField()
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    name = models.CharField(max_length=400)
    access_token = models.CharField(max_length=400)
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_change = models.DateTimeField(auto_now=True, auto_now_add=False)


class Orders(models.model):
    id = models.IntegerField()
    publisher = models.ForeignKey(Users, on_delete=models.CASCADE)
    description = models.CharField(max_length=4000)
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_change = models.DateTimeField(auto_now=True, auto_now_add=False)


class Responses(models.model):
    id = models.IntegerField()
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    responser = models.ForeignKey(Users, on_delete=models.CASCADE)
    message = models.CharField(max_length=4000)
    current = models.BooleanField()  # True iff this is the dude who will make order, False iff response deleted
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_change = models.DateTimeField(auto_now=True, auto_now_add=False)