from urllib import request 
from json import loads

class UserInfo:
    def __init__(self, json_data):
        self._json_data = json_data
        self.first_name = json_data['first_name']
        self.last_name = json_data['last_name']
        self.full_name = json_data['name']
        self.facebook_id = json_data['id']

GET_USER_INFO_URL = 'https://graph.facebook.com/me?fields=about,first_name,last_name,middle_name,name&access_token={}'


def get_user_info(access_token):
    url = GET_USER_INFO_URL.format(access_token)
    data = request.urlopen(url)
    parsed_data = loads(data.read().decode())
    return UserInfo(parsed_data)










