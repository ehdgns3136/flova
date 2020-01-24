from django.contrib import admin
from .models import Question, Answer, QuestionComment, AnswerComment, Bookmark, QuestionBookmark, AnswerBookmark

admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(QuestionComment)
admin.site.register(AnswerComment)
admin.site.register(Bookmark)
admin.site.register(QuestionBookmark)
admin.site.register(AnswerBookmark)
