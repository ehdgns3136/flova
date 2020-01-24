from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from user.models import User
from .models import Question, QuestionBookmark, AnswerBookmark
from user.serializers import UserInfoSerializer


class ContentsTests(APITestCase):
    def setUp(self):
        with self.settings(SIGNUP_MODE='OPENED'):
            self.user1 = User.objects.create_user(email='test1@gmail.com', password="wonder1234", name="test1")
            self.user2 = User.objects.create_user(email='test2@gmail.com', password='wonder1234', name='test2')
            self.user3 = User.objects.create_user(email='test3@gmail.com', password='wonder1234', name='test3')
            self.token1, _ = Token.objects.get_or_create(user=self.user1)
            self.token2, _ = Token.objects.get_or_create(user=self.user2)
            self.question1 = Question.objects.create(title='테스트 질문입니다', writer=self.user1)
            self.answer1 = self.question1.answers.create(content='테스트 답변입니다', writer=self.user2)


    def test_invalid_get_question_detail(self):
        # not exist
        url = reverse('question detail', kwargs={'pk': '15490'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_anonymous_get_question_detail(self):
        url = reverse('question detail', kwargs={'pk': self.question1.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_question_follow(self):
        url = reverse('question follow', kwargs={'pk': self.question1.id})
        response = self.client.post(url, {}, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data,
                         {'followed_num': self.question1.followed_num(), 'is_followed': True})

    def test_answer_like(self):
        url = reverse('answer like', kwargs={'pk': self.answer1.id})
        response = self.client.post(url, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data,
                         {'liked_num': self.answer1.liked_num(), 'is_liked': True, 'is_downvoted': False})

    def test_answer_unlike(self):
        self.answer1.liked_users.add(self.user1)
        self.answer1.save()

        url = reverse('answer like', kwargs={'pk': self.answer1.id})
        response = self.client.post(url, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data,
                         {'liked_num': self.answer1.liked_num(), 'is_liked': False, 'is_downvoted': False})

    def test_answer_downvote(self):
        url = reverse('answer downvote', kwargs={'pk': self.answer1.id})
        response = self.client.post(url, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data,
                         {'liked_num': self.answer1.liked_num(), 'is_liked': False, 'is_downvoted': True})

    def test_answer_undownvote(self):
        self.answer1.downvoted_users.add(self.user1)
        self.answer1.save()

        url = reverse('answer downvote', kwargs={'pk': self.answer1.id})
        response = self.client.post(url, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'liked_num': 0, 'is_liked': False, 'is_downvoted': False})

    def test_question_bookmark(self):
        url = reverse('question bookmark', kwargs={'pk': self.question1.id})
        response = self.client.post(url, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.question1.bookmark_questions.first().id, self.user1.bookmark_contents.first().id)

    def test_question_unbookmark(self):
        bookmark = QuestionBookmark.objects.create(question=self.question1, user=self.user1)
        self.question1.bookmark_questions.add(bookmark)

        url = reverse('question bookmark', kwargs={'pk': self.question1.id})
        response = self.client.post(url, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.question1.bookmark_questions.count(), 0)

    def test_answer_bookmark(self):
        url = reverse('answer bookmark', kwargs={'pk': self.answer1.id})
        response = self.client.post(url, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.answer1.bookmark_answers.first().id, self.user1.bookmark_contents.first().id)

    def test_answer_unbookmark(self):
        bookmark = AnswerBookmark.objects.create(answer=self.answer1, user=self.user1)
        self.answer1.bookmark_answers.add(bookmark)

        url = reverse('answer bookmark', kwargs={'pk': self.answer1.id})
        response = self.client.post(url, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.answer1.bookmark_answers.count(), 0)

    def test_question_followers(self):
        url = reverse('question followers', kwargs={'pk': self.question1.id})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

        self.question1.followers.add(self.user1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['id'], self.user1.id)

    def test_answer_likers(self):
        url = reverse('answer likers', kwargs={'pk': self.answer1.id})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

        self.answer1.liked_users.add(self.user1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['id'], self.user1.id)

    def test_answer_list(self):
        answer2 = self.question1.answers.create(content='테스트 답변2입니다', writer=self.user1)
        answer3 = self.question1.answers.create(content='테스트 답변3입니다', writer=self.user3)
        answer2.liked_users.add(self.user2)
        url = reverse('answer create and list', kwargs={'pk': self.question1.id})
        response = self.client.get(url)

        self.assertEqual(response.data[0]['id'], answer2.id)
        self.assertEqual(len(response.data), 3)

        answer2.downvoted_users.add(self.user1, self.user3)
        self.answer1.liked_users.add(self.user1)
        response = self.client.get(url)

        self.assertEqual(response.data[0]['id'], self.answer1.id)
        self.assertEqual(len(response.data), 3)

        answer3.liked_users.add(self.user1, self.user2, self.user3)
        response = self.client.get(url)

        self.assertEqual(response.data[0]['id'], answer3.id)
        self.assertEqual(len(response.data), 3)
