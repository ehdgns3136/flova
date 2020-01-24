from .serializers import EducationCredentialSerializer, EmploymentCredentialSerializer, TextCredentialSerializer, ConcentrationSerializer, RoleSerializer
from .models import EducationCredential, EmploymentCredential, TextCredential, Concentration, Role
from .permissions import CredentialPermission
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import api_view


class EducationCredentialViewSet(viewsets.ModelViewSet):
    """
        Credential View들 모음.


        list:
        Credential의 list를 모두 보여준다. \n
        **Permissions:** Authorized 된 유저만 \n

        create:
        새로운 Credential을 생성한다. \n
        **Permissions:** Authorized 된 유저만 \n

        destroy:
        주어진 pk의 Credential을 삭제한다. \n
        **Permissions:** Admin이거나 Question의 writer만. \n

        retrieve:
        주어진 pk의 Credential을 자세히 보여준다. \n
        **Permissions:** all

        update:
        주어진 pk의 Credential을 수정한다. \n
        **Permissions:** Admin이거나 Question의 writer만. \n

        partial_update:
        주어진 pk의 Credential을 일부 필드만 수정한다. \n
        **Permissions:** Admin이거나 Question의 writer만. \n
    """
    queryset = EducationCredential.objects.all()
    serializer_class = EducationCredentialSerializer
    permission_classes = [CredentialPermission, ]

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer_class()(data=data)
        if serializer.is_valid():
            credential = serializer.save()
            if request.user.description is '':
                request.user.description = str(credential)
                request.user.save()
            request.user.credentials.add(credential)
            created_credential_json = self.get_serializer_class()(credential).data
            return Response(data=created_credential_json, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class EmploymentCredentialViewSet(viewsets.ModelViewSet):
    """
        Credential View들 모음.


        list:
        Credential의 list를 모두 보여준다. \n
        **Permissions:** Authorized 된 유저만 \n

        create:
        새로운 Credential을 생성한다. \n
        **Permissions:** Authorized 된 유저만 \n

        destroy:
        주어진 pk의 Credential을 삭제한다. \n
        **Permissions:** Admin이거나 Question의 writer만. \n

        retrieve:
        주어진 pk의 Credential을 자세히 보여준다. \n
        **Permissions:** all

        update:
        주어진 pk의 Credential을 수정한다. \n
        **Permissions:** Admin이거나 Question의 writer만. \n

        partial_update:
        주어진 pk의 Credential을 일부 필드만 수정한다. \n
        **Permissions:** Admin이거나 Question의 writer만. \n
    """
    queryset = EmploymentCredential.objects.all()
    serializer_class = EmploymentCredentialSerializer
    permission_classes = [CredentialPermission, ]

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer_class()(data=data)
        if serializer.is_valid():
            credential = serializer.save()
            if request.user.description is '':
                request.user.description = str(credential)
                request.user.save()
            request.user.credentials.add(credential)
            created_credential_json = self.get_serializer_class()(credential).data
            return Response(data=created_credential_json, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class TextCredentialViewSet(viewsets.ModelViewSet):
    queryset = TextCredential.objects.all()
    serializer_class = TextCredentialSerializer
    permission_classes = [CredentialPermission, ]

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer_class()(data=data)
        if serializer.is_valid():
            credential = serializer.save()
            if request.user.description is '':
                request.user.description = str(credential)
                request.user.save()
            request.user.credentials.add(credential)
            created_credential_json = self.get_serializer_class()(credential).data
            return Response(data=created_credential_json, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


@api_view(['POST'])
def add_concentration(request):
    if request.method == 'POST':
        if Concentration.objects.filter(title=request.data['title']).exists():
            concentration = Concentration.objects.get(title=request.data['title'])
            return Response(ConcentrationSerializer(concentration).data, status=status.HTTP_200_OK)
        serializer = ConcentrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_role(request):
    if request.method == 'POST':
        if Role.objects.filter(title=request.data['title']).exists():
            role = Role.objects.get(title=request.data['title'])
            return Response(RoleSerializer(role).data, status=status.HTTP_200_OK)
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

