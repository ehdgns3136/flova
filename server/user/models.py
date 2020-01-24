from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from topic.models import Topic
from .manager import UserManager, InviteKeyManager
import uuid
from credential.models import Credential, EducationCredential, EmploymentCredential, TextCredential

class User(AbstractBaseUser, PermissionsMixin):
    # Primitive Fields
    email = models.EmailField(unique=True, error_messages={'unique': '해당 이메일로 가입된 계정이 이미 있습니다.'}, null=True, blank=True)
    name = models.CharField(max_length=100)
    password = models.CharField(_('password'), max_length=128, blank=True)
    first_answerer = models.BooleanField(default=True)

    # Relative Fields
    topics = models.ManyToManyField(Topic, blank=True, related_name='followers')
    followers = models.ManyToManyField('User', related_name='following_users', blank=True)
    credentials = models.ManyToManyField(Credential, blank=True, related_name='user')
    description = models.CharField(max_length=100, blank=True)
    profile_image = models.URLField(blank=True)

    # social platform
    facebook_id = models.CharField(max_length=100, blank=True)
    kakao_id = models.CharField(max_length=100, blank=True)
    google_id = models.CharField(max_length=100, blank=True)

    # Email Verification
    # activation_key = models.CharField(max_length=64, blank=True)
    # activation_key_expires = models.DateTimeField(null=True)

    # Password Reset Verification
    password_reset_key = models.CharField(max_length=64, blank=True, null=True)
    password_reset_key_expires = models.DateTimeField(null=True, blank=True)

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    USERNAME_FIELD = 'email'
    objects = UserManager()

    def __str__(self):
        return str(self.name)

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def answer_num(self):
        return self.written_answers.all().count()

    def answer_likes(self):
        likes = 0
        for answer in self.written_answers.all():
            likes = likes + answer.liked_users.all().count()
        return likes

    def follower_num(self):
        return self.followers.all().count()

    def following_num(self):
        return self.following_users.all().count()

    def following_question_num(self):
        return self.following_questions.all().count()

    def question_num(self):
        return self.written_questions.all().count()

    def topic_num(self):
        return self.topics.all().count()

    def bookmark_contents_num(self):
        return self.bookmark_contents.all().count()

    def string_credentials(self):
        serialized_credentials = []
        for credential in self.credentials.all().select_subclasses():
            if isinstance(credential, EducationCredential):
                serialized_credentials.append({
                    'id': credential.id,
                    'to_string': str(credential),
                    'type': 'education'
                })
            elif isinstance(credential, EmploymentCredential):
                serialized_credentials.append({
                    'id': credential.id,
                    'to_string': str(credential),
                    'type': 'employment'
                })
            elif isinstance(credential, TextCredential):
                serialized_credentials.append({
                    'id': credential.id,
                    'to_string': str(credential),
                    'type': 'text'
                })

            if len(serialized_credentials) == 5:
                break
        return serialized_credentials

    def follow_or_unfollow(self, user_to_follow):
        if self.id == user_to_follow.id:
            return None

        if self.following_users.filter(id=user_to_follow.id).exists():
            self.following_users.remove(user_to_follow)
            return {
                'is_following': False,
                'follower_num': user_to_follow.follower_num(),
            }
        else:
            self.following_users.add(user_to_follow)
            return {
                'is_following': True,
                'follower_num': user_to_follow.follower_num(),
            }


class InviteKey(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invite_keys')
    key = models.UUIDField(default=uuid.uuid4, editable=False)
    invited_name = models.CharField(max_length=100, blank=False)

    objects = InviteKeyManager()

    def use(self):
        return self.delete()

    def __str__(self):
        return 'for %s created by %s; %s' % (self.invited_name, self.creator.name, self.key)


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    endpoint = models.CharField(blank=False, max_length=1000)
    p256dh = models.CharField(blank=False, max_length=1000)
    auth = models.CharField(blank=False, max_length=1000)

    def __str__(self):
        return self.user.name
