from django_extensions.db.models import TimeStampedModel
from django.db import models
from django.contrib.auth import get_user_model


class ContentModel(TimeStampedModel):
    # Relational Fields
    writer = models.ForeignKey(get_user_model(), related_name='written_%(class)ss')

    # Primitive Fields
    content = models.TextField()

    class Meta:
        abstract = True
