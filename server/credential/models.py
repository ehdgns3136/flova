from django.db import models
from topic.models import Topic
from model_utils.managers import InheritanceManager


class Concentration(models.Model):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title


class Role(models.Model):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title


class Credential(models.Model):
    objects = InheritanceManager()


class EducationCredential(Credential):
    school = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='school')
    major = models.ForeignKey(Concentration, on_delete=models.CASCADE, related_name='major', blank=True, null=True)
    minor = models.ForeignKey(Concentration, on_delete=models.CASCADE, related_name='minor', blank=True, null=True)
    graduation_year = models.IntegerField(blank=True, null=True)
    degree = models.CharField(max_length=20, blank=True, null=True)
    attending = models.BooleanField(default=True)

    def __str__(self):
        string = self.school.title
        if self.major is not None:
            string = string + ' ' + self.major.title
        if self.degree is not '':
            string = string + ' ' + self.degree
        return string


class EmploymentCredential(Credential):
    company = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='company')
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='role', blank=True, null=True)
    working = models.BooleanField(default=True)

    def __str__(self):
        string = self.company.title
        if self.working is True:
            if self.role is None:
                string = string + '에서 근무중'
            else:
                string = string + ' ' + self.role.title
        else:
            string = string + '에서 '
            if self.role is not None:
                title = self.role.title.rstrip()
                if (ord(title[-1]) - 44032) % 28 == 0:
                    string = string + self.role.title + '로 '
                else:
                    string = string + self.role.title + '으로 '
            string = string + ' 근무했음'
        return string


class TextCredential(Credential):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
