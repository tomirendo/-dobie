from django.contrib import admin

from .models import Users, Responses, Orders

admin.site.register(Users)
admin.site.register(Responses)
admin.site.register(Orders)