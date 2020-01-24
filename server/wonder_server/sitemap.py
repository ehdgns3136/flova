from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from contents.models import Question, Answer
from topic.models import Topic
from user.models import User


@permission_classes([AllowAny])
@api_view(['GET'])
def build_sitemap(request):
    sitemap = """<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"><url><loc>http://www.flova.kr/</loc><changefreq>always</changefreq><priority>1.00</priority></url><url><loc>http://www.flova.kr/signup/</loc><changefreq>monthly</changefreq><priority>1.00</priority></url><url><loc>http://www.flova.kr/email_check/</loc><changefreq>monthly</changefreq><priority>1.00</priority></url><url><loc>http://www.flova.kr/intro/</loc><changefreq>monthly</changefreq><priority>1.00</priority></url>"""

    for user in User.objects.all():
        sitemap += "<url><loc>http://www.flova.kr/user/%s/</loc><changefreq>weekly</changefreq><priority>0.60</priority></url>" % user.id

    for question in Question.objects.all():
        sitemap += "<url><loc>http://www.flova.kr/question/%s/</loc><changefreq>weekly</changefreq><priority>0.80</priority></url>" % question.id

    for answer in Answer.objects.all():
        sitemap += "<url><loc>http://www.flova.kr/answer/%s/</loc><changefreq>weekly</changefreq><priority>0.90</priority></url>" % answer.id

    for topic in Topic.objects.all():
        sitemap += "<url><loc>http://www.flova.kr/topic/%s/</loc><changefreq>weekly</changefreq><priority>0.70</priority></url>" % topic.id

    sitemap += "</urlset>"

    return Response(data=sitemap, status=status.HTTP_200_OK)
