from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import QuestionSearchSerializer, TopicSearchSerializer, ConcentrationSearchSerializer, \
    RoleSearchSerializer, UserSearchSerializer
from contents.models import Question, Answer
from topic.models import Topic
from credential.models import Concentration, Role
from user.models import User
import json
from haystack.query import SearchQuerySet, SQ
from haystack.inputs import Clean
from haystack.utils.highlighting import Highlighter
from django.utils.html import strip_tags


@api_view(['GET'])
def search_main(request):
    """
        question의 title과 topic을 검색하는 메인 검색바에서 사용한다.
        .../search/main/?q=query 와 같은 식으로 사용한다. \n
        **Permissions:** AllowAny
    """
    q = request.GET.get('q', '')
    if q is '':
        return Response(data=[], status=status.HTTP_200_OK)
    sqs = SearchQuerySet().models(Question, Topic, User).autocomplete(autocomplete_search=q)

    serializer_list = []

    for sqs_element in sqs:
        if type(sqs_element.object) == Question:
            question = Question.objects.get(id=sqs_element.object.id)
            serializer = QuestionSearchSerializer(question)
        elif type(sqs_element.object) == Topic:
            topic = Topic.objects.get(id=sqs_element.object.id)
            serializer = TopicSearchSerializer(topic)
        elif type(sqs_element.object) == User:
            user = User.objects.get(id=sqs_element.object.id)
            serializer = UserSearchSerializer(user)
        else:
            # not supported type
            serializer = {
                'data': '',
            }

        serializer_list.append(serializer.data)
        if len(serializer_list) == 6:
            break

    return Response(data=serializer_list, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_topic(request):
    q = request.GET.get('q', '')
    if q is '':
        return Response(data=[], status=status.HTTP_200_OK)
    sqs = SearchQuerySet().models(Topic).filter(title__contains=q)

    if len(sqs) == 0:
        sqs = SearchQuerySet().models(Topic).autocomplete(autocomplete_search=q)

    serializer_list = []

    for sqs_element in sqs:
        topic = Topic.objects.get(id=sqs_element.object.id)
        serializer_list.append(topic)

    serializer = TopicSearchSerializer(serializer_list, many=True)

    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_concentration(request):
    q = request.GET.get('q', '')
    if q is '':
        return Response(data=[], status=status.HTTP_200_OK)
    sqs = SearchQuerySet().models(Concentration).filter(title__contains=q)

    serializer_list = []
    for sqs_element in sqs:
        concentration = Concentration.objects.get(id=sqs_element.object.id)
        serializer_list.append(concentration)

    serializer = ConcentrationSearchSerializer(serializer_list, many=True)

    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_role(request):
    q = request.GET.get('q', '')
    if q is '':
        return Response(data=[], status=status.HTTP_200_OK)
    sqs = SearchQuerySet().models(Role).filter(title__contains=q)

    serializer_list = []
    for sqs_element in sqs:
        role = Role.objects.get(id=sqs_element.object.id)
        serializer_list.append(role)

    serializer = RoleSearchSerializer(serializer_list, many=True)

    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_question_detail(request):
    # TODO

    """
        detail 검색 페이지에서 사용한다.
        .../search/detail/?q=query 와 같은 식으로 사용한다. \n
        **Permissions:** AllowAny
    """
    q = request.GET.get('q', '')
    print(q)
    if q is '':
        return Response(status=status.HTTP_400_BAD_REQUEST)
    all_results = SearchQuerySet().models(Question).filter(SQ(content__contains=Clean(q)) & SQ(title__contains=Clean(q)))
    all_results = SearchQuerySet().filter(content=q)
    all_results = SearchQuerySet().values()

    sqs = SearchQuerySet().models(Question).filter(title__contains=q).order_by('created')

    for i in range(0, sqs.count()):
        json_data = json.loads(sqs[i].content)
        for block in json_data['blocks']:
            print(block['text'])

    serializer = QuestionSearchSerializer(sqs, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)
