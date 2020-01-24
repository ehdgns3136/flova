from contents.models import Question, Answer
from django.dispatch import receiver
from .tasks import create_question_wrote_on_following_topic, \
    create_answer_wrote_by_following_user, create_answer_wrote_on_following_topic, \
    create_question_wrote_by_following_user, create_question_followed_by_following_user, \
    create_answer_liked_by_following_user, create_answer_chosen_by_editors_by_topic, create_answer_chosen_by_editors, \
    create_recent_activities_by_following_topic, create_recent_activities_by_following_user, \
    create_answer_chosen_by_editors_when_signup

from django.db.models.signals import post_save, m2m_changed, pre_save
from django.contrib.auth import get_user_model
import logging
from .models import AnswerWroteOnFollowingTopic, AnswerWroteByFollowingUser, AnswerLikedByFollowingUser, \
    AnswerChosenByEditorsByTopicAdmin, AnswerChosenByEditorsAdmin


# TODO: topic을 질문에 Add 했을 때 answer_wrote_on_topic 추가.
@receiver(m2m_changed, sender=Question.topics.through)
def question_topic_added_callback(sender, instance, action, pk_set, **kwargs):
    if action == 'post_add':
        for topic_pk in pk_set:
            create_question_wrote_on_following_topic.delay(topic_pk, instance.id)


@receiver(post_save, sender=Answer)
def answer_saved_callback(sender, instance, created, **kwargs):
    if created:  # not instance.is_hidden:
        create_answer_wrote_by_following_user.delay(instance.writer.id, instance.id)

        topics = instance.question.topics.all()
        for topic in topics:
            create_answer_wrote_on_following_topic.delay(topic.id, instance.id)


@receiver(post_save, sender=Question)
def question_saved_callback(sender, instance, created, **kwargs):
    if created:
        create_question_wrote_by_following_user.delay(instance.writer.id, instance.id)


@receiver(m2m_changed, sender=Question.followers.through)
def question_followed_callback(sender, instance, action, pk_set, **kwargs):
    if action == 'post_add':
        for user_pk in pk_set:
            create_question_followed_by_following_user.delay(user_pk, instance.id)


@receiver(m2m_changed, sender=Answer.liked_users.through)
def answer_liked_callback(sender, instance, action, pk_set, **kwargs):
    if action == 'post_add' and not instance.is_hidden:
        for user_pk in pk_set:
            create_answer_liked_by_following_user.delay(user_pk, instance.id)


@receiver(post_save, sender=AnswerChosenByEditorsByTopicAdmin)
def answer_chosen_by_editors_admin_by_topic_saved_callback(sender, instance, created, **kwargs):
    if created:
        topics = instance.answer.question.topics.all()
        for topic in topics:
            instance.topics.add(topic)


@receiver(m2m_changed, sender=AnswerChosenByEditorsByTopicAdmin.topics.through)
def answer_chosen_by_editors_admin_by_topic_topic_added_callback(sender, instance, action, pk_set, **kwargs):
    if action == 'post_add':
        for topic_id in pk_set:
            create_answer_chosen_by_editors_by_topic.delay(topic_id, instance.answer.id)


@receiver(post_save, sender=AnswerChosenByEditorsAdmin)
def answer_chosen_by_editors_admin_saved_callback(sender, instance, created, **kwargs):
    if created:
        answer_id = instance.answer.id
        create_answer_chosen_by_editors.delay(answer_id)


@receiver(m2m_changed, sender=get_user_model().topics.through)
def user_followed_topic_callback(sender, instance, action, pk_set, **kwargs):
    if action == 'post_add':
        for following_topic_id in pk_set:
            create_recent_activities_by_following_topic.delay(instance.id, following_topic_id)


@receiver(m2m_changed, sender=get_user_model().followers.through)
def user_followed_user_callback(sender, instance, action, pk_set, **kwargs):
    if action == 'post_add':
        for following_user_id in pk_set:
            create_recent_activities_by_following_user.delay(following_user_id, instance.id)


@receiver(post_save, sender=get_user_model())
def user_saved_callback(sender, instance, created, **kwargs):
    if created:
        create_answer_chosen_by_editors_when_signup.delay(instance.id)


@receiver(pre_save, sender=Answer)
def answer_is_hidden_changed(sender, instance, **kwargs):
    try:
        original_answer = sender.objects.get(id=instance.id)
        if original_answer.is_hidden != instance.is_hidden:
            if instance.is_hidden:
                AnswerWroteByFollowingUser.objects.filter(answer=instance).delete()
                AnswerWroteOnFollowingTopic.objects.filter(answer=instance).delete()
                AnswerLikedByFollowingUser.objects.filter(answer=instance).delete()
            else:
                create_answer_wrote_by_following_user.delay(instance.writer.id, instance.id)

                topics = instance.question.topics.all()
                for topic in topics:
                    create_answer_wrote_on_following_topic.delay(topic.id, instance.id)

                for follower in instance.liked_users.all():
                    create_answer_liked_by_following_user.delay(follower.id, instance.id)
    except sender.DoesNotExist:  # created
        if instance.is_hidden:
            logger = logging.getLogger(__name__)
            logger.warning('답변을 만들 때 is_hidden일 수 없습니다.')
