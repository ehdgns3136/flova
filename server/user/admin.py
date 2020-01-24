from django.contrib import admin
from .models import User, Credential, Subscription

admin.site.register(User)
admin.site.register(Credential)
admin.site.register(Subscription)
