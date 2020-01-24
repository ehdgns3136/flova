from .views import MainFeed, TopicFeed
from django.conf.urls import url

urlpatterns = [
    url(r'^main/$', MainFeed.as_view(), name='main feed'),
    url(r'^topic/(?P<pk>[0-9]+)/$', TopicFeed.as_view(), name='topic feed'),
]