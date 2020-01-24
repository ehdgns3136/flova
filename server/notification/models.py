from django.contrib.auth import get_user_model
from django.db import models
# from django_extensions.db.models import TimeStampedModel
from model_utils.managers import InheritanceManager
from contents.models import Question, Answer, QuestionComment, AnswerComment


# save last time a user checked notification.
# And count unread notifications by using this information.
class UserLastNotificationCheck(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, primary_key=True, related_name='last_notification_check')
    time = models.DateTimeField()


# base notification class
class Notification(models.Model):
    receiver = models.ForeignKey(get_user_model(), related_name='notifications')
    read = models.BooleanField(default=False)
    added_time = models.DateTimeField()

    objects = InheritanceManager()

    def __str__(self):
        return str(self.id)


# ~님 외 ~명이 질문 ~에 답변을 달았습니다.
class NewAnswerOnQuestionNotification(Notification):
    question = models.ForeignKey(Question)
    writers = models.ManyToManyField(get_user_model(), related_name='new_answer_on_question_notification')
    recent_writer = models.ForeignKey(get_user_model(), related_name='new_answer_on_question_notification_recent') # 가장 최근 writer


# ~님 외 ~명이 회원님의 질문 ~을 팔로우합니다.
class FollowYourQuestionNotification(Notification):
    question = models.ForeignKey(Question)
    followers = models.ManyToManyField(get_user_model(), related_name='follow_your_question_notification')
    recent_follower = models.ForeignKey(get_user_model(), related_name='follow_your_question_notification_recent')


# ~님 외 ~명이 회원님의 질문 ~에 댓글을 남겼습니다.
class NewCommentOnYourQuestionNotification(Notification):
    question = models.ForeignKey(Question)
    writers = models.ManyToManyField(get_user_model(), related_name='new_comment_on_your_question_notification')
    recent_writer = models.ForeignKey(get_user_model(), related_name='new_comment_on_your_question_notification_recent')


# ~님 외 ~명이 ~에 대한 회원님의 답변을 좋아합니다.
class LikeYourAnswerNotification(Notification):
    answer = models.ForeignKey(Answer)
    likers = models.ManyToManyField(get_user_model(), related_name='like_your_answer_notification')
    recent_liker = models.ForeignKey(get_user_model(), related_name='like_your_answer_notification_recent')


# ~님 외 ~명이 ~에 대한 회원님의 답변에 댓글을 남겼습니다.
class NewCommentOnYourAnswerNotification(Notification):
    answer = models.ForeignKey(Answer)
    writers = models.ManyToManyField(get_user_model(), related_name='new_comment_on_your_answer_notification')
    recent_writer = models.ForeignKey(get_user_model(), related_name='new_comment_on_your_answer_notification_recent')


# ~님 외 ~명이 회원님의 댓글을 좋아합니다: "~"
class LikeYourQuestionCommentNotification(Notification):
    comment = models.ForeignKey(QuestionComment)
    likers = models.ManyToManyField(get_user_model(), related_name='like_your_question_comment_notification')
    recent_liker = models.ForeignKey(get_user_model(), related_name='like_your_question_comment_notification_recent')


# ~님 외 ~명이 회원님의 댓글을 좋아합니다: "~"
class LikeYourAnswerCommentNotification(Notification):
    comment = models.ForeignKey(AnswerComment)
    likers = models.ManyToManyField(get_user_model(), related_name='like_your_answer_comment_notification')
    recent_liker = models.ForeignKey(get_user_model(), related_name='like_your_answer_comment_notification_recent')


# ~님 외 ~명이 회원님을 팔로우합니다: "~"
class FollowYouNotification(Notification):
    followers = models.ManyToManyField(get_user_model(), related_name='follow_you_notification')
    recent_follower = models.ForeignKey(get_user_model(), related_name='follow_you_notification_recent')


class CustomNotification(Notification):
    text = models.TextField()
    image = models.URLField(blank=False,
                            default='https://s3.ap-northeast-2.amazonaws.com/flova/assets/notification_default.jpg')
    destination_path = models.TextField(blank=True, default='/')


# 처음 가입했을 때 줄 알림들 목록
class NotificationForFirstUser(models.Model):
    text = models.TextField()
    image = models.URLField(blank=False,
                            default='https://s3.ap-northeast-2.amazonaws.com/flova/assets/notification_default.jpg')
    destination_path = models.TextField(blank=True, default='/')

# 전체에게 알림을 보낼 때 사용
class NotificationForAll(models.Model):
    text = models.TextField()
    image = models.URLField(blank=False,
                            default='https://s3.ap-northeast-2.amazonaws.com/flova/assets/notification_default.jpg')
    destination_path = models.TextField(blank=True, default='/')