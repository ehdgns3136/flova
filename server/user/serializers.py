from rest_framework import serializers
import re
from .models import User, InviteKey, Subscription
from credential.models import EducationCredential, EmploymentCredential, TextCredential
from credential.serializers import CredentialSerializer


class UserSerializer(serializers.ModelSerializer):
    invite_key = serializers.CharField(write_only=True, allow_null=True, required=False)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def validate_password(self, value):
        if len(value) < 6 or len(value) > 16:
            raise serializers.ValidationError("비밀번호가 유효하지 않습니다.")

        pattern = r"(?=.*[a-zA-Z])(?=.*[0-9])^[a-zA-Z0-9!@#\$%\^&\*]+$"
        if re.fullmatch(pattern, value) is None:
            raise serializers.ValidationError("비밀번호가 유효하지 않습니다.")

        return value

    def validate_name(self, value):
        pattern = r"(?=.*[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣])^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣 ]+$"
        if re.fullmatch(pattern, value) is None:
            raise serializers.ValidationError("이름이 유효하지 않습니다.")

        return value


class UserInfoSerializer(serializers.ModelSerializer):
    """
    **Read Only**
    Used at everywhere except profile editing.
    """
    is_following = serializers.SerializerMethodField()

    def get_is_following(self, obj):
        if self.context is not None and 'request' in self.context:
            requested_user = self.context['request'].user
            if requested_user == obj:
                return None
            else:
                return obj.followers.all().filter(id=requested_user.id).exists()
        return None

    class Meta:
        model = User
        fields = ('id', 'name', 'description', 'profile_image', 'answer_num', 'answer_likes', 'follower_num',
                  'string_credentials', 'is_following', 'is_staff', 'first_answerer')


class UserDetailSerializer(serializers.ModelSerializer):
    """
    **Read Only**
    Used at Profile Page
    """
    education = serializers.SerializerMethodField()
    employment = serializers.SerializerMethodField()
    text = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    question_num = serializers.SerializerMethodField()

    def get_education(self, obj):
        serialized_credentials = []
        for credential in obj.credentials.all().select_subclasses():
            if isinstance(credential, EducationCredential):
                serialized_credentials.append(CredentialSerializer(credential).data)
        return serialized_credentials

    def get_employment(self, obj):
        serialized_credentials = []
        for credential in obj.credentials.all().select_subclasses():
            if isinstance(credential, EmploymentCredential):
                serialized_credentials.append(CredentialSerializer(credential).data)
        return serialized_credentials

    def get_text(self, obj):
        serialized_credentials = []
        for credential in obj.credentials.all().select_subclasses():
            if isinstance(credential, TextCredential):
                serialized_credentials.append(CredentialSerializer(credential).data)
        return serialized_credentials

    def get_is_following(self, obj):
        if self.context is not None and 'request' in self.context:
            requested_user = self.context['request'].user
            if requested_user == obj:
                return None
            else:
                return obj.followers.all().filter(id=self.context['request'].user.id).exists()
        return None

    def get_question_num(self, obj):
        if self.context is not None and 'request' in self.context:
            requested_user = self.context['request'].user
            if requested_user == obj:
                return obj.written_questions.all().count()
            else:
                return obj.written_questions.all().exclude(anonymous=True).count()
        return None

    class Meta:
        model = User
        fields = ('id', 'answer_num', 'follower_num', 'following_num', 'name'
                  , 'description', 'education', 'employment', 'text', 'string_credentials', 'profile_image',
                  'is_following', 'answer_likes', 'question_num', 'topic_num', 'following_question_num',
                  'bookmark_contents_num')
