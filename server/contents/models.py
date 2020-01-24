from django.db import models
from django.contrib.auth import get_user_model
from topic.models import Topic
from .abstract import ContentModel
from django_extensions.db.models import TimeStampedModel
from model_utils.managers import InheritanceManager
from django.utils import timezone


class FeedElement(models.Model):
    pass


class Question(FeedElement, TimeStampedModel):
    # Relational Fields
    followers = models.ManyToManyField(get_user_model(), related_name='following_questions', blank=True)
    anonymous = models.BooleanField(default=False, blank=True)
    topics = models.ManyToManyField(Topic, related_name='questions', blank=True)
    writer = models.ForeignKey(get_user_model(), related_name='written_questions')

    # Primitive Fields
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)

    def followed_num(self):
        return self.followers.all().count()

    def best_answer(self):
        answer_qs = self.answers.all().exclude(is_hidden=True)
        if answer_qs.count() == 0:
            return None
        return max(answer_qs, key=lambda answer: answer.liked_num())

    def comment_num(self):
        return self.comments.all().count()

    def answer_num(self):
        # Only show answer num which is not hidden
        return self.answers.all().exclude(is_hidden=True).count()

    def last_answer_date(self):
        if self.answers.all().count() == 0:
            return None
        return self.answers.all().latest('created').created

    def __str__(self):
        return self.title


class Answer(ContentModel):
    # Relational Fields
    question = models.ForeignKey(Question, related_name='answers')
    liked_users = models.ManyToManyField(get_user_model(), related_name='liked_answers', blank=True)
    downvoted_users = models.ManyToManyField(get_user_model(), related_name='+', blank=True)
    is_hidden = models.BooleanField(default=False)  # 피드에 노출되지 않는 답변

    def liked_num(self):
        return self.liked_users.all().count()

    def comment_num(self):
        return self.comments.all().count()

    def __str__(self):
        return "%s - %s" % (str(self.writer), str(self.question.title))


class QuestionComment(ContentModel):
    question = models.ForeignKey(Question, related_name='comments')
    liked_users = models.ManyToManyField(get_user_model(), related_name='+', blank=True)

    def liked_num(self):
        return self.liked_users.all().count()


class AnswerComment(ContentModel):
    answer = models.ForeignKey(Answer, related_name='comments')
    liked_users = models.ManyToManyField(get_user_model(), related_name='+', blank=True)

    def liked_num(self):
        return self.liked_users.all().count()


class Bookmark(models.Model):
    user = models.ForeignKey(get_user_model(), related_name='bookmark_contents')
    created = models.DateTimeField(default=timezone.now)
    objects = InheritanceManager()


class QuestionBookmark(Bookmark):
    question = models.ForeignKey(Question, related_name='bookmark_questions')


class AnswerBookmark(Bookmark):
    answer = models.ForeignKey(Answer, related_name='bookmark_answers')
