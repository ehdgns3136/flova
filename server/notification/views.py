from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from datetime import timedelta
from .models import Notification
from .serializers import NotificationSerializer
from .paginations import NotificationListPagination
from .signals import update_last_notification_check_signal


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_last_notification_check(request):
    dt = parse_datetime(request.data['time'])

    if not timezone.is_aware(dt):
        dt = timezone.make_aware(dt)

    update_last_notification_check_signal.send(sender=None, request=request, user=request.user, time=dt)

    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def read_notification(request):
    notification = get_object_or_404(Notification, id=request.data['notification_id'])
    notification.read = True
    notification.save()

    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_unread_notification_count(request):
    unread_notification_count = Notification.objects.filter(receiver=request.user,
                                                            added_time__gt=request.user.last_notification_check.time).count()
    return Response(data={'unread_count': unread_notification_count}, status=status.HTTP_200_OK)


class NotificationList(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = NotificationListPagination

    def get_queryset(self):
        return Notification.objects.filter(receiver=self.request.user).select_subclasses()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            if not self.paginator.has_previous and len(page) > 0: # TODO : 나중에 pagination 로직 바뀌면 문제 없는지 확인할 것
                update_last_notification_check_signal.send(sender=None, request=request, user=request.user, time=page[0].added_time)

            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)