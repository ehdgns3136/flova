from rest_framework import serializers
from topic.models import Topic
from topic.serializers import TopicSerializer
from user.serializers import UserInfoSerializer
from user.models import User
from .models import Question, Answer, QuestionComment, AnswerComment, Bookmark, QuestionBookmark, AnswerBookmark


class QuestionCommentSerializer(serializers.ModelSerializer):
    writer = UserInfoSerializer(read_only=True)

    def to_representation(self, instance):
        data = super(QuestionCommentSerializer, self).to_representation(instance)
        data.update({
            'writer': UserInfoSerializer(instance.writer).data,
        })
        if 'request' in self.context:
            requested_user = self.context['request'].user
            data['is_liked'] = instance.liked_users.all().filter(id=requested_user.id).exists()
            data['is_mine'] = (instance.writer == requested_user)

        return data

    class Meta:
        model = QuestionComment
        fields = ('id', 'content', 'liked_num', 'created', 'writer')


class AnswerCommentSerializer(serializers.ModelSerializer):
    writer = UserInfoSerializer(read_only=True)

    def to_representation(self, instance):
        data = super(AnswerCommentSerializer, self).to_representation(instance)
        data.update({
            'writer': UserInfoSerializer(instance.writer).data,
        })
        if 'request' in self.context:
            requested_user = self.context['request'].user
            data['is_liked'] = instance.liked_users.all().filter(id=requested_user.id).exists()
            data['is_mine'] = (instance.writer == requested_user)

        return data

    class Meta:
        model = AnswerComment
        fields = ('id', 'content', 'liked_num', 'created', 'writer')


class AnswerSerializer(serializers.ModelSerializer):
    liked_num = serializers.IntegerField(read_only=True)
    writer = UserInfoSerializer(read_only=True)
    question = serializers.PrimaryKeyRelatedField(read_only=True)
    comment_num = serializers.IntegerField(read_only=True)

    def to_representation(self, instance):
        data = super(AnswerSerializer, self).to_representation(instance)

        data.update({
            'comments': []  # 처음에 빈 리스트를 줘야 나중에 프론트에서 comments 추가로 받아올 때 편하게 받아올 수 있음
        })
        if 'request' in self.context:
            requested_user = self.context['request'].user
            data['is_mine'] = (instance.writer == requested_user)
            data['is_liked'] = instance.liked_users.all().filter(id=requested_user.id).exists()
            data['is_downvoted'] = instance.downvoted_users.all().filter(id=requested_user.id).exists()
            data['is_bookmark'] = instance.bookmark_answers.filter(user=requested_user.id).exists()

        return data

    class Meta:
        model = Answer
        fields = ('id', 'liked_num', 'content', 'question',
                  'writer', 'created', 'modified', 'comment_num')


class QuestionSerializer(serializers.ModelSerializer):
    writer = UserInfoSerializer(read_only=True)
    topics = serializers.PrimaryKeyRelatedField(many=True, queryset=Topic.objects.all(), required=False)
    followed_num = serializers.IntegerField(read_only=True)
    comment_num = serializers.IntegerField(read_only=True)
    anonymous = serializers.BooleanField(required=False)
    answer_num = serializers.IntegerField(read_only=True)

    def to_representation(self, instance):
        data = super(QuestionSerializer, self).to_representation(instance)

        if instance.anonymous:
            data.pop('writer')

        data.update({
            'topics': TopicSerializer(instance.topics, many=True).data,
            'comments': [],
        })

        if 'request' in self.context:
            requested_user = self.context['request'].user
            data['is_mine'] = (requested_user == instance.writer)
            data['is_followed'] = instance.followers.filter(id=requested_user.id).exists()
            data['is_bookmark'] = instance.bookmark_questions.filter(user=requested_user.id).exists()

            my_answer = instance.answers.filter(writer=requested_user.id).first()
            if my_answer is None:
                data['is_answered'] = False
            else:
                data['is_answered'] = True
                data['my_answer'] = {
                    'id': my_answer.id,
                    'content': my_answer.content,
                }

        return data

    class Meta:
        model = Question
        fields = ('id', 'writer', 'content', 'created', 'modified',
                  'topics', 'followed_num', 'anonymous',
                  'title', 'comment_num', 'answer_num', 'last_answer_date')


class QuestionListSerializer(serializers.ModelSerializer):
    """
    **Read Only**
    Usage: on feed.
    """

    def to_representation(self, instance):
        return {
            'content': {
                'question': QuestionSerializer(instance, context=self.context).data,
                'answer': None,
            }
        }

    class Meta:
        model = Question
        fields = '__all__'


class BestAnswerQuestionListSerializer(serializers.ModelSerializer):
    """
        **Read Only**
        Usage: on feed.
        """

    def to_representation(self, instance):
        best_answer = instance.best_answer()

        return {
            'content': {
                'question': QuestionSerializer(instance, context=self.context).data,
                'answer': AnswerSerializer(best_answer, context=self.context).data if best_answer else None,
            }
        }

    class Meta:
        model = Question
        fields = '__all__'


class AnswerListSerializer(serializers.ModelSerializer):
    """
    **Read Only**
    Usage: On feed.
    """

    def to_representation(self, instance):
        return {
            'content': {
                'question': QuestionSerializer(instance.question, context=self.context).data,
                'answer': AnswerSerializer(instance, context=self.context).data,
            }
        }

    class Meta:
        model = Answer
        fields = '__all__'


class BookmarkSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        if isinstance(instance, QuestionBookmark):
            return QuestionBookmarkSerializer(instance, context=self.context).to_representation(instance)
        elif isinstance(instance, AnswerBookmark):
            return AnswerBookmarkSerializer(instance, context=self.context).to_representation(instance)
        return super(BookmarkSerializer, self).to_representation(instance)

    class Meta:
        model = Bookmark
        fields = '__all__'


class QuestionBookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBookmark
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'content': {
                'question': QuestionSerializer(instance.question, context=self.context).data,
                'answer': None,
            }
        }


class AnswerBookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerBookmark
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'content': {
                'question': QuestionSerializer(instance.answer.question, context=self.context).data,
                'answer': AnswerSerializer(instance.answer, context=self.context).data,
            }
        }


class QuestionMetaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question

    def to_representation(self, instance):
        meta_tag = {
            'title': instance.title,
            'description': instance.content,
            'image': '',
        }

        if instance.topics.exists():
            for topic in instance.topics.all():
                if topic.topic_image is not '':
                    meta_tag['image'] = topic.topic_image
                    break
        return meta_tag


class AnswerMetaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer

    def to_representation(self, instance):
        meta_tag = {
            'title': instance.question.title,
            'writer': instance.writer.name,
            'description': instance.content,
            'image': '',
        }

        if instance.question.topics.exists():
            for topic in instance.question.topics.all():
                if topic.topic_image is not '':
                    meta_tag['image'] = topic.topic_image
                    break
        return meta_tag
