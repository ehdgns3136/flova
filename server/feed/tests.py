from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from topic.models import Topic
from rest_framework.authtoken.models import Token
from contents.models import Question
from .models import QuestionWroteByFollowingUser, QuestionWroteOnFollowingTopic, AnswerWroteByFollowingUser, \
    AnswerWroteOnFollowingTopic, AnswerChosenByEditorsByTopic, AnswerLikedByFollowingUser, \
    QuestionFollowedByFollowingUser, AnswerChosenByEditorsAdmin, AnswerChosenByEditorsByTopicAdmin
from rest_framework import status
from json import dumps


class FeedTests(APITestCase):
    fixtures = ['topic/fixtures/initial_topics.json', ]

    def setUp(self):
        with self.settings(SIGNUP_MODE='OPENED'):
            self.user1 = get_user_model().objects.create_user(email='test1@gmail.com', password="wonder1234",
                                                              name="test1")
            self.token1 = Token.objects.get_or_create(user=self.user1)[0]
            self.following_user = get_user_model().objects.create_user(email='test2@gmail.com', password="wonder1234",
                                                                       name="test2")
            self.not_following_user = get_user_model().objects.create_user(email='test3@gmail.com',
                                                                           password="wonder1234",
                                                                           name="test3")
            self.user4 = get_user_model().objects.create_user(email='test4@gmail.com', password="wonder1234",
                                                              name="test4")

            self.user1.topics.add(Topic.objects.get(id=1))
            self.user1.topics.add(Topic.objects.get(id=2))

            self.user1.follow_or_unfollow(self.following_user)


    def test_question_wrote_on_following_topic(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            # O
            question1 = Question.objects.create(title='관심 있는 토픽 두 개입니다.', writer=self.not_following_user)
            question1.topics.add(Topic.objects.get(id=1))
            question1.topics.add(Topic.objects.get(id=2))

            # X
            question2 = Question.objects.create(title='관심 없는 토픽입니다.', writer=self.not_following_user)
            question2.topics.add(Topic.objects.get(id=3))

            # X
            question3 = Question.objects.create(title='토픽이 없습니다.', writer=self.not_following_user)

            # O
            question4 = Question.objects.create(title='관심 있는 토픽 하나입니다.', writer=self.not_following_user)
            question4.topics.add(Topic.objects.get(id=1))

            question1_qs = self.user1.activities.all().filter(questionwroteonfollowingtopic__question=question1)
            self.assertEqual(question1_qs.count(), 1)

            question2_qs = self.following_user.activities.all().filter(
                questionwroteonfollowingtopic__question=question2)
            self.assertEqual(question2_qs.exists(), False)

            question3_qs = self.following_user.activities.all().filter(
                questionwroteonfollowingtopic__question=question3)
            self.assertEqual(question3_qs.exists(), False)

            question4_qs = self.user1.activities.all().filter(questionwroteonfollowingtopic__question=question4)
            self.assertEqual(question4_qs.count(), 1)

    def test_answer_wrote_on_following_topic(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            # O
            question1 = Question.objects.create(title='관심 있는 토픽 두 개입니다.', writer=self.not_following_user)
            question1.topics.add(Topic.objects.get(id=1))
            question1.topics.add(Topic.objects.get(id=2))
            answer1 = question1.answers.create(content='답변입니다.', writer=self.not_following_user)

            # X
            question2 = Question.objects.create(title='관심 없는 토픽입니다.', writer=self.not_following_user)
            question2.topics.add(Topic.objects.get(id=3))
            answer2 = question2.answers.create(content='답변입니다.', writer=self.not_following_user)

            # X
            question3 = Question.objects.create(title='토픽이 없습니다.', writer=self.not_following_user)
            answer3 = question3.answers.create(content='답변입니다.', writer=self.not_following_user)

            # O
            question4 = Question.objects.create(title='관심 있는 토픽 하나입니다.', writer=self.not_following_user)
            question4.topics.add(Topic.objects.get(id=1))
            answer4 = question4.answers.create(content='답변입니다.', writer=self.not_following_user)

            answer1_qs = self.user1.activities.all().filter(answerwroteonfollowingtopic__answer=answer1)
            self.assertEqual(answer1_qs.count(), 1)

            answer2_qs = self.user1.activities.all().filter(answerwroteonfollowingtopic__answer=answer2)
            self.assertEqual(answer2_qs.exists(), False)

            answer3_qs = self.user1.activities.all().filter(answerwroteonfollowingtopic__answer=answer3)
            self.assertEqual(answer3_qs.exists(), False)

            answer4_qs = self.user1.activities.all().filter(answerwroteonfollowingtopic__answer=answer4)
            self.assertEqual(answer4_qs.count(), 1)

    def test_question_wrote_by_following_user(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            # O
            question1 = Question.objects.create(title='팔로우 한 사람이 작성한 질문입니다.', writer=self.following_user)

            # X
            question2 = Question.objects.create(title='팔로우 하지 않은 사람이 작성한 질문입니다.', writer=self.not_following_user)

            # X
            question3 = Question.objects.create(title='팔로우 한 사람이 작성했지만, 익명 질문입니다.', writer=self.following_user,
                                                anonymous=True)

            self.assertEqual(
                self.user1.activities.filter(questionwrotebyfollowinguser__question=question1).exists(),
                True)
            self.assertEqual(
                self.user1.activities.filter(questionwrotebyfollowinguser__question=question2).exists(),
                False)
            self.assertEqual(
                self.user1.activities.filter(questionwrotebyfollowinguser__question=question3).exists(),
                False)

    def test_answer_wrote_by_following_user(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            # O
            question1 = Question.objects.create(title='질문입니다.', writer=self.not_following_user)
            answer1 = question1.answers.create(content='팔로우 한 유저의 답변입니다.', writer=self.following_user)

            # X
            answer2 = question1.answers.create(content='팔로우 하지 않은 유저의 답변입니다.', writer=self.not_following_user)

            self.assertEqual(self.user1.activities.filter(answerwrotebyfollowinguser__answer=answer1).exists(),
                             True)
            self.assertEqual(self.user1.activities.filter(answerwrotebyfollowinguser__answer=answer2).exists(),
                             False)

    def test_question_followed_by_following_user(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(title='질문입니다.', writer=self.not_following_user)
            question2 = Question.objects.create(title='질문2입니다.', writer=self.not_following_user)

            question1.followers.add(self.following_user)

            self.assertEqual(self.user1.activities.filter(questionfollowedbyfollowinguser__question=question1).exists(),
                             True)
            self.assertEqual(self.user1.activities.filter(questionfollowedbyfollowinguser__question=question2).exists(),
                             False)

            # TODO: 팔로우 취소시 삭제하는 로직도 구현 필요.
            # question1.followers.remove(self.following_user)
            #
            # self.assertEqual(self.user1.activities.filter(questionfollowedbyfollowinguser__question=question1).exists(),
            #                  False)

    def test_answer_liked_by_following_user(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(title='질문입니다.', writer=self.not_following_user)
            answer1 = question1.answers.create(content='답변입니다.', writer=self.not_following_user)
            answer2 = question1.answers.create(content='답변2입니다.', writer=self.not_following_user)

            answer1.liked_users.add(self.following_user)

            self.assertEqual(self.user1.activities.filter(answerlikedbyfollowinguser__answer=answer1).exists(), True)
            self.assertEqual(self.user1.activities.filter(answerlikedbyfollowinguser__answer=answer2).exists(), False)

    def test_answer_chosen_by_editors(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(title='질문입니다.', writer=self.not_following_user)
            answer1 = question1.answers.create(content='답변입니다.', writer=self.not_following_user)
            question1.topics.add(Topic.objects.get(id=1))
            question2 = Question.objects.create(title='질문2입니다.', writer=self.not_following_user)
            answer2 = question2.answers.create(content='답변2입니다.', writer=self.not_following_user)

            # O
            AnswerChosenByEditorsByTopicAdmin.objects.create(answer=answer1)
            self.assertEqual(self.user1.activities.filter(answerchosenbyeditorsbytopic__answer=answer1).count(), 1)

            # X
            AnswerChosenByEditorsByTopic.objects.create(answer=answer2)
            self.assertEqual(self.user1.activities.filter(answerchosenbyeditorsbytopic__answer=answer2).exists(), False)

    def test_answer_chosen_by_editors_to_all(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(title='질문입니다.', writer=self.not_following_user)
            answer1 = question1.answers.create(content='답변입니다.', writer=self.not_following_user)

            # O
            AnswerChosenByEditorsAdmin.objects.create(answer=answer1)
            self.assertEqual(self.user1.activities.filter(answerchosenbyeditors__answer=answer1).exists(), True)

    def test_main_feed_remove_same_questions(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(title='질문', writer=self.user1)
            answer1 = question1.answers.create(content='답변입니다.', writer=self.user1)

            # Check user1's activities for test.
            self.assertEqual(self.user1.activities.all().exists(), False)

            activity0 = AnswerWroteByFollowingUser.objects.create(to=self.user1, answer=answer1)
            activity1 = QuestionWroteByFollowingUser.objects.create(to=self.user1, question=question1)
            activity2 = AnswerLikedByFollowingUser.objects.create(to=self.user1, answer=answer1)
            activity3 = QuestionFollowedByFollowingUser.objects.create(to=self.user1, question=question1)
            AnswerChosenByEditorsByTopicAdmin.objects.create(answer=answer1)
            AnswerChosenByEditorsAdmin.objects.create(answer=answer1)
            activity6 = AnswerWroteOnFollowingTopic.objects.create(to=self.user1, answer=answer1)
            activity7 = QuestionWroteOnFollowingTopic.objects.create(to=self.user1, question=question1)

            url = reverse('main feed')
            response = self.client.get(url, {}, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data['results']), 1)
            self.assertEqual(response.data['results'][0]['activity_data']['id'], activity0.id)

            activity0.delete()
            response = self.client.get(url, {}, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data['results']), 1)
            self.assertEqual(response.data['results'][0]['activity_data']['id'], activity1.id)

            activity1.delete()
            response = self.client.get(url, {}, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data['results']), 1)
            self.assertEqual(response.data['results'][0]['activity_data']['id'], activity2.id)

            activity2.delete()
            response = self.client.get(url, {}, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data['results']), 1)

            activity3.delete()
            response = self.client.get(url, {}, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data['results']), 1)

    def test_create_recent_activities_when_following_user(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(writer=self.not_following_user, title='질문입니다.')
            answer1 = question1.answers.create(writer=self.not_following_user, content='답변입니다.')
            question2 = Question.objects.create(writer=self.user4, title='abc')
            answer2 = question2.answers.create(writer=self.user4, content='abc')
            answer2.liked_users.add(self.not_following_user)
            question2.followers.add(self.not_following_user)

            self.user1.follow_or_unfollow(self.not_following_user)

            self.assertEqual(self.user1.activities.all().count(), 4)

    def test_create_recent_activities_when_following_topic(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            self.assertEqual(self.user1.topics.all().filter(id=3).exists(), False)

            question1 = Question.objects.create(writer=self.not_following_user, title='질문입니다.')
            answer1 = question1.answers.create(writer=self.not_following_user, content='답변')
            question1.topics.add(Topic.objects.get(id=3))

            AnswerChosenByEditorsByTopicAdmin.objects.create(answer=answer1)

            question2 = Question.objects.create(writer=self.not_following_user, title='질문2입니다.')
            question2.topics.add(Topic.objects.get(id=3))

            self.user1.topics.add(Topic.objects.get(id=3))

            self.assertEqual(self.user1.activities.all().count(), 3)

    def test_create_answer_chosen_by_editors_when_signup(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True, SIGNUP_MODE='OPENED'):
            question1 = Question.objects.create(writer=self.not_following_user, title='질문입니다.')
            answer1 = question1.answers.create(writer=self.not_following_user, content='답변')
            AnswerChosenByEditorsAdmin.objects.create(answer=answer1)

            user5 = get_user_model().objects.create_user(email='test5@gmail.com', password="wonder1234",
                                                         name="test5")

            self.assertEqual(user5.activities.all().filter(answerchosenbyeditors__answer=answer1).exists(), True)

    def test_main_feed(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(title='팔로우 한 사람의 질문입니다.', writer=self.following_user)
            question2 = Question.objects.create(title='팔로우 하지 않은 사람의 질문입니다.', writer=self.not_following_user)
            Question.objects.create(title='팔로우 하지 않은 사람의 질문입니다.', writer=self.following_user)
            Question.objects.create(title='팔로우 하지 않은 사람의 질문입니다.', writer=self.not_following_user)
            question1.answers.create(content='답변1', writer=self.user1)
            question2.answers.create(content='답변2', writer=self.not_following_user)
            question2.answers.create(content='답변3', writer=self.following_user)
            answer4 = question2.answers.create(content='답변4', writer=self.not_following_user)

            answer4.liked_users.add(self.following_user)

            url = reverse('main feed')
            response = self.client.get(url, {}, HTTP_AUTHORIZATION='TOKEN {}'.format(self.token1.key))

            activities = response.data['results']
            self.assertEqual(type(activities), list)
            for activity in activities:
                self.assertEqual('activity_data' in activity, True)
                self.assertEqual('content' in activity, True)

    def test_hide_answer_when_answer_saved_or_liked(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(title='팔로우 하지 않은 사람의 질문2입니다.', writer=self.not_following_user)
            question2 = Question.objects.create(title='팔로우 하지 않은 사람의 질문3입니다.', writer=self.not_following_user)

            question1.topics.add(Topic.objects.get(id=1))
            answer_wrote_on_following_topic = question1.answers.create(content='답변2', writer=self.not_following_user)
            answer_wrote_by_following_user = question1.answers.create(content='답변3', writer=self.following_user)
            answer_liked_by_following_user = question2.answers.create(content='답변4', writer=self.not_following_user)
            answer_liked_by_following_user.liked_users.add(self.following_user)

            self.assertEqual(AnswerWroteOnFollowingTopic.objects.filter(to=self.user1,
                                                                        answer=answer_wrote_on_following_topic.id).exists(),
                             True)
            self.assertEqual(AnswerWroteByFollowingUser.objects.filter(to=self.user1,
                                                                       answer=answer_wrote_by_following_user).exists(),
                             True)
            self.assertEqual(AnswerLikedByFollowingUser.objects.filter(to=self.user1,
                                                                       answer=answer_liked_by_following_user).exists(),
                             True)

            answer_wrote_on_following_topic.is_hidden = True
            answer_wrote_on_following_topic.save()

            self.assertEqual(AnswerWroteOnFollowingTopic.objects.filter(to=self.user1,
                                                                        answer=answer_wrote_on_following_topic.id).exists(),
                             False)

            answer_wrote_by_following_user.is_hidden = True
            answer_wrote_by_following_user.save()

            self.assertEqual(AnswerWroteByFollowingUser.objects.filter(to=self.user1,
                                                                       answer=answer_wrote_by_following_user).exists(),
                             False)

            answer_liked_by_following_user.is_hidden = True
            answer_liked_by_following_user.save()

            self.assertEqual(AnswerLikedByFollowingUser.objects.filter(to=self.user1,
                                                                       answer=answer_liked_by_following_user).exists(),
                             False)

            answer_wrote_on_following_topic.is_hidden = False
            answer_wrote_on_following_topic.save()
            answer_wrote_by_following_user.is_hidden = False
            answer_wrote_by_following_user.save()
            answer_liked_by_following_user.is_hidden = False
            answer_liked_by_following_user.save()

            self.assertEqual(AnswerWroteOnFollowingTopic.objects.filter(to=self.user1,
                                                                        answer=answer_wrote_on_following_topic.id).exists(),
                             True)
            self.assertEqual(AnswerWroteByFollowingUser.objects.filter(to=self.user1,
                                                                       answer=answer_wrote_by_following_user).exists(),
                             True)
            self.assertEqual(AnswerLikedByFollowingUser.objects.filter(to=self.user1,
                                                                       answer=answer_liked_by_following_user).exists(),
                             True)

            answer_liked_after_hidden = question1.answers.create(content='답변2', writer=self.not_following_user)
            answer_liked_after_hidden.is_hidden = True
            answer_liked_after_hidden.save()

            answer_liked_after_hidden.liked_users.add(self.following_user)
            self.assertEqual(
                AnswerLikedByFollowingUser.objects.filter(to=self.user1, answer=answer_liked_after_hidden).exists(),
                False)

    def test_hide_answer_when_user_followed(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(title='팔로우 하지 않은 사람의 질문1입니다.', writer=self.not_following_user)
            answer_wrote_by_user_to_follow = question1.answers.create(content='팔로우 할 유저의 답변입니다.', writer=self.user4)
            answer_wrote_by_user_to_follow.is_hidden = True
            answer_wrote_by_user_to_follow.save()
            self.user1.follow_or_unfollow(self.user4)

            self.assertEqual(AnswerWroteByFollowingUser.objects.filter(to=self.user1,
                                                                       answer=answer_wrote_by_user_to_follow).exists(),
                             False)

    def test_hide_answer_when_topic_followed(self):
        with self.settings(CELERY_TASK_ALWAYS_EAGER=True):
            question1 = Question.objects.create(title='팔로우 하지 않은 사람의 질문1입니다.', writer=self.not_following_user)

            answer_wrote_on_topic_to_follow = question1.answers.create(content='팔로우 할 토픽의 답변입니다.',
                                                                       writer=self.not_following_user)
            self.assertEqual(self.user1.topics.filter(id=4).exists(), False)

            question1.topics.add(Topic.objects.get(id=4))

            answer_wrote_on_topic_to_follow.is_hidden = True
            answer_wrote_on_topic_to_follow.save()

            self.user1.topics.add(Topic.objects.get(id=4))

            self.assertEqual(AnswerWroteOnFollowingTopic.objects.filter(to=self.user1,
                                                                        answer=answer_wrote_on_topic_to_follow).exists(),
                             False)
