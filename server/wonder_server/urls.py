"""wonder_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view
from wonder_server.sitemap import build_sitemap

schema_view = get_swagger_view(title='Wonder API')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', schema_view),
    url(r'^contents/', include('contents.urls')),
    url(r'^user/', include('user.urls')),
    url(r'topic/', include('topic.urls')),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^s3/', include('s3.urls')),
    url(r'^search/', include('search.urls')),
    url(r'^notification/', include('notification.urls')),
    url(r'^credential/', include('credential.urls')),
    url(r'^feed/', include('feed.urls')),
    url(r'^sitemap/', build_sitemap),
]
