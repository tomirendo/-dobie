from dobie.models import Users, Responses, Orders
import random

def truncate_tables():
    Orders.objects.all().delete()
    Responses.objects.all().delete()

def choose_random_user():
    all_users = list(Users.objects.all())
    return random.choice(all_users)

def write_some_data():
    o1 = Orders(publisher=choose_random_user(), description="Drive my car from the garage.", category="Driving", payment=25, lon=0, lat=0)
    o1.save()
    r1 = Responses(order=o1, responder=choose_random_user(), message="I'm the best driver ever", current=True)
    r1.save()
    o2 = Orders(publisher=choose_random_user(), description="I need help with english lessons", category="Education", payment=40, lon=0, lat=0)
    o2.save()
    o3 = Orders(publisher=choose_random_user(), description="Someone carry my dog when I abroad", category="Animals", payment=15, lon=0, lat=0)
    o3.save()
    o4 = Orders(publisher=choose_random_user(), description="Paint my living room", category="Repairing and Painting", payment=60, lon=0, lat=0)
    o4.save()
    o5 = Orders(publisher=choose_random_user(), description="Clean my garden", category="Cleaning", payment=60, lon=0, lat=0)
    o5.save()
    o6 = Orders(publisher=choose_random_user(), description="Fix my code", category="Other", payment=150, lon=0, lat=0)
    o6.save()

def main():
    truncate_tables()
    write_some_data()

if __name__ == "__main__":
    main()
