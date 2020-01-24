from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, mixins, generics, permissions
from rest_framework.response import Response
from .serializers import QuestionListSerializer, QuestionSerializer, AnswerSerializer, QuestionCommentSerializer, \
    AnswerCommentSerializer, QuestionMetaTagSerializer, AnswerMetaTagSerializer
from .models import Question, Answer, QuestionComment, AnswerComment, QuestionBookmark, AnswerBookmark
from .permissions import QuestionPermission, AnswerRetrieveUpdateDestroyPermission, CommentPermission
from .pagination import CommentsSetPagination
from rest_framework.decorators import api_view, permission_classes
from user.serializers import UserInfoSerializer
from django.db.models import Count, F, ExpressionWrapper, IntegerField
from django.db.models.query_utils import Q
from rest_framework.compat import is_authenticated



class QuestionViewSet(viewsets.ModelViewSet):
    """
    Question View들 모음.
    
    
    list: 
    Question의 list를 모두 보여준다. \n
    Question 중 가장 좋아요를 많이 받은 답변이 best_answer로 포함된다. \n
    현재는 기본 순서. \n
    **Permissions:** Authorized 된 유저만 \n
    **TODO:** Question 피드 알고리즘으로 보여주기
    
    create:
    새로운 Question을 생성한다. \n
    **Permissions:** Authorized 된 유저만 \n
    
    destroy:
    주어진 pk의 Question을 삭제한다. \n
    **Permissions:** Admin이거나 Question의 writer만. \n
    
    retrieve:
    주어진 pk의 Question을 자세히 보여준다. \n
    **Permissions:** all
    
    update:
    주어진 pk의 question을 수정한다. \n
    modifying request는 후에 요청을 받아 처리해야 하므로 베타 후에 구현한다. \n
    **Permissions:** Admin이거나 Question의 writer만. \n
     
    partial_update:
    주어진 pk의 question을 일부 필드만 수정한다. \n
    modifying request는 후에 요청을 받아 처리해야 하므로 베타 후에 구현한다. \n
    **Permissions:** Admin이거나 Question의 writer만. \n
    """
    queryset = Question.objects.all()
    permission_classes = [QuestionPermission, ]

    def get_serializer_class(self):
        if self.action == 'list':
            return QuestionListSerializer
        return QuestionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            question = serializer.save(writer=request.user)
            created_question_json = self.get_serializer_class()(question).data
            return Response(data=created_question_json, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, context={'request': request})
        serialized_data = serializer.data
        return Response(serialized_data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        data = serializer.data
        data['is_mine'] = (request.user == instance.writer)
        return Response(data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.answers.exists():
            return Response(status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, ])
def question_follow(request, pk):
    question = get_object_or_404(Question, id=pk)
    if question.followers.filter(id=request.user.id).exists():
        question.followers.remove(request.user)
        question.save()
        return Response({'followed_num': question.followed_num(), 'is_followed': False}, status=status.HTTP_200_OK)
    question.followers.add(request.user)
    question.save()
    # TODO : followed_num, is_followed 굳이 return해줄 필요?
    return Response({'followed_num': question.followed_num(), 'is_followed': True}, status=status.HTTP_200_OK)


class AnswerRetrieveUpdateDestroyViewSet(mixins.DestroyModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                                 viewsets.GenericViewSet):
    """
    Answer 수정, 삭제 뷰들. \n

    ## Answer는 Question을 통해서 Read할 수 있으므로 생성, 수정, 삭제에 대한 뷰만 사용한다. \n ##
    -> Answer Detail Page에서 Answer을 불러와야 하는 상황이 있으므로, Get에 대한 뷰를 추가한다.

    Answer를 생성할 때는 Url parameter를 통해 Question id를 전달해주기위해 다른 뷰를 사용한다. \n

    get:
    주어진 pk의 Answer를 갖고온다. \n
    **Permissions:** AllowAny

    update:
    주어진 pk의 Answer를 수정한다. \n
    **Permissions:** Answer의 writer 혹은 Admin.
    
    partial_update:
    주어진 pk의 Answer를 일부 필드만 수정한다. \n
    **Permissions:** Answer의 writer 혹은 Admin.
    
    destroy:
    주어진 pk의 Answer를 삭제한다. \n
    **Permissions:** Answer의 writer 혹은 Admin.
    """
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [AnswerRetrieveUpdateDestroyPermission, ]


class AnswerListCreateView(generics.ListCreateAPIView):
    """
    Answer List, Create View.
    
    
    
    get:
    주어진 id를 가지는 Question의 Answers를 보여준다.
    
    post:
    주어진 id를 가지는 Question의 Answer를 생성한다. \n
    **Permissions:** Authorized된 유저.
    """
    serializer_class = AnswerSerializer
    pagination_class = None

    def get_queryset(self):
        return Answer.objects.filter(question=self.kwargs['pk']).annotate(liked_num=Count('liked_users', distinct=True),
                                                                          downvoted_num=Count('downvoted_users',
                                                                                              distinct=True),
                                                                          score=F('liked_num') - F('downvoted_num')) \
            .order_by('-score')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if is_authenticated(request.user):
            queryset = queryset.filter(Q(is_hidden=False) | Q(is_hidden=True) & Q(writer=request.user))
        else:
            queryset = queryset.exclude(is_hidden=True)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        question_id = kwargs.get('pk')
        question = get_object_or_404(Question, id=question_id)

        if question.answers.filter(writer=request.user).exists():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            answer = serializer.save(writer=request.user, question=question)
            created_answer_json = self.get_serializer_class()(answer, context={'request': request}).data
            return Response(data=created_answer_json, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, ])
def answer_like(request, pk):
    answer = get_object_or_404(Answer, id=pk)
    if answer.liked_users.filter(id=request.user.id).exists():
        answer.liked_users.remove(request.user)
        answer.save()
        return Response({'liked_num': answer.liked_num(), 'is_liked': False,
                         'is_downvoted': answer.downvoted_users.filter(id=request.user.id).exists()},
                        status=status.HTTP_200_OK)
    if answer.downvoted_users.filter(id=request.user.id).exists():
        answer.downvoted_users.remove(request.user)
    answer.liked_users.add(request.user)
    answer.save()
    # TODO : liked_num, is_liked, is_downvoted 굳이 return해줄 필요?
    return Response({'liked_num': answer.liked_num(), 'is_liked': True, 'is_downvoted': False},
                    status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, ])
def answer_downvote(request, pk):
    answer = get_object_or_404(Answer, id=pk)
    if answer.downvoted_users.filter(id=request.user.id).exists():
        answer.downvoted_users.remove(request.user)
        answer.save()
        return Response(
            {'liked_num': answer.liked_num(), 'is_liked': answer.liked_users.filter(id=request.user.id).exists(),
             'is_downvoted': False}, status=status.HTTP_200_OK)
    if answer.liked_users.filter(id=request.user.id).exists():
        answer.liked_users.remove(request.user)
    answer.downvoted_users.add(request.user)
    answer.save()
    # TODO : liked_num, is_liked, is_downvoted 굳이 return해줄 필요?
    return Response({'liked_num': answer.liked_num(), 'is_liked': False, 'is_downvoted': True, },
                    status=status.HTTP_200_OK)


class QuestionCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = QuestionCommentSerializer
    permission_classes = [CommentPermission, ]
    pagination_class = CommentsSetPagination

    def get_queryset(self):
        return QuestionComment.objects.filter(question=self.kwargs['pk'])

    def create(self, request, *args, **kwargs):
        question_id = kwargs.get('pk')
        question = get_object_or_404(Question, id=question_id)

        serializer = self.get_serializer_class()(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(writer=request.user, question=question)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = reversed(self.paginate_queryset(queryset))
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class QuestionCommentUpdateDestroyViewSet(mixins.DestroyModelMixin, mixins.UpdateModelMixin,
                                          viewsets.GenericViewSet):
    queryset = QuestionComment.objects.all()
    serializer_class = QuestionCommentSerializer
    permission_classes = [CommentPermission, ]


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, ])
def question_comment_like(request, pk):
    comment = get_object_or_404(QuestionComment, id=pk)
    if comment.liked_users.filter(id=request.user.id).exists():
        comment.liked_users.remove(request.user)
        comment.save()
        return Response({'liked_num': comment.liked_num(), 'is_liked': False}, status=status.HTTP_200_OK)
    comment.liked_users.add(request.user)
    comment.save()
    return Response({'liked_num': comment.liked_num(), 'is_liked': True}, status=status.HTTP_200_OK)


class AnswerCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = AnswerCommentSerializer
    permission_classes = [CommentPermission, ]
    pagination_class = CommentsSetPagination

    def get_queryset(self):
        return AnswerComment.objects.filter(answer=self.kwargs['pk'])

    def create(self, request, *args, **kwargs):
        answer_id = kwargs.get('pk')
        answer = get_object_or_404(Answer, id=answer_id)

        serializer = self.get_serializer_class()(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(writer=request.user, answer=answer)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = reversed(self.paginate_queryset(queryset))
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class AnswerCommentUpdateDestroyViewSet(mixins.DestroyModelMixin, mixins.UpdateModelMixin,
                                        viewsets.GenericViewSet):
    queryset = AnswerComment.objects.all()
    serializer_class = AnswerCommentSerializer
    permission_classes = [CommentPermission, ]


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, ])
def answer_comment_like(request, pk):
    comment = get_object_or_404(AnswerComment, id=pk)
    if comment.liked_users.filter(id=request.user.id).exists():
        comment.liked_users.remove(request.user)
        comment.save()
        return Response({'liked_num': comment.liked_num(), 'is_liked': False}, status=status.HTTP_200_OK)
    comment.liked_users.add(request.user)
    comment.save()
    return Response({'liked_num': comment.liked_num(), 'is_liked': True}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, ])
def question_bookmark(request, pk):
    question = get_object_or_404(Question, id=pk)
    if QuestionBookmark.objects.filter(question=question, user=request.user).exists():
        QuestionBookmark.objects.get(question=question, user=request.user).delete()
        return Response(status=status.HTTP_200_OK)
    QuestionBookmark.objects.create(question=question, user=request.user)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, ])
def answer_bookmark(request, pk):
    answer = get_object_or_404(Answer, id=pk)
    if AnswerBookmark.objects.filter(answer=answer, user=request.user).exists():
        AnswerBookmark.objects.get(answer=answer, user=request.user).delete()
        return Response(status=status.HTTP_200_OK)
    AnswerBookmark.objects.create(answer=answer, user=request.user)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.AllowAny, ])
def question_followers(request, pk):
    question = get_object_or_404(Question, id=pk)
    return Response(data=UserInfoSerializer(question.followers, many=True, context={'request': request}).data,
                    status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.AllowAny, ])
def answer_likers(request, pk):
    answer = get_object_or_404(Answer, id=pk)
    return Response(data=UserInfoSerializer(answer.liked_users, many=True, context={'request': request}).data,
                    status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.AllowAny, ])
def question_meta_tag(request, pk):
    question = get_object_or_404(Question, id=pk)
    return Response(data=QuestionMetaTagSerializer(question).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.AllowAny, ])
def answer_question(request, pk):
    answer = get_object_or_404(Answer, id=pk)
    return Response(data=QuestionSerializer(answer.question, context={'request': request}).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.AllowAny, ])
def answer_meta_tag(request, pk):
    answer = get_object_or_404(Answer, id=pk)
    return Response(data=AnswerMetaTagSerializer(answer).data, status=status.HTTP_200_OK)