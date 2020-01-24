from .views import get_unread_notification_count, NotificationList, update_last_notification_check, read_notification
from django.conf.urls import url

urlpatterns = [
    url(r'^update_last_check/$', update_last_notification_check, name='update last notification check'),
    url(r'^read/$', read_notification, name='read notification'),
    url(r'^unread_count/$', get_unread_notification_count, name='unread count'),
    url(r'^notifications/$', NotificationList.as_view(), name='notification list'),
]