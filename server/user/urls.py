from django.conf.urls import url
from .views import user_register, login, get_user_info, get_user_credentials, update_profile_image, \
    make_credential_to_description, UserDetail, UserWrittenAnswers, UserFollowingQuestions, UserFollowingTopics, \
    UserWrittenQuestions, social_user_continue, check_email_exist, validate_password_reset_key, \
    reset_password, update_profile, follow_user, create_invite_key, validate_invite_key, UserBookmarkContents, \
    UserFollowers, UserFollowingUsers, save_subscription, delete_subscription, set_first_answerer_false, check_social_user_exist


urlpatterns = [
    url(r'^register/$', user_register),
    url(r'^login/$', login),
    url(r'^info/$', get_user_info),
    url(r'^credentials/$', get_user_credentials),
    url(r'^users/(?P<pk>[0-9]+)/$', UserDetail.as_view(), name='user_detail'),
    url(r'^users/(?P<pk>[0-9]+)/written_answers/$', UserWrittenAnswers.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/written_questions/$', UserWrittenQuestions.as_view()),
    url(r'^users/following_questions/$', UserFollowingQuestions.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/following_topics/$', UserFollowingTopics.as_view()),
    url(r'^users/bookmark_contents/$', UserBookmarkContents.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/follow/$', follow_user, name='follow_user'),
    url(r'^users/(?P<pk>[0-9]+)/followers/$', UserFollowers.as_view(), name='followers'),
    url(r'^users/(?P<pk>[0-9]+)/following_users/$', UserFollowingUsers.as_view(), name='following_users'),
    url(r'^update/profile_image/$', update_profile_image),
    url(r'^update/description/$', make_credential_to_description),
    url(r'^update/profile/$', update_profile),
    url(r'^social/continue/$', social_user_continue),
    url(r'^check_email_exist/$', check_email_exist),
    url(r'^validate_password_reset_key/$', validate_password_reset_key),
    url(r'^reset_password/$', reset_password),
    url(r'^invite_key/$', create_invite_key),
    url(r'^invite_key/validate/$', validate_invite_key),
    url(r'^save_subscription/$', save_subscription),
    url(r'^delete_subscription/$', delete_subscription),
    url(r'^set_first_answerer_false/$', set_first_answerer_false),
    url(r'^check_social_user_exist/$', check_social_user_exist),
]
