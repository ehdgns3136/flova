from rest_framework import serializers
from .models import Notification, NewAnswerOnQuestionNotification, FollowYourQuestionNotification, \
    NewCommentOnYourQuestionNotification, LikeYourAnswerNotification, NewCommentOnYourAnswerNotification, \
    LikeYourQuestionCommentNotification, LikeYourAnswerCommentNotification, FollowYouNotification, \
    CustomNotification


class NewAnswerOnQuestionNotificationSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    recent_writer = serializers.SerializerMethodField()
    writer_count = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = NewAnswerOnQuestionNotification
        fields = ('id', 'added_time', 'read', 'question', 'recent_writer', 'writer_count', 'type')

    def get_question(self, obj):
        return {
            'id': obj.question.id,
            'title': obj.question.title,
        }

    def get_recent_writer(self, obj):
        return {
            'name': obj.recent_writer.name,
            'profile_image': obj.recent_writer.profile_image,
        }

    def get_writer_count(self, obj):
        return obj.writers.count()

    def get_type(self, obj):
        return 'NewAnswerOnQuestionNotification'


class FollowYourQuestionNotificationSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    recent_follower = serializers.SerializerMethodField()
    follower_count = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = FollowYourQuestionNotification
        fields = ('id', 'added_time', 'read', 'question', 'recent_follower', 'follower_count', 'type')

    def get_question(self, obj):
        return {
            'id': obj.question.id,
            'title': obj.question.title,
        }

    def get_recent_follower(self, obj):
        return {
            'name': obj.recent_follower.name,
            'profile_image': obj.recent_follower.profile_image,
        }

    def get_follower_count(self, obj):
        return obj.followers.count()

    def get_type(self, obj):
        return 'FollowYourQuestionNotification'


class NewCommentOnYourQuestionNotificationSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    recent_writer = serializers.SerializerMethodField()
    writer_count = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = NewCommentOnYourQuestionNotification
        fields = ('id', 'added_time', 'read', 'question', 'recent_writer', 'writer_count', 'type')

    def get_question(self, obj):
        return {
            'id': obj.question.id,
            'title': obj.question.title,
        }

    def get_recent_writer(self, obj):
        return {
            'name': obj.recent_writer.name,
            'profile_image': obj.recent_writer.profile_image,
        }

    def get_writer_count(self, obj):
        return obj.writers.count()

    def get_type(self, obj):
        return 'NewCommentOnYourQuestionNotification'


class LikeYourAnswerNotificationSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    answer = serializers.SerializerMethodField()
    recent_liker = serializers.SerializerMethodField()
    liker_count = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = LikeYourAnswerNotification
        fields = ('id', 'added_time', 'read', 'question', 'recent_liker', 'liker_count', 'type', 'answer')

    def get_question(self, obj):
        return {
            'title': obj.answer.question.title,
        }

    def get_answer(self, obj):
        return {
            'id': obj.answer.id,
        }

    def get_recent_liker(self, obj):
        return {
            'name': obj.recent_liker.name,
            'profile_image': obj.recent_liker.profile_image,
        }

    def get_liker_count(self, obj):
        return obj.likers.count()

    def get_type(self, obj):
        return 'LikeYourAnswerNotification'


class NewCommentOnYourAnswerNotificationSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    answer = serializers.SerializerMethodField()
    recent_writer = serializers.SerializerMethodField()
    writer_count = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = NewCommentOnYourAnswerNotification
        fields = ('id', 'added_time', 'read', 'question', 'recent_writer', 'writer_count', 'type', 'answer')

    def get_question(self, obj):
        return {
            'title': obj.answer.question.title,
        }

    def get_answer(self, obj):
        return {
            'id': obj.answer.id,
        }

    def get_recent_writer(self, obj):
        return {
            'name': obj.recent_writer.name,
            'profile_image': obj.recent_writer.profile_image,
        }

    def get_writer_count(self, obj):
        return obj.writers.count()

    def get_type(self, obj):
        return 'NewCommentOnYourAnswerNotification'


class LikeYourQuestionCommentNotificationSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    comment_content = serializers.SerializerMethodField()
    recent_liker = serializers.SerializerMethodField()
    liker_count = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = LikeYourQuestionCommentNotification
        fields = ('id', 'added_time', 'read', 'question', 'comment_content', 'recent_liker', 'liker_count', 'type')

    def get_question(self, obj):
        return {
            'id': obj.comment.question.id,
            'title': obj.comment.question.title,
        }

    def get_comment_content(self, obj):
        return obj.comment.content

    def get_recent_liker(self, obj):
        return {
            'name': obj.recent_liker.name,
            'profile_image': obj.recent_liker.profile_image,
        }

    def get_liker_count(self, obj):
        return obj.likers.count()

    def get_type(self, obj):
        return 'LikeYourQuestionCommentNotification'


class LikeYourAnswerCommentNotificationSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    answer = serializers.SerializerMethodField()
    comment_content = serializers.SerializerMethodField()
    recent_liker = serializers.SerializerMethodField()
    liker_count = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = LikeYourAnswerCommentNotification
        fields = ('id', 'added_time', 'read', 'question', 'comment_content', 'recent_liker', 'liker_count', 'type', 'answer')

    def get_question(self, obj):
        return {
            'title': obj.answer.question.title,
        }

    def get_answer(self, obj):
        return {
            'id': obj.answer.id,
        }

    def get_comment_content(self, obj):
        return obj.comment.content

    def get_recent_liker(self, obj):
        return {
            'name': obj.recent_liker.name,
            'profile_image': obj.recent_liker.profile_image,
        }

    def get_liker_count(self, obj):
        return obj.likers.count()

    def get_type(self, obj):
        return 'LikeYourAnswerCommentNotification'


class FollowYouNotificationSerializer(serializers.ModelSerializer):
    recent_follower = serializers.SerializerMethodField()
    follower_count = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = FollowYouNotification
        fields = ('id', 'added_time', 'read', 'recent_follower', 'follower_count', 'type')

    def get_recent_follower(self, obj):
        return {
            'id': obj.recent_follower.id,
            'name': obj.recent_follower.name,
            'profile_image': obj.recent_follower.profile_image,
        }

    def get_follower_count(self, obj):
        return obj.followers.count()

    def get_type(self, obj):
        return 'FollowYouNotification'


class CustomNotificationSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = CustomNotification
        fields = ('id', 'added_time', 'read', 'text', 'image', 'destination_path', 'type')

    def get_type(self, obj):
        return 'CustomNotification'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    def to_representation(self, obj):
        if isinstance(obj, NewAnswerOnQuestionNotification):
            return NewAnswerOnQuestionNotificationSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, FollowYourQuestionNotification):
            return FollowYourQuestionNotificationSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, NewCommentOnYourQuestionNotification):
            return NewCommentOnYourQuestionNotificationSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, LikeYourAnswerNotification):
            return LikeYourAnswerNotificationSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, NewCommentOnYourAnswerNotification):
            return NewCommentOnYourAnswerNotificationSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, LikeYourQuestionCommentNotification):
            return LikeYourQuestionCommentNotificationSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, LikeYourAnswerCommentNotification):
            return LikeYourAnswerCommentNotificationSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, FollowYouNotification):
            return FollowYouNotificationSerializer(obj, context=self.context).to_representation(obj)
        elif isinstance(obj, CustomNotification):
            return CustomNotificationSerializer(obj, context=self.context).to_representation(obj)
        return super(NotificationSerializer, self).to_representation(obj)