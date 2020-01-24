from django.db import models
from django.db.models import Count


class Topic(models.Model):
    title = models.CharField(max_length=100, unique=True)
    topic_image = models.URLField(blank=True)
    description = models.TextField(blank=True)

    def question_num(self):
        return self.questions.all().count()

    def answer_num(self):
        return self.questions.aggregate(Count('answers'))['answers__count']

    def followed_num(self):
        return self.followers.all().count()

    def popular_answerers(self, max_num):
        """
        해당 토픽의 답변 작성자를 누적 추천수 순으로 최대 max_num만큼 리턴합니다.
        TODO: 성능 저하를 유발할 가능성이 높습니다. Celery Worker를 사용하여, 주기적으로 계산하여 다른 모델로 저장해 주세요.
        :return: User list (not queryset)
        """
        questions = self.questions.prefetch_related('answers__writer')
        answerer_liked_num = {}  # answerer들이 누적해서 받은 좋아요 수.(key: id)
        user_caches = {}  # 누적 Query를 방지하기 위해 writer id와 object를 미리 캐시해 둠. (key: id, value: object)

        for question in questions:
            for answer in question.answers.all():
                writer_id = answer.writer.id
                if answer.writer.id in answerer_liked_num:
                    answerer_liked_num[writer_id] = answerer_liked_num[writer_id] + answer.liked_num()
                else:
                    answerer_liked_num[writer_id] = answer.liked_num()
                    user_caches[writer_id] = answer.writer

        result = []

        for index, item in enumerate(sorted(answerer_liked_num.items(), key=lambda item: item[1], reverse=True)):
            if index >= max_num:
                break
            result.append(user_caches[item[0]])

        return result

    def follow_or_unfollow(self, user):
        if user.topics.all().filter(id=self.id).exists():
            user.topics.remove(self)
        else:
            user.topics.add(self)

    def __str__(self):
        return self.title
