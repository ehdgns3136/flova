from .views import search_main, search_question_detail, search_topic, search_concentration, search_role
from django.conf.urls import url

urlpatterns = [
    url(r'^main/?$', search_main, name='search main'),
    url(r'^detail/?$', search_question_detail, name='search question detail'),
    url(r'^topic/?$', search_topic, name='search topic'),
    url(r'^concentration/?$', search_concentration, name='search concentration'),
    url(r'^role/?$', search_role, name='search role'),
]
