from django.contrib import admin
from .models import AnswerChosenByEditorsAdmin, AnswerChosenByEditorsByTopicAdmin, AnswerWroteByFollowingUser

admin.site.register(AnswerChosenByEditorsByTopicAdmin)
admin.site.register(AnswerChosenByEditorsAdmin)