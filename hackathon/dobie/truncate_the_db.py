from .models import Responses, Orders

Orders.objects.all().delete()
Responses.objects.all().delete()

