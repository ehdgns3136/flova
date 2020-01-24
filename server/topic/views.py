from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Topic
from .serializers import TopicSerializer
from rest_framework import generics
from contents.serializers import QuestionListSerializer, BestAnswerQuestionListSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Count
from user.serializers import UserInfoSerializer
from .permissions import IsStaff

topic_list_order = [
    1,
    2,
    4,
    6,
    8,
    15,
    17,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_topics_to_user(request):
    # 가입할 때만 사용!
    for topic_id in request.data:
        request.user.topics.add(Topic.objects.filter(id=topic_id).first())

    request.user.save()

    return Response(status=status.HTTP_202_ACCEPTED)


class TopicList(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get(self, request, format=None):
        topic_list = []
        for id in topic_list_order:
            topic_list.append(Topic.objects.get(id=id))
        serializer = TopicSerializer(topic_list, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        topic = Topic.objects.filter(title=request.data['title']).first()
        if topic is not None:
            return Response(TopicSerializer(topic).data, status=status.HTTP_200_OK)

        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_following_topics(request):  # up to 5 topics
    topics = request.user.topics.all()
    sorted_topics = sorted(topics, key=lambda topic: topic.followed_num(), reverse=True)
    selected_topics = sorted_topics[0:5]

    serializer = TopicSerializer(selected_topics, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


class TopicDetail(generics.RetrieveAPIView):
    """
    토픽 디테일 페이지를 위한 뷰.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = (AllowAny,)


class TopicPopularQuestions(generics.ListAPIView):
    """
    토픽에 있는 인기 있는 질문들을 상위 20개 보여준다.
    * 순서: 팔로우 한 유저의 수
    """
    serializer_class = BestAnswerQuestionListSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        questions = get_object_or_404(Topic, id=self.kwargs['pk']).questions.all()
        return questions.annotate(followed_num=Count('followers')).order_by('-followed_num')[:20]


class TopicQuestionsToAnswer(generics.ListAPIView):
    """
    토픽에 답변할만한 질문들.
    답변 수가 하나도 없는 질문들이다. 
    * 순서: 기본(최신 순)
    """
    serializer_class = QuestionListSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        return get_object_or_404(Topic, id=self.kwargs['pk']).questions.all() \
                   .annotate(answer_num=Count('answers')).filter(answer_num=0)[:20]


class TopicPopularAnswerers(generics.ListAPIView):
    """
    토픽에 인기 있는 답변자들.
    """
    serializer_class = UserInfoSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        return get_object_or_404(Topic, id=self.kwargs['pk']).popular_answerers(20)


@api_view(['POST', ])
@permission_classes([IsAuthenticated, ])
def topic_follow(request, pk):
    """
    Topic Follow

    post:
    Topic Follow or Unfollow \n
    { }를 보내면 request.user로 follow or unfollow.
    """
    topic = get_object_or_404(Topic, id=pk)
    topic.follow_or_unfollow(request.user)
    return Response(status=status.HTTP_200_OK, data=TopicSerializer(topic, context={'request': request}).data)


@api_view(['POST'])
@permission_classes([IsStaff])
def update_topic_image(request, pk):
    topic = get_object_or_404(Topic, id=pk)
    topic.topic_image = request.data['topic_image']
    topic.save()
    return Response(status=status.HTTP_200_OK)
