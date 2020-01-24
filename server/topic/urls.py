from django.conf.urls import url
from .views import add_topics_to_user, TopicList, get_following_topics, TopicDetail, TopicPopularQuestions, \
    TopicQuestionsToAnswer, TopicPopularAnswerers, topic_follow, update_topic_image

urlpatterns = [
    url(r'^add_topics_to_user/$', add_topics_to_user),
    url(r'^$', TopicList.as_view(), name='topic_list'),
    url(r'^get_following_topics/$', get_following_topics),
    url(r'^topics/(?P<pk>[0-9]+)/$', TopicDetail.as_view(), name='topic_detail'),
    url(r'^topics/(?P<pk>[0-9]+)/popular_questions/$', TopicPopularQuestions.as_view(), name='topic_popular_questions'),
    url(r'^topics/(?P<pk>[0-9]+)/questions_to_answer/$', TopicQuestionsToAnswer.as_view(), name='topic_questions_to_answer'),
    url(r'^topics/(?P<pk>[0-9]+)/popular_answerers/$', TopicPopularAnswerers.as_view(), name='topic_popular_answerers'),
    url(r'^topics/(?P<pk>[0-9]+)/follow/$', topic_follow, name='topic_follow'),
    url(r'^topics/(?P<pk>[0-9]+)/update/topic_image/$', update_topic_image, name='update_topic_image'),
]
