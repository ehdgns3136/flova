from .views import QuestionViewSet, AnswerRetrieveUpdateDestroyViewSet, AnswerListCreateView, question_follow, answer_downvote, \
    answer_like, QuestionCommentUpdateDestroyViewSet, AnswerCommentUpdateDestroyViewSet, \
    question_comment_like, answer_comment_like, QuestionCommentListCreateView, AnswerCommentListCreateView, \
    question_bookmark, answer_bookmark, question_followers, answer_likers, question_meta_tag, answer_question, answer_meta_tag
from django.conf.urls import url

question_list = QuestionViewSet.as_view({'get': 'list', 'post': 'create'})
question_detail = QuestionViewSet.as_view(
    {'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})
answer_detail = AnswerRetrieveUpdateDestroyViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})
question_comment_detail = QuestionCommentUpdateDestroyViewSet.as_view({'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})
answer_comment_detail = AnswerCommentUpdateDestroyViewSet.as_view({'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})

urlpatterns = [
    url(r'^questions/$', question_list, name='question list'),
    url(r'^questions/(?P<pk>[0-9]+)/$', question_detail, name='question detail'),
    url(r'^questions/(?P<pk>[0-9]+)/follow/$', question_follow, name='question follow'),
    url(r'^questions/(?P<pk>[0-9]+)/answers/$', AnswerListCreateView.as_view(), name="answer create and list"),
    url(r'^questions/(?P<pk>[0-9]+)/comments/$', QuestionCommentListCreateView.as_view(), name="question comment list"),
    url(r'^questions/(?P<pk>[0-9]+)/bookmark/$', question_bookmark, name="question bookmark"),
    url(r'^questions/(?P<pk>[0-9]+)/followers/$', question_followers, name="question followers"),
    url(r'^questions/(?P<pk>[0-9]+)/meta_tag/$', question_meta_tag, name="question meta tag"),
    url(r'^questions/comments/(?P<pk>[0-9]+)/$', question_comment_detail, name="question comment detail"),
    url(r'^questions/comments/(?P<pk>[0-9]+)/like/$', question_comment_like, name="question comment like"),

    url(r'^answers/(?P<pk>[0-9]+)/$', answer_detail, name="answer detail"),
    url(r'^answers/(?P<pk>[0-9]+)/question/$', answer_question, name="answer question"),
    url(r'^answers/(?P<pk>[0-9]+)/like/$', answer_like, name="answer like"),
    url(r'^answers/(?P<pk>[0-9]+)/downvote/$', answer_downvote, name="answer downvote"),
    url(r'^answers/(?P<pk>[0-9]+)/comments/$', AnswerCommentListCreateView.as_view(), name="answer comment list"),
    url(r'^answers/(?P<pk>[0-9]+)/bookmark/$', answer_bookmark, name="answer bookmark"),
    url(r'^answers/(?P<pk>[0-9]+)/likers/$', answer_likers, name="answer likers"),
    url(r'^answers/(?P<pk>[0-9]+)/meta_tag/$', answer_meta_tag, name="answer meta tag"),
    url(r'^answers/comments/(?P<pk>[0-9]+)/$', answer_comment_detail, name="answer comment detail"),
    url(r'^answers/comments/(?P<pk>[0-9]+)/like/$', answer_comment_like, name="answer comment like"),
]
