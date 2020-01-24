from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .serializers import UserSerializer, UserDetailSerializer, UserInfoSerializer
from credential.serializers import CredentialSerializer
from credential.models import Credential
from django.contrib.auth import get_user_model
from contents.serializers import AnswerListSerializer, QuestionListSerializer, BookmarkSerializer
from .models import User, Subscription
from django.shortcuts import get_object_or_404
from feed.paginations import FeedPagination
from topic.serializers import TopicSerializer
from oauth2client import client, crypt
from django.utils.crypto import get_random_string
from django.utils import timezone
from django.core.mail import EmailMultiAlternatives
import datetime
import urllib3
import json
import hashlib
from wonder_server.settings import WEB_URL_ROOT, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET
from .permissions import IsSelf, NotSelf
from s3.views import upload_profile_to_s3
from .models import InviteKey

@api_view(['POST'])
def user_register(request):
    """
    post:
    회원가입
    """
    if request.method == 'POST':
        data = request.data
        serializer = UserSerializer(data=data)

        if serializer.is_valid() and 'password' in data and 'email' in data:
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response(data={'token': token.key, 'user_name': user.name}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def social_user_continue(request):
    """
    post:
     소셜유저 회원가입 또는 로그인
     회원가입 시에는 데이터에 name 프로퍼티와 로그인하려는 플랫폼의 엑세스 토큰이 있어야 함
     로그인 시에는 로그인하려는 플랫폼의 엑세스 토큰이 있어야 함
    """
    if request.method == 'POST':
        data = request.data
        http = urllib3.PoolManager()

        if 'token_type' in data:
            if data['token_type'] == 'facebook':
                client_token = data['client_token']
                app_id = FACEBOOK_APP_ID
                app_secret = FACEBOOK_APP_SECRET

                # Client Token으로 Access Token 가져오기
                response = http.request('GET',
                                        'https://graph.facebook.com/oauth/access_token?client_id=' + app_id + '&client_secret=' + app_secret + '&grant_type=client_credentials')
                json_response = json.loads(response.data.decode('utf-8'))
                app_token = json_response['access_token']

                # Access Token 유효한지 검증
                response = http.request('GET',
                                        'https://graph.facebook.com/debug_token?input_token=' + client_token + '&access_token=' + app_token)
                json_response = json.loads(response.data.decode('utf-8'))
                if response.status is not 200 and json_response['is_valid'] is not True:
                    return Response('잘못된 토큰입니다.', status=status.HTTP_400_BAD_REQUEST)

                # 유효하다면 이름과 user id, 프로필 사진 가져오기
                response = http.request('GET', 'https://graph.facebook.com/me?locale=ko_KR&access_token=' + client_token)
                json_response = json.loads(response.data.decode('utf-8'))
                name = json_response['name']
                user_id = json_response['id']
                response = http.request('GET', 'https://graph.facebook.com/v2.10/me/picture?width=9999&redirect=false&access_token=' + client_token)
                json_response = json.loads(response.data.decode('utf-8'))
                json_response = json_response['data']
                is_silhouette = json_response['is_silhouette']
                if is_silhouette:
                    profile_image = ''
                else:
                    profile_image = json_response['url']
                    profile_image = upload_profile_to_s3(profile_image, 'url')

                if User.objects.filter(facebook_id=user_id).exists():
                    user = User.objects.get(facebook_id=user_id)
                    token, created = Token.objects.get_or_create(user=user)
                    return Response(data={'token': token.key, 'user_name': user.name, 'new_user': False},
                                    status=status.HTTP_200_OK)

                user = User.objects.create_social_user(name=name, facebook_id=user_id, profile_image=profile_image)

                response = http.request('GET', 'https://graph.facebook.com/me/friends?access_token=' + client_token)
                json_response = json.loads(response.data.decode('utf-8'))
                for i in range(0, len(json_response['data'])):
                    friend_id = json_response['data'][i]['id']
                    if User.objects.filter(facebook_id=friend_id).exists():
                        friend = User.objects.get(facebook_id=friend_id)
                        result = user.follow_or_unfollow(friend)
                        if result is None:
                            return Response('잘못된 접근입니다.', status.HTTP_400_BAD_REQUEST)

                token, created = Token.objects.get_or_create(user=user)
                return Response(data={'token': token.key, 'user_name': user.name, 'new_user': True},
                                status=status.HTTP_201_CREATED)

            elif data['token_type'] == 'kakao':
                client_token = data['client_token']
                response = http.request('GET', 'https://kapi.kakao.com/v1/user/me?access_token=' + client_token)
                json_response = json.loads(response.data.decode('utf-8'))

                user_id = json_response['id']
                name = json_response['properties']['nickname']
                profile_image = json_response['properties']['profile_image']

                if profile_image is not None:
                    profile_image = upload_profile_to_s3(profile_image, 'url')
                else:
                    profile_image = ''

                if User.objects.filter(kakao_id=user_id).exists():
                    user = User.objects.get(kakao_id=user_id)
                    token, created = Token.objects.get_or_create(user=user)
                    return Response(data={'token': token.key, 'user_name': user.name, 'new_user': False},
                                    status=status.HTTP_200_OK)

                user = User.objects.create_social_user(name=name, kakao_id=user_id, profile_image=profile_image)

                token, created = Token.objects.get_or_create(user=user)
                return Response(data={'token': token.key, 'user_name': user.name, 'new_user': True},
                                status=status.HTTP_201_CREATED)

            elif data['token_type'] == 'google':
                try:
                    client_token = data['client_token']
                    client_id = '112070089622-35hq97huegonici7mf0nud5k03s9fijv.apps.googleusercontent.com'
                    idinfo = client.verify_id_token(client_token, client_id)
                    if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                        raise crypt.AppIdentityError("Wrong issuer.")

                except crypt.AppIdentityError:
                    return Response('잘못된 토큰입니다.', status=status.HTTP_400_BAD_REQUEST)

                response = http.request('GET',
                                        'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + client_token)
                json_response = json.loads(response.data.decode('utf-8'))
                user_id = json_response['sub']
                name = json_response['name']
                profile_image = json_response['picture']

                if profile_image is not None:
                    profile_image = upload_profile_to_s3(profile_image, 'url')
                else:
                    profile_image = ''

                if User.objects.filter(google_id=user_id).exists():
                    user = User.objects.get(google_id=user_id)
                    token, created = Token.objects.get_or_create(user=user)
                    return Response(data={'token': token.key, 'user_name': user.name, 'new_user': False},
                                    status=status.HTTP_200_OK)

                user = User.objects.create_social_user(name=name, google_id=user_id, profile_image=profile_image)
                token, created = Token.objects.get_or_create(user=user)
                return Response(data={'token': token.key, 'user_name': user.name, 'new_user': True},
                                status=status.HTTP_201_CREATED)

        return Response('잘못된 요청입니다.', status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response(data={'token': token.key, 'user_name': user.name}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    return Response(data=UserInfoSerializer(request.user).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_credentials(request):
    credentials = request.user.credentials.all()
    serializer = CredentialSerializer(credentials.select_subclasses(), many=True)

    education_credentials = []
    employment_credentials = []
    text_credentials = []

    for credential in serializer.data:
        if credential['type'] == 'education':
            education_credentials.append(credential)
        elif credential['type'] == 'employment':
            employment_credentials.append(credential)
        elif credential['type'] == 'text':
            text_credentials.append(credential)

    credentials = {'education': education_credentials, 'employment': employment_credentials, 'text': text_credentials}
    return Response(data=credentials, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile_image(request):
    user = request.user
    user.profile_image = request.data['profile_image']
    user.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_credential_to_description(request):
    user = request.user
    if not Credential.objects.filter(id=request.data['id']).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)
    credential = Credential.objects.get_subclass(id=request.data['id'])
    user.description = str(credential)
    user.save()
    return Response(data=str(credential), status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    serializer = UserSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(data=UserInfoSerializer(request.user).data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(generics.RetrieveAPIView):
    """
    View for Profile Page.
    """
    queryset = get_user_model().objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (AllowAny,)


class UserWrittenAnswers(generics.ListAPIView):
    """
    유저가 쓴 답변들을 보여줌.
    """
    serializer_class = AnswerListSerializer
    permission_classes = (AllowAny,)
    pagination_class = FeedPagination

    def get_queryset(self):
        return get_object_or_404(get_user_model(), id=self.kwargs['pk']).written_answers


class UserFollowingQuestions(generics.ListAPIView):
    """
    유저가 팔로우하고 있는 질문들을 보여줌.
    """
    serializer_class = QuestionListSerializer
    permission_classes = (IsSelf,)
    pagination_class = FeedPagination

    def get_queryset(self):
        return self.request.user.following_questions.all()


class UserWrittenQuestions(generics.ListAPIView):
    """
    유저가 쓴 질문들을 보여줌.
    """

    serializer_class = QuestionListSerializer
    permission_classes = (AllowAny,)
    pagination_class = FeedPagination

    def get_queryset(self):
        user = get_object_or_404(get_user_model(), id=self.kwargs['pk'])
        if user == self.request.user:
            return user.written_questions.all()
        else:
            return user.written_questions.all().exclude(anonymous=True)


class UserFollowingTopics(generics.ListAPIView):
    """
    유저가 팔로우한 토픽들.
    """

    serializer_class = TopicSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        return get_object_or_404(get_user_model(), id=self.kwargs['pk']).topics.all()


class UserBookmarkContents(generics.ListAPIView):
    """
    유저가 북마크한 컨텐츠들을 보여줌.
    """
    serializer_class = BookmarkSerializer
    permission_classes = (IsSelf,)

    def get_queryset(self):
        return self.request.user.bookmark_contents.all().select_subclasses()


class UserFollowers(generics.ListAPIView):
    """
    유저를 팔로우하고 있는 유저들을 보여줌.
    """
    serializer_class = UserInfoSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        return get_object_or_404(get_user_model(), id=self.kwargs['pk']).followers.all()


class UserFollowingUsers(generics.ListAPIView):
    """
    유저가 팔로우하고 있는 유저들을 보여줌.
    """
    serializer_class = UserInfoSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        return get_object_or_404(get_user_model(), id=self.kwargs['pk']).following_users.all()


def generate_activation_key(name):
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    secret_key = get_random_string(20, chars)
    return hashlib.sha256((secret_key + name).encode('utf-8')).hexdigest()


@api_view(['POST'])
@permission_classes([AllowAny])
def check_email_exist(request):
    data = request.data
    email = data['email']
    if User.objects.filter(email=email).exists():
        user = User.objects.get(email=email)
        user.password_reset_key = generate_activation_key(user.name)
        user.password_reset_key_expires = datetime.datetime.strftime(
            datetime.datetime.now() + datetime.timedelta(hours=2),
            "%Y-%m-%d %H:%M:%S")
        user.save()

        subject, from_email, to = 'FLOVA 비밀번호', 'info@flova.kr', user.email
        link = WEB_URL_ROOT + '/intro/password_reset/' + user.password_reset_key
        html_content = '<p>아래 링크에서 비밀번호를 재설정하세요.</p><a href="' + link + '">' + link + '</a>'
        msg = EmailMultiAlternatives(subject, '', from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def validate_password_reset_key(request):
    data = request.data
    password_reset_key = data['key']
    if User.objects.filter(password_reset_key=password_reset_key).exists():
        user = User.objects.get(password_reset_key=password_reset_key)
        return Response({'email': user.email}, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    data = request.data
    password = data['password']
    password_reset_key = data['key']
    if User.objects.filter(password_reset_key=password_reset_key).exists():
        user = User.objects.get(password_reset_key=password_reset_key)
        if timezone.now() < user.password_reset_key_expires:
            user.password_reset_key = ''
            user.set_password(password)
            user.save()
            return Response(status=status.HTTP_200_OK)
        return Response('인증 키가 만료되었습니다. FLOVA에 새 링크를 요청해주세요.', status=status.HTTP_400_BAD_REQUEST)
    return Response('인증 키가 일치하지 않습니다. FLOVA에 새 링크를 요청해주세요.', status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', ])
@permission_classes([IsAuthenticated, NotSelf])
def follow_user(request, pk):
    """
    유저를 팔로우하기. \n
    :return { \n
        "following": request.user가 follow 후 follow 중인지 아닌지, \n
        "follower_num": id=pk인 유저의 follow 후 follower 수. \n
     }
    """
    follower = request.user
    followed = get_object_or_404(get_user_model(), id=pk)
    result = follower.follow_or_unfollow(followed)
    if result is not None:
        return Response(data=result, status=status.HTTP_200_OK)
    return Response('잘못된 접근입니다.', status.HTTP_400_BAD_REQUEST)


@api_view(['POST', ])
@permission_classes([IsAuthenticated])
def create_invite_key(request):
    """
    invite key 만들기. \n
    :request { \n
        'invited_name': 초대할 사람의 이름을 입력(필수). \n
    }
    """
    if request.method == 'POST':
        if 'invited_name' in request.data:
            invite_key = InviteKey.objects.create_invite_key(creator=request.user, **request.data)
            return Response({
                'invite_key': str(invite_key.key.hex),
            }, status=status.HTTP_201_CREATED)
        return Response({'detail': '초대할 사람의 이름을 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', ])
@permission_classes([AllowAny, ])
def validate_invite_key(request):
    """
    Invite Key 확인
    :param request: { \n
        'invite_key' \n
     } \n
    :return: { \n
        'invited_name',
     }
    """
    if request.method == 'POST':
        if 'invite_key' in request.data:
            invite_key = InviteKey.objects.get_key_or_404(key=request.data['invite_key'])
            return Response({
                'invited_name': invite_key.invited_name
            }, status=status.HTTP_200_OK)
        return Response({'detail': 'key를 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', ])
@permission_classes([IsAuthenticated])
def save_subscription(request):
    Subscription.objects.create(user=request.user,
                                endpoint=request.data['endpoint'],
                                p256dh=request.data['keys']['p256dh'],
                                auth=request.data['keys']['auth'])
    return Response(status=status.HTTP_200_OK)


@api_view(['POST', ])
@permission_classes([IsAuthenticated])
def delete_subscription(request):
    Subscription.objects.filter(endpoint=request.data).delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def set_first_answerer_false(request):
    if request.user.first_answerer:
        request.user.first_answerer = False
        request.user.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def check_social_user_exist(request):
    data = request.data
    http = urllib3.PoolManager()
    if data['type'] == 'facebook':

        client_token = data['token']
        app_id = FACEBOOK_APP_ID
        app_secret = FACEBOOK_APP_SECRET

        # Client Token으로 Access Token 가져오기
        response = http.request('GET',
                                'https://graph.facebook.com/oauth/access_token?client_id=' + app_id + '&client_secret=' + app_secret + '&grant_type=client_credentials')
        json_response = json.loads(response.data.decode('utf-8'))
        app_token = json_response['access_token']

        # Access Token 유효한지 검증
        response = http.request('GET',
                                'https://graph.facebook.com/debug_token?input_token=' + client_token + '&access_token=' + app_token)
        json_response = json.loads(response.data.decode('utf-8'))
        if response.status is not 200 and json_response['is_valid'] is not True:
            return Response('잘못된 토큰입니다.', status=status.HTTP_400_BAD_REQUEST)

        # 유효하다면 이름과 user id, 프로필 사진 가져오기
        response = http.request('GET',
                                'https://graph.facebook.com/me?locale=ko_KR&access_token=' + client_token)
        json_response = json.loads(response.data.decode('utf-8'))
        user_id = json_response['id']
        return Response({'exist': User.objects.filter(facebook_id=user_id).exists()}, status=status.HTTP_200_OK)
    elif data['type'] == 'kakao':
        client_token = data['token']
        response = http.request('GET', 'https://kapi.kakao.com/v1/user/me?access_token=' + client_token)
        json_response = json.loads(response.data.decode('utf-8'))

        user_id = json_response['id']
        return Response({'exist': User.objects.filter(kakao_id=user_id).exists()}, status=status.HTTP_200_OK)
    elif data['type'] == 'google':
        try:
            client_token = data['token']
            client_id = '112070089622-35hq97huegonici7mf0nud5k03s9fijv.apps.googleusercontent.com'
            idinfo = client.verify_id_token(client_token, client_id)
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise crypt.AppIdentityError("Wrong issuer.")

        except crypt.AppIdentityError:
            return Response('잘못된 토큰입니다.', status=status.HTTP_400_BAD_REQUEST)

        response = http.request('GET',
                                'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + client_token)
        json_response = json.loads(response.data.decode('utf-8'))
        user_id = json_response['sub']
        
        return Response({'exist': User.objects.filter(google_id=user_id).exists()}, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
