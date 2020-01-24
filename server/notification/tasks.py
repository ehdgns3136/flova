from celery import shared_task
from django.utils import timezone
from user.models import User
from contents.models import Question, Answer, QuestionComment, AnswerComment
from notification.models import Notification, NewAnswerOnQuestionNotification, FollowYourQuestionNotification, \
    NewCommentOnYourQuestionNotification, LikeYourAnswerNotification, NewCommentOnYourAnswerNotification, \
    LikeYourQuestionCommentNotification, LikeYourAnswerCommentNotification, FollowYouNotification, \
    CustomNotification
from .signals import new_notification


# helper function for new answer on question notification
def newAnswerOnQuestionNotificationHelper(receiver, question, writer):
    notification = NewAnswerOnQuestionNotification.objects.filter(receiver=receiver, question=question, read=False).first()
    if notification is not None:
        # aggregate notification
        notification.writers.add(writer)
        notification.recent_writer = writer
        notification.added_time = timezone.now() # TODO : notification time은 실제 답변 작성 시간으로 바꿀 것
        notification.save()
    else:
        notification = NewAnswerOnQuestionNotification.objects.create(receiver=receiver, question=question,
                                                                      recent_writer=writer, added_time=timezone.now())
        notification.writers.add(writer)
        notification.save()

    new_notification.send(sender=Notification, instance=notification)


@shared_task(default_retry_delay=300, max_retries=5)
def create_new_answer_on_question_notification(question_id, writer_id):
    try:
        question = Question.objects.get(id=question_id)
        writer = User.objects.get(id=writer_id)

        if question.writer != writer:
            newAnswerOnQuestionNotificationHelper(receiver=question.writer, question=question, writer=writer)

        for followed_user in question.followers.all():
            if followed_user != question.writer and followed_user != writer:
                newAnswerOnQuestionNotificationHelper(receiver=followed_user, question=question,
                                                      writer=writer)
    except Exception as e:
        print(e)


def newFollowYourQuestionNotificationHelper(receiver, question, follower):
    notification = FollowYourQuestionNotification.objects.filter(receiver=receiver, question=question, read=False).first()
    if notification is not None:
        # aggregate notification
        notification.followers.add(follower)
        notification.recent_follower = follower
        notification.added_time = timezone.now()
        notification.save()
    else:
        notification = FollowYourQuestionNotification.objects.create(receiver=receiver, question=question,
                                                                     recent_follower=follower, added_time=timezone.now())
        notification.followers.add(follower)
        notification.save()

    new_notification.send(sender=Notification, instance=notification)


@shared_task(default_retry_delay=300, max_retries=5)
def create_follow_your_question_notification(question_id, follower_id):
    try:
        question = Question.objects.get(id=question_id)
        follower = User.objects.get(id=follower_id)

        if question.writer != follower:
            newFollowYourQuestionNotificationHelper(receiver=question.writer, question=question, follower=follower)
    except Exception as e:
        print(e)


def newCommentOnYourQuestionNotificationHelper(receiver, question, writer):
    notification = NewCommentOnYourQuestionNotification.objects.filter(receiver=receiver, question=question, read=False).first()
    if notification is not None:
        # aggregate notification
        notification.writers.add(writer)
        notification.recent_writer = writer
        notification.added_time = timezone.now()
        notification.save()
    else:
        notification = NewCommentOnYourQuestionNotification.objects.create(receiver=receiver, question=question,
                                                                     recent_writer=writer, added_time=timezone.now())
        notification.writers.add(writer)
        notification.save()

    new_notification.send(sender=Notification, instance=notification)


@shared_task(default_retry_delay=300, max_retries=5)
def create_new_comment_on_your_question_notification(question_id, writer_id):
    try:
        question = Question.objects.get(id=question_id)
        writer = User.objects.get(id=writer_id)

        if question.writer != writer:
            newCommentOnYourQuestionNotificationHelper(receiver=question.writer, question=question, writer=writer)
    except Exception as e:
        print(e)


def likeYourAnswerNotificationHelper(receiver, answer, liker):
    notification = LikeYourAnswerNotification.objects.filter(receiver=receiver, answer=answer, read=False).first()
    if notification is not None:
        # aggregate notification
        notification.likers.add(liker)
        notification.recent_liker = liker
        notification.added_time = timezone.now()
        notification.save()
    else:
        notification = LikeYourAnswerNotification.objects.create(receiver=receiver, answer=answer,
                                                                 recent_liker=liker, added_time=timezone.now())
        notification.likers.add(liker)
        notification.save()

    new_notification.send(sender=Notification, instance=notification)


@shared_task(default_retry_delay=300, max_retries=5)
def create_like_your_answer_notification(answer_id, liker_id):
    try:
        answer = Answer.objects.get(id=answer_id)
        liker = User.objects.get(id=liker_id)

        if answer.writer != liker:
            likeYourAnswerNotificationHelper(receiver=answer.writer, answer=answer, liker=liker)
    except Exception as e:
        print(e)


def newCommentOnYourAnswerNotificationHelper(receiver, answer, writer):
    notification = NewCommentOnYourAnswerNotification.objects.filter(receiver=receiver, answer=answer, read=False).first()
    if notification is not None:
        # aggregate notification
        notification.writers.add(writer)
        notification.recent_writer = writer
        notification.added_time = timezone.now()
        notification.save()
    else:
        notification = NewCommentOnYourAnswerNotification.objects.create(receiver=receiver, answer=answer,
                                                                     recent_writer=writer, added_time=timezone.now())
        notification.writers.add(writer)
        notification.save()

    new_notification.send(sender=Notification, instance=notification)


@shared_task(default_retry_delay=300, max_retries=5)
def create_new_comment_on_your_answer_notification(answer_id, writer_id):
    try:
        answer = Answer.objects.get(id=answer_id)
        writer = User.objects.get(id=writer_id)

        if answer.writer != writer:
            newCommentOnYourAnswerNotificationHelper(receiver=answer.writer, answer=answer, writer=writer)
    except Exception as e:
        print(e)


def likeYourQuestionCommentNotificationHelper(receiver, comment, liker):
    notification = LikeYourQuestionCommentNotification.objects.filter(receiver=receiver, comment=comment, read=False).first()
    if notification is not None:
        # aggregate notification
        notification.likers.add(liker)
        notification.recent_liker = liker
        notification.added_time = timezone.now()
        notification.save()
    else:
        notification = LikeYourQuestionCommentNotification.objects.create(receiver=receiver, comment=comment,
                                                                 recent_liker=liker, added_time=timezone.now())
        notification.likers.add(liker)
        notification.save()

    new_notification.send(sender=Notification, instance=notification)


@shared_task(default_retry_delay=300, max_retries=5)
def create_like_your_question_comment_notification(comment_id, liker_id):
    try:
        comment = QuestionComment.objects.get(id=comment_id)
        liker = User.objects.get(id=liker_id)

        if comment.writer != liker:
            likeYourQuestionCommentNotificationHelper(receiver=comment.writer, comment=comment, liker=liker)
    except Exception as e:
        print(e)


def likeYourAnswerCommentNotificationHelper(receiver, comment, liker):
    notification = LikeYourAnswerCommentNotification.objects.filter(receiver=receiver, comment=comment, read=False).first()
    if notification is not None:
        # aggregate notification
        notification.likers.add(liker)
        notification.recent_liker = liker
        notification.added_time = timezone.now()
        notification.save()
    else:
        notification = LikeYourAnswerCommentNotification.objects.create(receiver=receiver, comment=comment,
                                                                 recent_liker=liker, added_time=timezone.now())
        notification.likers.add(liker)
        notification.save()

    new_notification.send(sender=Notification, instance=notification)


@shared_task(default_retry_delay=300, max_retries=5)
def create_like_your_answer_comment_notification(comment_id, liker_id):
    try:
        comment = AnswerComment.objects.get(id=comment_id)
        liker = User.objects.get(id=liker_id)

        if comment.writer != liker:
            likeYourAnswerCommentNotificationHelper(receiver=comment.writer, comment=comment, liker=liker)
    except Exception as e:
        print(e)


def followYouNotificationHelper(receiver, follower):
    notification = FollowYouNotification.objects.filter(receiver=receiver, read=False).first()
    if notification is not None:
        # aggregate notification
        notification.followers.add(follower)
        notification.recent_follower = follower
        notification.added_time = timezone.now()
        notification.save()
    else:
        notification = FollowYouNotification.objects.create(receiver=receiver, recent_follower=follower,
                                                            added_time=timezone.now())
        notification.followers.add(follower)
        notification.save()

    new_notification.send(sender=Notification, instance=notification)


@shared_task(default_retry_delay=300, max_retries=5)
def create_follow_you_notification(receiver_id, follower_id):
    try:
        receiver = User.objects.get(id=receiver_id)
        follower = User.objects.get(id=follower_id)

        followYouNotificationHelper(receiver, follower)
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_custom_notification_to_all(text, image, destination_path):
    try:
        for user in User.objects.all():
            notification = CustomNotification.objects.create(receiver=user, added_time=timezone.now(), text=text, image=image, destination_path=destination_path)
            notification.save()
    except Exception as e:
        print(e)