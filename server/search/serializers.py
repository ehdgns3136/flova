from rest_framework import serializers
from topic.models import Topic
from contents.models import Question, Answer
from credential.models import Concentration, Role
from user.models import User


class QuestionSearchSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    def get_type(self, obj):
        return 'question'

    class Meta:
        model = Question
        fields = ['id', 'title', 'content', 'created', 'answer_num', 'followed_num', 'type']


class AnswerSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'content', 'created']


class TopicSearchSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    def get_type(self, obj):
        return 'topic'

    class Meta:
        model = Topic
        fields = ['id', 'title', 'topic_image', 'type', 'followed_num']


class ConcentrationSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concentration
        fields = ['id', 'title']


class RoleSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'title']


class UserSearchSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    def get_type(self, obj):
        return 'user'

    class Meta:
        model = User
        fields = ['id', 'name', 'type', 'description', 'profile_image', 'follower_num']
