from rest_framework import serializers
from .models import Activity
from contents.serializers import QuestionListSerializer, AnswerListSerializer
from contents.models import Question, Answer
from topic.serializers import TopicSerializer
from topic.models import Topic
from django.contrib.auth import get_user_model
from user.serializers import UserInfoSerializer


class ActivitySerializer(serializers.ModelSerializer):
    content_class = serializers.SerializerMethodField()

    def get_content_class(self, instance):
        return instance.content_class.__name__

    class Meta:
        model = Activity
        fields = ('id', 'created', 'content_class', 'type',)


class ActivityListSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        activity = Activity.objects.get_subclass(id=instance.id)
        if activity.content_class == Question:
            serialized_data = QuestionListSerializer(activity.question, context=self.context).data
        elif activity.content_class == Answer:
            serialized_data = AnswerListSerializer(activity.answer, context=self.context).data

        serialized_activity = ActivitySerializer(activity).data
        if activity.following_class == Topic:
            serialized_activity['following_topics'] = TopicSerializer(activity.following_topics, many=True,
                                                                      context=self.context).data
        elif activity.following_class == get_user_model():
            serialized_activity['following_users'] = UserInfoSerializer(activity.following_users, many=True,
                                                                        context=self.context).data
        elif activity.following_class is None:
            pass
        else:
            raise NotImplementedError('following_class에 대한 ActivityListSerializer의 to_representation이 구현되지 않았습니다.')

        return {
            'activity_data': serialized_activity,
            **serialized_data,
        }

    class Meta:
        model = Activity
        fields = '__all__'
