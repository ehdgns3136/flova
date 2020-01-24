from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from channels import Group
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.utils import timezone
from user.models import User
from contents.models import Question, Answer, QuestionComment, AnswerComment
from .models import Notification, UserLastNotificationCheck, CustomNotification, \
    NotificationForFirstUser, NotificationForAll
from .serializers import NotificationSerializer
from .custom_signals import update_last_notification_check_signal, new_notification
from .tasks import create_new_answer_on_question_notification, create_follow_your_question_notification, \
    create_new_comment_on_your_question_notification, create_like_your_answer_notification, \
    create_new_comment_on_your_answer_notification, create_like_your_question_comment_notification, \
    create_like_your_answer_comment_notification, create_follow_you_notification, create_custom_notification_to_all
from pywebpush import webpush, WebPushException
from wonder_server.settings import VAPID_PRIVATE_KEY, INFO_EMAIL_HOST_USER
from .utils import make_push_notification


# add default UserLastNotificationCheck object when user created.
# This is for simplifying get_unread_notification_count logic
@receiver(post_save, sender=User)
def add_default_last_notification_check_on_user_create(sender, instance=None, created=False, **kwargs):
    if created:
        UserLastNotificationCheck.objects.create(user=instance, time=timezone.now())


def update_last_notification_check_handler(sender, request, user, time=None, **kwargs):
    obj, created = UserLastNotificationCheck.objects.get_or_create(user=user, defaults={'time': timezone.now()})

    if time is None:
        obj.time = timezone.now()
        obj.save()
    elif time > obj.time:
        obj.time = time
        obj.save()

update_last_notification_check_signal.connect(update_last_notification_check_handler)


#
# Update Notification
#

@receiver(post_save, sender=Answer)
def answer_save_callback(sender, instance=None, created=False, **kwargs):
    if created:
        create_new_answer_on_question_notification.delay(instance.question.id, instance.writer.id)


@receiver(m2m_changed, sender=Question.followers.through)
def question_follow_callback(sender, action, instance=None, pk_set=None, **kwargs):
    if action == 'post_add':
        for pk in pk_set:
            create_follow_your_question_notification.delay(instance.id, pk)


@receiver(post_save, sender=QuestionComment)
def question_comment_save_callback(sender, instance=None, created=False, **kwargs):
    if created:
        create_new_comment_on_your_question_notification.delay(instance.question.id, instance.writer.id)


@receiver(m2m_changed, sender=Answer.liked_users.through)
def answer_like_callback(sender, action, instance=None, pk_set=None, **kwargs):
    if action == 'post_add':
        for pk in pk_set:
            create_like_your_answer_notification.delay(instance.id, pk)


@receiver(post_save, sender=AnswerComment)
def answer_comment_save_callback(sender, instance=None, created=False, **kwargs):
    if created:
        create_new_comment_on_your_answer_notification.delay(instance.answer.id, instance.writer.id)


@receiver(m2m_changed, sender=QuestionComment.liked_users.through)
def question_comment_like_callback(sender, action, instance=None, pk_set=None, **kwargs):
    if action == 'post_add':
        for pk in pk_set:
            create_like_your_question_comment_notification.delay(instance.id, pk)


@receiver(m2m_changed, sender=AnswerComment.liked_users.through)
def answer_comment_like_callback(sender, action, instance=None, pk_set=None, **kwargs):
    if action == 'post_add':
        for pk in pk_set:
            create_like_your_answer_comment_notification.delay(instance.id, pk)


@receiver(m2m_changed, sender=User.followers.through)
def user_follow_callback(sender, action, instance=None, pk_set=None, reverse=None, **kwargs):
    if action == 'post_add':
        for pk in pk_set:
            if reverse:
                create_follow_you_notification.delay(pk, instance.id)
            else:
                create_follow_you_notification.delay(instance.id, pk)


# 처음 가입했을 때 만들어주는 알림
@receiver(post_save, sender=User)
def user_save_callback_notification_for_first_user(sender, instance=None, created=False, **kwargs):
    if created:
        for notification_data in NotificationForFirstUser.objects.all():
            notification = CustomNotification.objects.create(receiver=instance, added_time=timezone.now(),
                                                             text=notification_data.text, image=notification_data.image,
                                                             destination_path=notification_data.destination_path)
            notification.save()


@receiver(post_save, sender=NotificationForAll)
def notification_for_all_save_callback(sender, instance=None, created=False, **kwargs):
    if created:
        create_custom_notification_to_all.delay(text=instance.text, image=instance.image,
                                                destination_path=instance.destination_path)


#
# Custom Notification이 만들어졌다
#

@receiver(post_save, sender=CustomNotification)
def custom_notification_save_callback(sender, instance=None, created=False, **kwargs):
    if created:
        new_notification.send(sender=Notification, instance=instance)


#
# Send Message on Notification create
#

def new_notification_callback(sender, instance=None, **kwargs):
    serializer = NotificationSerializer(instance)

    unread_notification_count = Notification.objects.filter(receiver=instance.receiver,
                                                            added_time__gt=instance.receiver.last_notification_check.time).count()

    data = {
        'unread_count': unread_notification_count,
        'notification': serializer.data,
    }

    string_data = json.dumps(data, ensure_ascii=False, cls=DjangoJSONEncoder)

    # data used for push message
    push_string_data = json.dumps(make_push_notification(data['notification']), ensure_ascii=False, cls=DjangoJSONEncoder)

    # websocket
    Group(str(instance.receiver.id)).send({
        'text': string_data
    })

    # notification
    for subscription in instance.receiver.subscriptions.all():
        subscription_info = {
            'endpoint': subscription.endpoint,
            'expirationTime': None,
            'keys': {
                'p256dh': subscription.p256dh,
                'auth': subscription.auth
            }
        }
        try:
            webpush(subscription_info,
                    push_string_data,
                    vapid_private_key=VAPID_PRIVATE_KEY,
                    vapid_claims={"sub": "mailto:"+INFO_EMAIL_HOST_USER})
        except WebPushException as ex:
            print(repr(ex))


new_notification.connect(new_notification_callback)