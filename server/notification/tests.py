from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.authtoken.models import Token
from user.models import User
from contents.models import Question, Answer
from .models import Notification, NewAnswerOnQuestionNotification, FollowYouNotification
from .views import get_unread_notification_count, update_last_notification_check


class NewAnswerOnQuestionNotificationSignalTests(TestCase):
    def setUp(self):
        with self.settings(SIGNUP_MODE='OPENED'):
            self.user1 = User.objects.create_user(email='test1@gmail.com', password="wonder1234", name="test1")
            self.token1 = Token.objects.get_or_create(user=self.user1)[0]

            self.user2 = User.objects.create_user(email='test2@gmail.com', password="wonder1234", name="test2")
            self.token2 = Token.objects.get_or_create(user=self.user2)[0]

            self.user3 = User.objects.create_user(email='test3@gmail.com', password="wonder1234", name="test3")
            self.token3 = Token.objects.get_or_create(user=self.user3)[0]

            self.question1 = Question.objects.create(content='테스트 질문 추가 내용입니다.', title='테스트 질문입니다.',
                                                     writer=self.user1)

    # create 1 answer for question1
    def test_new_answer_on_question_notification_create(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            self.answer1 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user2)

            notification = NewAnswerOnQuestionNotification.objects.filter(question=self.question1,
                                                                          receiver=self.user1).first()

            self.assertNotEqual(notification, None)

            self.assertEqual(notification.writers.all().filter(id=self.user2.id).exists(), True)
            self.assertEqual(notification.writers.all().count(), 1)

    # create 2 answers for question1
    def test_new_answer_on_question_notification_aggregate(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            self.answer1 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user2)
            self.answer2 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user3)

            notification = NewAnswerOnQuestionNotification.objects.filter(question=self.question1,
                                                                          receiver=self.user1).first()

            self.assertNotEqual(notification, None)

            self.assertEqual(notification.writers.all().filter(id=self.user3.id).exists(), True)
            self.assertEqual(notification.writers.all().count(), 2)


class FollowYouNotificationSignalTests(TestCase):
    def setUp(self):
        with self.settings(SIGNUP_MODE='OPENED'):
            self.user1 = User.objects.create_user(email='test1@gmail.com', password="wonder1234", name="test1")
            self.token1 = Token.objects.get_or_create(user=self.user1)[0]

            self.user2 = User.objects.create_user(email='test2@gmail.com', password="wonder1234", name="test2")
            self.token2 = Token.objects.get_or_create(user=self.user2)[0]

            self.user3 = User.objects.create_user(email='test3@gmail.com', password="wonder1234", name="test3")
            self.token3 = Token.objects.get_or_create(user=self.user3)[0]

            self.question1 = Question.objects.create(content='테스트 질문 추가 내용입니다.', title='테스트 질문입니다.',
                                                     writer=self.user1)

    def test_new_follower_on_user_notification_create(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            self.user1.follow_or_unfollow(self.user2)
            notification = FollowYouNotification.objects.filter(receiver=self.user2).first()

            self.assertNotEqual(notification, None)

            self.assertEqual(notification.followers.all().filter(id=self.user1.id).exists(), True)
            self.assertEqual(notification.followers.all().count(), 1)

            self.user1.followers.add(self.user2)
            notification = FollowYouNotification.objects.filter(receiver=self.user1).first()

            self.assertNotEqual(notification, None)

            self.assertEqual(notification.followers.all().filter(id=self.user2.id).exists(), True)
            self.assertEqual(notification.followers.all().count(), 1)

    def test_new_follower_on_user_notification_aggregate(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            self.user2.follow_or_unfollow(self.user1)
            self.user3.follow_or_unfollow(self.user1)
            notifications = FollowYouNotification.objects.filter(receiver=self.user1)

            self.assertEqual(notifications.count(), 1)

            notification = notifications.first()

            self.assertEqual(notification.followers.all().filter(id=self.user2.id).exists(), True)
            self.assertEqual(notification.followers.all().filter(id=self.user3.id).exists(), True)
            self.assertEqual(notification.followers.all().count(), 2)


class NotificationAPITests(APITestCase):
    def setUp(self):
        with self.settings(SIGNUP_MODE='OPENED'):
            self.user1 = User.objects.create_user(email='test1@gmail.com', password="wonder1234", name="test1")
            self.token1 = Token.objects.get_or_create(user=self.user1)[0]

            self.user2 = User.objects.create_user(email='test2@gmail.com', password="wonder1234", name="test2")
            self.token2 = Token.objects.get_or_create(user=self.user2)[0]

            self.user3 = User.objects.create_user(email='test3@gmail.com', password="wonder1234", name="test3")
            self.token3 = Token.objects.get_or_create(user=self.user3)[0]

            self.user4 = User.objects.create_user(email='test4@gmail.com', password="wonder1234", name="test4")
            self.token4 = Token.objects.get_or_create(user=self.user4)[0]

            self.question1 = Question.objects.create(content='테스트 질문 추가 내용입니다.', title='테스트 질문입니다.',
                                                     writer=self.user1)

    # create 2 answers for question1 and 1 answer for question2
    def test_get_unread_notification_count(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            # create answer
            self.answer1_1 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user2)

            # check if unread_count is 1
            url = reverse(get_unread_notification_count)
            response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.json(), {'unread_count': 1})

            # create answer again
            self.answer1_2 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user3)

            # check if unread_count is 1
            url = reverse(get_unread_notification_count)
            response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.json(), {'unread_count': 1})

            # create new question
            self.question2 = Question.objects.create(content='테스트 질문 추가 내용2입니다.', title='테스트 질문2입니다.',
                                                     writer=self.user1)

            # new answer on new question
            self.answer2_1 = Answer.objects.create(question=self.question2, content='답변 내용2입니다', writer=self.user2)

            # check if unread_count is 2
            url = reverse(get_unread_notification_count)
            response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.json(), {'unread_count': 2})

    def test_update_last_notification_check(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            # create 2 answers
            self.answer1_1 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user2)
            self.answer1_2 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user3)

            # check if unread_count is 1
            url = reverse(get_unread_notification_count)
            response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.json(), {'unread_count': 1})

            # update last notification check
            url = reverse(update_last_notification_check)
            response = self.client.post(url, data={'time': timezone.now()}, format="json",
                                        HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            # check if unread_count is 0
            url = reverse(get_unread_notification_count)
            response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.json(), {'unread_count': 0})

            # create new answer
            self.answer1_2 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user4)

            # check if unread_count is 1
            url = reverse(get_unread_notification_count)
            response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.json(), {'unread_count': 1})

    # create 1 answer for question1
    def test_invalid_get_unread_notification_count(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            self.answer1 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user2)

            # without token
            url = reverse(get_unread_notification_count)
            response = self.client.get(url, format="json")

            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # create 2 answers for question1 and 1 answer for question2
    def test_notification_list(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            self.answer1_1 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user2)
            self.answer1_2 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user3)

            self.question2 = Question.objects.create(content='테스트 질문 추가 내용2입니다.', title='테스트 질문2입니다.',
                                                     writer=self.user1)

            self.answer2_1 = Answer.objects.create(question=self.question2, content='답변 내용2입니다', writer=self.user2)

            url = reverse('notification list')
            response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))

            self.assertEqual(response.status_code, status.HTTP_200_OK)

            # checking response data
            response_data = response.json()

            self.assertIn('next', response_data)
            self.assertIn('previous', response_data)
            self.assertIn('results', response_data)

            results = response.json()['results']

            self.assertEqual(len(results), 2)

            self.assertEqual(results[0]['read'], False)
            self.assertEqual(results[0]['question']['title'], '테스트 질문2입니다.')
            self.assertEqual(results[0]['writer_count'], 1)
            self.assertEqual(results[0]['recent_writer']['name'], 'test2')

            self.assertEqual(results[1]['read'], False)
            self.assertEqual(results[1]['question']['title'], '테스트 질문입니다.')
            self.assertEqual(results[1]['recent_writer']['name'], 'test3')

    # create 1 answer for question1
    def test_invalid_notification_list(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            self.answer1_1 = Answer.objects.create(question=self.question1, content='답변 내용입니다', writer=self.user2)

            # without token
            url = reverse('notification list')
            response = self.client.get(url, format="json")

            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
