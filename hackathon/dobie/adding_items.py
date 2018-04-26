import unittest
from dobie.models import  Users, Orders, Responses
from django.utils import timezone

usertest1 =  Users(facebook_id=1111111, first_name="aaa", last_name="aaa", name="aaa aaa", access_token="aaa")


class MyTestCase(unittest.TestCase):
    def test_something(self):
        self.assertEqual(True, False)


if __name__ == '__main__':
    unittest.main()
