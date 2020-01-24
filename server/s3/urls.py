from django.conf.urls import url
from .views import upload_image, get_signed_url

urlpatterns = [
    url(r'^upload/image/$', upload_image),
    url(r'^get_signed_url/$', get_signed_url),
]