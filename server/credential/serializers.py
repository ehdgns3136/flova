from rest_framework import serializers
from .models import Credential, EducationCredential, EmploymentCredential, TextCredential, Concentration, Role
from topic.models import Topic


class CredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credential
        fields = '__all__'

    def to_representation(self, obj):
        if isinstance(obj, EducationCredential):
            return EducationCredentialSerializer(obj).to_representation(obj)
        elif isinstance(obj, EmploymentCredential):
            return EmploymentCredentialSerializer(obj).to_representation(obj)
        elif isinstance(obj, TextCredential):
            return TextCredentialSerializer(obj).to_representation(obj)
        return super(CredentialSerializer, self).to_representation(obj)


class EducationCredentialSerializer(serializers.ModelSerializer):
    school_image = serializers.SerializerMethodField()
    to_string = serializers.SerializerMethodField()

    class Meta:
        model = EducationCredential
        fields = '__all__'

    def get_school_image(self, obj):
        return Topic.objects.get(id=obj.school.id).topic_image

    def get_to_string(self, obj):
        return str(obj)

    def to_representation(self, instance):
        data = super(EducationCredentialSerializer, self).to_representation(instance)
        school = instance.school.title
        school_id = instance.school.id
        major = None
        major_id = ''
        minor = None
        minor_id = ''
        if instance.major is not None:
            major = instance.major.title
            major_id = instance.major.id
        if instance.minor is not None:
            minor = instance.minor.title
            minor_id = instance.minor.id

        data.update({
            'school': school,
            'school_id': school_id,
            'major': major,
            'major_id': major_id,
            'minor': minor,
            'minor_id': minor_id,
            'type': 'education',
        })

        return data


class EmploymentCredentialSerializer(serializers.ModelSerializer):
    company_image = serializers.SerializerMethodField()
    to_string = serializers.SerializerMethodField()

    class Meta:
        model = EmploymentCredential
        fields = '__all__'

    def get_company_image(self, obj):
        return Topic.objects.get(title=obj.company).topic_image

    def get_to_string(self, obj):
        return str(obj)

    def to_representation(self, instance):
        data = super(EmploymentCredentialSerializer, self).to_representation(instance)
        company = instance.company.title
        company_id = instance.company.id
        role = None
        role_id = ''
        if instance.role is not None:
            role = instance.role.title
            role_id = instance.role.id

        data.update({
            'company': company,
            'company_id': company_id,
            'role': role,
            'role_id': role_id,
            'type': 'employment',
        })
        return data


class TextCredentialSerializer(serializers.ModelSerializer):
    to_string = serializers.SerializerMethodField()

    class Meta:
        model = TextCredential
        fields = '__all__'

    def get_to_string(self, obj):
        return str(obj)

    def to_representation(self, instance):
        data = super(TextCredentialSerializer, self).to_representation(instance)
        data.update({'type': 'text'})
        return data


class ConcentrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concentration
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
