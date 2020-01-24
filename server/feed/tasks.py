from celery import shared_task
from topic.models import Topic
from .models import QuestionWroteOnFollowingTopic, AnswerWroteOnFollowingTopic, QuestionWroteByFollowingUser, \
    AnswerWroteByFollowingUser, QuestionFollowedByFollowingUser, AnswerLikedByFollowingUser, AnswerChosenByEditors, \
    AnswerChosenByEditorsByTopic, AnswerChosenByEditorsAdmin
from django.contrib.auth import get_user_model
from contents.models import Question, Answer
from django.utils import timezone
from django.conf import settings


def create_activity_with_aggregation_helper(Model, following_instance, content_kwargs):
    """이미 만들어진 Activity Model의 activities 중 content가 같은 activity가 있다면 aggregate, 없다면 create.
    aggregate: following field(ManyToManyField)에 following instance를 추가하는 것.
    following_field가 None인 경우에는 안됨.
    :param Model: 만들 Activity class
    :param following_instance: 
    :param content_kwargs: 
    :return: 
    """
    if type(following_instance) == Topic:
        following_field_name = 'following_topics'
    elif type(following_instance) == get_user_model():
        following_field_name = 'following_users'
    else:
        raise NotImplementedError('아직 이 following_field에 대한 aggregation이 구현되지 않았습니다.')

    for user in following_instance.followers.all():
        activity_qs = Model.objects.filter(to=user, **content_kwargs)
        if activity_qs.exists():
            activity = activity_qs[0]
            getattr(activity, following_field_name).add(following_instance)
        else:
            activity = Model.objects.create(to=user, **content_kwargs)
            getattr(activity, following_field_name).add(following_instance)


@shared_task(default_retry_delay=300, max_retries=5)
def create_question_wrote_on_following_topic(topic_id, question_id):
    try:
        following_topic = Topic.objects.get(id=topic_id)
        question = Question.objects.get(id=question_id)
        create_activity_with_aggregation_helper(QuestionWroteOnFollowingTopic, following_topic, {'question': question})
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_answer_wrote_on_following_topic(topic_id, answer_id):
    try:
        following_topic = Topic.objects.get(id=topic_id)
        answer = Answer.objects.get(id=answer_id)
        create_activity_with_aggregation_helper(AnswerWroteOnFollowingTopic, following_topic, {'answer': answer})
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_question_wrote_by_following_user(user_id, question_id):
    try:
        following_user = get_user_model().objects.get(id=user_id)
        question = Question.objects.get(id=question_id)
        if not question.anonymous:
            create_activity_with_aggregation_helper(QuestionWroteByFollowingUser, following_user,
                                                    {'question': question})
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_answer_wrote_by_following_user(user_id, answer_id):
    try:
        following_user = get_user_model().objects.get(id=user_id)
        answer = Answer.objects.get(id=answer_id)
        create_activity_with_aggregation_helper(AnswerWroteByFollowingUser, following_user, {'answer': answer})
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_question_followed_by_following_user(user_id, question_id):
    try:
        following_user = get_user_model().objects.get(id=user_id)
        question = Question.objects.get(id=question_id)
        create_activity_with_aggregation_helper(QuestionFollowedByFollowingUser, following_user, {'question': question})
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_answer_liked_by_following_user(user_id, answer_id):
    try:
        following_user = get_user_model().objects.get(id=user_id)
        answer = Answer.objects.get(id=answer_id)
        create_activity_with_aggregation_helper(AnswerLikedByFollowingUser, following_user, {'answer': answer})
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_answer_chosen_by_editors_by_topic(topic_id, answer_id):
    try:
        following_topic = Topic.objects.get(id=topic_id)
        answer = Answer.objects.get(id=answer_id)
        create_activity_with_aggregation_helper(AnswerChosenByEditorsByTopic, following_topic, {'answer': answer})
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_answer_chosen_by_editors(answer_id):
    try:
        answer = Answer.objects.get(id=answer_id)
        for user in get_user_model().objects.all():
            AnswerChosenByEditors.objects.create(to=user, answer=answer)
    except Exception as e:
        print(e)


# TODO: 언팔로우할 때 activity 지우는 task 필요.
@shared_task(default_retry_delay=300, max_retries=5)
def create_recent_activities_by_following_user(following_user_id, user_id):
    try:
        following_user = get_user_model().objects.get(id=following_user_id)
        recent_point = timezone.now() - timezone.timedelta(days=settings.RECENT_DAYS_DELTA)

        user = get_user_model().objects.get(id=user_id)

        if user.activities.all().filter(created__gt=recent_point).count() > settings.MAX_RECENT_ACTIVITIES_NUM:
            return

        for answer in following_user.written_answers.all().filter(created__gt=recent_point).exclude(is_hidden=True):
            activity, _ = AnswerWroteByFollowingUser.objects.get_or_create(answer=answer, to=user,
                                                                           defaults={'created': answer.created})
            activity.following_users.add(following_user)

        for question in following_user.written_questions.all().filter(created__gt=recent_point):
            activity, _ = QuestionWroteByFollowingUser.objects.get_or_create(question=question, to=user,
                                                                             defaults={'created': question.created})
            activity.following_users.add(following_user)

        for answer in following_user.liked_answers.all().filter(created__gt=recent_point).exclude(is_hidden=True):
            activity, _ = AnswerLikedByFollowingUser.objects.get_or_create(answer=answer, to=user,
                                                                           defaults={'created': answer.created})
            activity.following_users.add(following_user)

        for question in following_user.following_questions.all().filter(created__gt=recent_point):
            activity, _ = QuestionFollowedByFollowingUser.objects.get_or_create(question=question, to=user,
                                                                                defaults={
                                                                                    'created': question.created})
            activity.following_users.add(following_user)
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_recent_activities_by_following_topic(user_id, following_topic_id):
    try:
        user = get_user_model().objects.get(id=user_id)
        recent_point = timezone.now() - timezone.timedelta(days=settings.RECENT_DAYS_DELTA)

        if user.activities.filter(created__gt=recent_point).count() > settings.MAX_RECENT_ACTIVITIES_NUM:
            return

        following_topic = Topic.objects.get(id=following_topic_id)

        admins = following_topic.answer_chosen_by_editors_by_topic_admins.all()

        if admins.exists():
            for admin in admins:
                activity, _ = AnswerChosenByEditorsByTopic.objects.get_or_create(to=user, answer=admin.answer,
                                                                                 defaults={
                                                                                     'created': admin.created})
                activity.following_topics.add(following_topic)

        for question in following_topic.questions.all().filter(created__gt=recent_point):
            best_answer = question.best_answer()
            if best_answer is None:
                activity, _ = QuestionWroteOnFollowingTopic.objects.get_or_create(question=question, to=user, defaults={
                    'created': question.created})
                activity.following_topics.add(following_topic)
            else:
                activity, _ = AnswerWroteOnFollowingTopic.objects.get_or_create(answer=best_answer, to=user, defaults={
                    'created': best_answer.created})
                activity.following_topics.add(following_topic)
    except Exception as e:
        print(e)


@shared_task(default_retry_delay=300, max_retries=5)
def create_answer_chosen_by_editors_when_signup(user_id):
    try:
        user = get_user_model().objects.get(id=user_id)
        recent_point = timezone.now() - timezone.timedelta(days=settings.RECENT_DAYS_DELTA)

        admins = AnswerChosenByEditorsAdmin.objects.filter(created__gt=recent_point)

        if admins.exists():
            for admin in admins:
                activity, _ = AnswerChosenByEditors.objects.get_or_create(answer=admin.answer, to=user,
                                                                          defaults={'created': admin.created})
    except Exception as e:
        print(e)
