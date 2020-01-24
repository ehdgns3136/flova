from rest_framework import serializers
from .models import Topic


class TopicSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super(TopicSerializer, self).to_representation(instance)

        if self.context is not None and 'request' in self.context:
            user = self.context['request'].user
            if not user.is_anonymous():
                if user.topics.all().filter(id=instance.id).exists():
                    data['is_following'] = True
                else:
                    data['is_following'] = False

        return data

    class Meta:
        model = Topic
        fields = ('id', 'topic_image', 'title', 'followed_num', 'description', 'question_num', 'answer_num')
