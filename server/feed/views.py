from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from contents.serializers import BestAnswerQuestionListSerializer
from topic.models import Topic
from .paginations import FeedPagination, FeedPagination
from .serializers import ActivityListSerializer
from .models import type_priority


class MainFeed(generics.ListAPIView):
    serializer_class = ActivityListSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = FeedPagination

    def get_queryset(self):
        return self.request.user.activities

    def list(self, request, *args, **kwargs):
        response = super(MainFeed, self).list(self, request, *args, **kwargs)
        activities = response.data['results']
        response.data['results'] = remove_same_contents_in_a_page(activities)
        return response


class TopicFeed(generics.ListAPIView):
    serializer_class = BestAnswerQuestionListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        topic_id = self.kwargs.get('pk')
        topic = Topic.objects.get(id=topic_id)
        return topic.questions.all()


def remove_same_contents_in_a_page(activities):
    """
    같은 question을 가진 activity가 있을 경우
    priority가 가장 높은 activity만을 남겨줌.
    :param activities: paginated, serialized activities.  
    :return: activities: paginated, serialized unique activities.
    """
    activity_list = {}  # key: tuple(Question id, answer id) / value: activity index(list)
    for index, activity in enumerate(activities):
        content_class = activity['activity_data']['content_class']
        if content_class == 'Question' or content_class == 'Answer':
            question_id = activity['content']['question']['id']
            if question_id in activity_list:
                activity_list[question_id].append(index)
            else:
                activity_list[question_id] = [index, ]

    activity_idx_to_delete = []
    for question_id, activity_index_list in activity_list.items():
        if len(activity_index_list) > 1:
            sorted_list = sorted(activity_index_list,
                                 key=lambda activity_idx: type_priority[activities[activity_idx]['activity_data']['type']])
            activity_idx_to_delete = activity_idx_to_delete + sorted_list[1:]

    new_activities = []
    for i, v in enumerate(activities):
        if i not in activity_idx_to_delete:
            new_activities.append(v)
    return new_activities
