from django.contrib import admin
from .models import Notification, NewAnswerOnQuestionNotification, UserLastNotificationCheck, \
    FollowYourQuestionNotification, NewCommentOnYourQuestionNotification, LikeYourAnswerNotification, \
    NewCommentOnYourAnswerNotification, LikeYourQuestionCommentNotification, LikeYourAnswerCommentNotification, \
    FollowYouNotification, CustomNotification, NotificationForFirstUser, NotificationForAll


admin.site.register(Notification)
admin.site.register(NewAnswerOnQuestionNotification)
admin.site.register(FollowYourQuestionNotification)
admin.site.register(UserLastNotificationCheck)
admin.site.register(NewCommentOnYourQuestionNotification)
admin.site.register(LikeYourAnswerNotification)
admin.site.register(NewCommentOnYourAnswerNotification)
admin.site.register(LikeYourQuestionCommentNotification)
admin.site.register(LikeYourAnswerCommentNotification)
admin.site.register(FollowYouNotification)
admin.site.register(CustomNotification)
admin.site.register(NotificationForFirstUser)
admin.site.register(NotificationForAll)