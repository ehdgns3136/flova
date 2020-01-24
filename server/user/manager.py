from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.http import Http404
from django.conf import settings
from rest_framework.exceptions import ValidationError


class UserManager(BaseUserManager):
    """
    A custom user manager to deal with emails as unique identifiers for auth
    instead of usernames. The default that's used is "UserManager"
    """

    def check_and_use_invite_key(self, invite_key):
        from .models import InviteKey

        if settings.SIGNUP_MODE == 'INVITE_ONLY':
            if invite_key is not None:
                InviteKey.objects.get_key_or_404(key=invite_key).use()
            else:
                raise ValidationError({
                        'code': 'NEED_INVITEMENT',
                        'detail': '가입하려면 초대장이 필요합니다.'
                    })
            
        elif settings.SIGNUP_MODE == 'CLOSED':
            raise ValidationError({'detail': '현재 가입이 불가능한 상태입니다.'})
        elif settings.SIGNUP_MODE == 'OPENED':
            if invite_key is not None:
                InviteKey.objects.get_key_or_404(key=invite_key).use()
        else:
            raise NotImplementedError({'detail': 'SIGNUP_MODE를 설정해주세요.'})

    def create_user(self, email, password, invite_key=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')

        if not ('is_superuser' in extra_fields and extra_fields['is_superuser']):
            self.check_and_use_invite_key(invite_key)

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

    def create_social_user(self, invite_key=None, **extra_fields):
        if 'name' not in extra_fields:
            raise ValueError('The Name must be set')

        self.check_and_use_invite_key(invite_key)

        user = self.model(email=None, **extra_fields)
        user.save()
        return user


class InviteKeyManager(models.Manager):
    def create_invite_key(self, creator, **kwargs):
        invite_key = self.create(creator=creator, **kwargs)
        return invite_key

    def get_key_or_404(self, key):
        try:
            return self.get(key=key)
        except:
            raise Http404()
