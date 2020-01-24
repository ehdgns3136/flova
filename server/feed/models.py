from django.db import models
from django.contrib.auth import get_user_model
from model_utils.managers import InheritanceManager
from contents.models import Question, Answer
from topic.models import Topic
from django.utils import timezone

""""***Activity 모델 추가할 때 꼭 추가 요망!!***
만일 같은 페이지에 질문이 겹치면 여기서 가장 높은 priority(낮은 value)를 가진 질문만 보여줌.
content_class가 Question이거나 Answer일 경우에만 처리되어 있음.
"""

type_priority = {
    'answer_wrote_by_following_user': 0,
    'question_wrote_by_following_user': 1,
    'answer_liked_by_following_user': 2,
    'question_followed_by_following_user': 3,
    'answer_chosen_by_editors_by_topic': 4,
    'answer_chosen_by_editors': 5,
    'answer_wrote_on_following_topic': 6,
    'question_wrote_on_following_topic': 7,
}


class Activity(models.Model):
    to = models.ForeignKey(get_user_model(), related_name='activities', null=True,
                           blank=True)  # Null 과 Blank는 Editor's choice를 위해 허용됨.
    created = models.DateTimeField(default=timezone.now)
    objects = InheritanceManager()

    # 예시: 팔로우한 주제 '프로그래밍'에 새로운 질문이 올라오는 activity
    @property
    def following_class(self):
        """following_class: 유저가 팔로우 하여 activity를 받아보는 Field.
        현재 주제나, 유저가 following_class가 될 수 있음.
        왜 Feed에 노출되었는지를 설명해줌.
        ManyToManyField로 정의되어 content와 to가 같을 경우 aggregate 됨.
        ex) 팔로우 한 주제 '프로그래밍'
        """
        raise NotImplementedError('following_class 구현이 필요합니다.')

    @property
    def content_class(self):
        """content_class: 이 activity의 내용을 다루는 Field.
        현재 질문이나 답변이 content_class가 될 수 있음.
        후에 주제 목록이나 유저 목록이 될 예정.
        ex) 새로운 질문
        """
        raise NotImplementedError('content_class 구현이 필요합니다.')

    # type: 이 모델은 어떤 activity들을 다루는지. ex) 'question_wrote_on_following_topic'
    @property
    def type(self):
        """type: activity의 종류 정의.
        ex) question_wrote_on_following_topic        
        """
        raise NotImplementedError('type 구현이 필요합니다.')


class QuestionWroteOnFollowingTopic(Activity):
    following_topics = models.ManyToManyField(Topic, related_name='+')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '팔로우 한 주제 %s에 달린 질문: %s' % (queryset_to_string(self.following_topics.all()), self.question)

    @property
    def following_class(self):
        return Topic

    @property
    def content_class(self):
        return Question

    @property
    def type(self):
        return 'question_wrote_on_following_topic'


class AnswerWroteOnFollowingTopic(Activity):
    following_topics = models.ManyToManyField(Topic, related_name='+')
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '팔로우 한 주제 %s에 달린 답변: %s' % (queryset_to_string(self.following_topics.all()), self.answer)

    @property
    def following_class(self):
        return Topic

    @property
    def content_class(self):
        return Answer

    @property
    def type(self):
        return 'answer_wrote_on_following_topic'


class QuestionWroteByFollowingUser(Activity):
    following_users = models.ManyToManyField(get_user_model(), related_name='+')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '팔로우 한 유저 %s가 작성한 질문: %s' % (queryset_to_string(self.following_users.all()), self.question)

    @property
    def following_class(self):
        return get_user_model()

    @property
    def content_class(self):
        return Question

    @property
    def type(self):
        return 'question_wrote_by_following_user'


class AnswerWroteByFollowingUser(Activity):
    following_users = models.ManyToManyField(get_user_model(), related_name='+')
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '팔로우 한 유저 %s가 작성한 답변: %s' % (queryset_to_string(self.following_users.all()), self.answer)

    @property
    def following_class(self):
        return get_user_model()

    @property
    def content_class(self):
        return Answer

    @property
    def type(self):
        return 'answer_wrote_by_following_user'


class QuestionFollowedByFollowingUser(Activity):
    following_users = models.ManyToManyField(get_user_model(), related_name='+')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '팔로우 한 유저 %s가 팔로우한 질문: %s' % (queryset_to_string(self.following_users.all()), self.question)

    @property
    def following_class(self):
        return get_user_model()

    @property
    def content_class(self):
        return Question

    @property
    def type(self):
        return 'question_followed_by_following_user'


class AnswerLikedByFollowingUser(Activity):
    following_users = models.ManyToManyField(get_user_model(), related_name='+')
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '팔로우 한 유저 %s가 좋아요한 답변: %s' % (queryset_to_string(self.following_users.all()), self.answer)

    @property
    def following_class(self):
        return get_user_model()

    @property
    def content_class(self):
        return Answer

    @property
    def type(self):
        return 'answer_liked_by_following_user'


class AnswerChosenByEditorsByTopic(Activity):
    following_topics = models.ManyToManyField(Topic, related_name='+')
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '에디터가 주제 %s에서 고른 답변: %s' % (queryset_to_string(self.following_topics.all()), self.answer)

    @property
    def following_class(self):
        return Topic

    @property
    def content_class(self):
        return Answer

    @property
    def type(self):
        return 'answer_chosen_by_editors_by_topic'


class AnswerChosenByEditors(Activity):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '에디터가 고른 답변: %s' % (self.answer)

    @property
    def following_class(self):
        return None

    @property
    def content_class(self):
        return Answer

    @property
    def type(self):
        return 'answer_chosen_by_editors'


class AnswerChosenByEditorsByTopicAdmin(models.Model):
    """AnswerChosenByEditors를 만들기 위한 원형.
    following_topics는 자동으로 답변의 질문의 주제들이 추가됨.
    이 모델이 어드민에서 추가되면 AnswerChosenByEditors(Activity)들이
    답변의 질문의 주제의 팔로워들에게 생성됨.
    """
    created = models.DateTimeField(auto_now_add=True)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='+')
    # Following_topics는 answer.question.topics가 자동으로 추가되며 임의로 다른 토픽을 추가할 수도 있음.
    # 다른 토픽이 추가되면 그 토픽의 팔로워들에게도 Activity들이 추가됨.
    topics = models.ManyToManyField(Topic, related_name='answer_chosen_by_editors_by_topic_admins',
                                    help_text='이 토픽들의 팔로워들에게 activity들이 자동으로 생성됩니다. 추가하지 않아도 자동으로 answer의 topic들이 추가되지만, 추가적으로 명시할 수 있습니다.')

    def __str__(self):
        return str(self.answer)


class AnswerChosenByEditorsAdmin(models.Model):
    """AnswerChosenByEditorsToAll을 만들기 위한 원형.
    이 모델이 어드민에서 추가되면 AnswerChosenByEditorsToAll(Activity)들이 모두에게 생성됨.
    """
    created = models.DateTimeField(auto_now_add=True)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return str(self.answer)


def queryset_to_string(queryset):
    if queryset.count() > 0:
        to_string = str(queryset[0])
        if queryset.count() > 1:
            for user in queryset[1:]:
                to_string = to_string + ', ' + str(user)
    else:
        to_string = ''

    return to_string
