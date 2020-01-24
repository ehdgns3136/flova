from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import User
from .views import user_register, login, get_user_info, follow_user


class UserTests(APITestCase):
    def setUp(self):
        with self.settings(SIGNUP_MODE='OPENED'):
            self.user1 = User.objects.create_user(email='test1@gmail.com', password="wonder1234", name="test1")
            self.token1 = Token.objects.get_or_create(user=self.user1)[0]
            self.user2 = User.objects.create_user(email='test2@gmail.com', password="wonder1234", name="test2")
            self.token2 = Token.objects.get_or_create(user=self.user2)[0]

    def test_signup_when_opened(self):
        with self.settings(SIGNUP_MODE='OPENED'):
            url = reverse(user_register)
            response = self.client.post(url,
                                        {"email": "registertest@gmail.com", "password": "wonder1234", "name": "서희수"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(response.json()['user_name'], "서희수")

            response = self.client.post(url,
                                        {"email": "registertest2@gmail.com", "password": "wonder1234", "name": "서희수"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(response.json()['user_name'], "서희수")

    def test_invalid_register(self):
        with self.settings(SIGNUP_MODE='OPENED'):
            url = reverse(user_register)

            # no email
            response = self.client.post(url, {"password": "wonder1234", "name": "서희수"}, format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

            # no password
            response = self.client.post(url, {"email": "registertest@gmail.com", "name": "서희수"}, format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

            # no name
            response = self.client.post(url, {"email": "registertest@gmail.com", "password": "wonder1234"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

            # invalid email
            response = self.client.post(url, {"email": "registeail.com", "password": "wonder1234", "name": "서희수"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

            # invalid password (shorter than 6)
            response = self.client.post(url, {"email": "registertest@gmail.com", "password": "a4152", "name": "서희수"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

            # invalid password (longer than 16)
            response = self.client.post(url,
                                        {"email": "registertest@gmail.com", "password": "abd123e413b354124",
                                         "name": "서희수"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

            # invalid password (no alphabet)
            response = self.client.post(url, {"email": "registertest@gmail.com", "password": "12341512", "name": "서희수"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

            # invalid password (no number)
            response = self.client.post(url, {"email": "registertest@gmail.com", "password": "abadfewr", "name": "서희수"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

            # invalid password (invalid name)
            response = self.client.post(url,
                                        {"email": "registertest@gmail.com", "password": "abdf2321", "name": "123ghe"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login(self):
        url = reverse(login)
        response = self.client.post(url, {"username": "test1@gmail.com", "password": "wonder1234"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), {'token': self.token1.key, 'user_name': self.user1.name})

    def test_invalid_login(self):
        url = reverse(login)

        # invalid email
        response = self.client.post(url, {"username": "invalid@gmail.com", "password": "wonder1234"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # invalid password
        response = self.client.post(url, {"username": "test1@gmail.com", "password": "31j1k2jjasdl"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # no password
        response = self.client.post(url, {"username": "test1@gmail.com"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_info(self):
        url = reverse(get_user_info)
        response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['name'], self.user1.name)
        self.assertEqual(data['id'], self.user1.id)

    def test_invalid_user_info(self):
        url = reverse(get_user_info)

        # not authenticated
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_follow_or_unfollow(self):
        url = reverse(follow_user, kwargs={'pk': self.user1.id})
        response = self.client.post(url, format='json', HTTP_AUTHORIZATION='Token {}'.format(self.token2.key))
        self.assertEqual(self.user1.followers.all().filter(id=self.user2.id).exists(), True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'is_following': True,
            'follower_num': 1,
        })
        response = self.client.post(url, format='json', HTTP_AUTHORIZATION='Token {}'.format(self.token2.key))
        self.assertEqual(self.user1.followers.all().filter(id=self.user2.id).exists(), False)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            'is_following': False,
            'follower_num': 0,
        })

    def test_user_detail(self):
        url = reverse('user_detail', kwargs={'pk': self.user1.id})
        response = self.client.get(url, format='json', HTTP_AUTHORIZATION='Token {}'.format(self.token2.key))
        self.assertEqual(response.data,
                         {'id': self.user1.id, 'answer_num': 0, 'follower_num': 0, 'following_num': 0, 'name': 'test1',
                          'description': '', 'education': [], 'employment': [], 'text': [], 'string_credentials': [],
                          'profile_image': '', 'is_following': False, 'answer_likes': 0, 'question_num': 0,
                          'topic_num': 0, 'following_question_num': 0, 'bookmark_contents_num': 0})

    def test_signup_when_closed(self):
        with self.settings(SIGNUP_MODE='CLOSED'):
            url = reverse(user_register)
            response = self.client.post(url,
                                        {"email": "registertest@gmail.com", "password": "wonder1234", "name": "서희수"},
                                        format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

