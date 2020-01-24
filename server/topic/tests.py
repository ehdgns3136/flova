from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from contents.models import Question, Answer
from user.models import User
from .views import add_topics_to_user
from .models import Topic


class TopicsTests(APITestCase):
    fixtures = ['topic/fixtures/initial_topics.json', ]

    def setUp(self):
        with self.settings(SIGNUP_MODE='OPENED'):
            self.user1 = User.objects.create_user(email='test1@gmail.com', password="wonder1234", name="test1")
            self.user2 = User.objects.create_user(email='test2@gmail.com', password='wonder1234', name='test2')
            self.token1 = Token.objects.get_or_create(user=self.user1)[0]

    def test_get_topic_list(self):
        url = reverse('topic_list')
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.json()
        topic = results[0]
        self.assertEqual(
            'id' in topic and 'title' in topic and 'followed_num' in topic and 'question_num' in topic and 'answer_num' in topic,
            True)

    def test_add_topics_to_user(self):
        url = reverse(add_topics_to_user)
        response = self.client.post(url, [1, 3, 5, 6, 7, 8], format="json",
                                    HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

        user_topic_list = [item.pk for item in self.user1.topics.all()]
        self.assertEqual(sorted(user_topic_list), sorted([1, 3, 5, 6, 7, 8]))

    def test_topic_detail(self):
        url = reverse('topic_detail', kwargs={"pk": 1})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(),
                         {
                             "id": 1,
                             "topic_image": "https://s3.ap-northeast-2.amazonaws.com/flova/topics/startup.jpeg",
                             "title": "스타트업",
                             "followed_num": 0,
                             "description": "스타트업(영어: startup)은 설립한 지 오래되지 않은 신생 벤처기업을 뜻한다. 미국 실리콘밸리에서 생겨난 용어로서, 혁신적 기술과 아이디어를 보유한 설립된 지 얼마되지 않은 창업 기업이다. 자체적인 비즈니스모델을 가지고 있는 작은 그룹이나 프로젝트성 회사이다.",
                             "question_num": 0,
                             "answer_num": 0,
                         })

    def test_topic_detail_is_following(self):
        self.user1.topics.add(Topic.objects.get(id=1))

        url = reverse('topic_detail', kwargs={"pk": 1})
        response = self.client.get(url, format='json', HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(),
                         {
                             "id": 1,
                             "topic_image": "https://s3.ap-northeast-2.amazonaws.com/flova/topics/startup.jpeg",
                             "title": "스타트업",
                             "followed_num": 1,
                             "description": "스타트업(영어: startup)은 설립한 지 오래되지 않은 신생 벤처기업을 뜻한다. 미국 실리콘밸리에서 생겨난 용어로서, 혁신적 기술과 아이디어를 보유한 설립된 지 얼마되지 않은 창업 기업이다. 자체적인 비즈니스모델을 가지고 있는 작은 그룹이나 프로젝트성 회사이다.",
                             "question_num": 0,
                             "answer_num": 0,
                             "is_following": True,
                         })

    def test_topic_popular_questions(self):
        question1 = Question.objects.create(writer=self.user1, title="질문1")
        question2 = Question.objects.create(writer=self.user1, title="질문2")
        question3 = Question.objects.create(writer=self.user1, title="질문3")
        question1.topics.add(Topic.objects.get(id=1))
        question2.topics.add(Topic.objects.get(id=1))
        question3.topics.add(Topic.objects.get(id=1))
        question1.followers.add(self.user2, self.user1)
        question3.followers.add(self.user2)
        url = reverse('topic_popular_questions', kwargs={"pk": 1})
        response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        question_list = response.json()
        self.assertEqual(question_list[0]['content']['question']['id'], question1.id)
        self.assertEqual(question_list[1]['content']['question']['id'], question3.id)
        self.assertEqual(question_list[2]['content']['question']['id'], question2.id)

    def test_topic_questions_to_answer(self):
        question1 = Question.objects.create(writer=self.user1, title="질문1")
        question2 = Question.objects.create(writer=self.user1, title="질문2")
        question3 = Question.objects.create(writer=self.user1, title="질문3")
        question1.topics.add(Topic.objects.get(id=1))
        question2.topics.add(Topic.objects.get(id=1))
        question3.topics.add(Topic.objects.get(id=1))
        question1.answers.create(writer=self.user2, content="하하하")

        url = reverse('topic_questions_to_answer', kwargs={"pk": 1})
        response = self.client.get(url, format="json", HTTP_AUTHORIZATION='Token {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        question_list = response.json()
        self.assertEqual(len(question_list), 2)

    def test_topic_popular_answerers(self):
        question1 = Question.objects.create(writer=self.user1, title="질문1")
        question2 = Question.objects.create(writer=self.user1, title="질문2")
        question3 = Question.objects.create(writer=self.user1, title="질문3")
        question1.topics.add(Topic.objects.get(id=1))
        question2.topics.add(Topic.objects.get(id=1))
        question3.topics.add(Topic.objects.get(id=1))
        answer1 = question1.answers.create(writer=self.user2, content="하하하")
        question1.answers.create(writer=self.user1, content="하하하")
        answer1.liked_users.add(self.user2)

        url = reverse('topic_popular_answerers', kwargs={"pk": 1})
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data[0]["id"], self.user2.id)
        self.assertEqual(data[1]["id"], self.user1.id)

    def test_topic_follow_or_unfollow(self):
        topic1 = Topic.objects.get(id=1)
        self.assertEqual(topic1.followers.all().filter(id=self.user1.id).exists(), False)
        topic1.follow_or_unfollow(self.user1)
        self.assertEqual(topic1.followers.all().filter(id=self.user1.id).exists(), True)
        topic1.follow_or_unfollow(self.user1)
        self.assertEqual(topic1.followers.all().filter(id=self.user1.id).exists(), False)
