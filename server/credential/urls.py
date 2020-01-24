from .views import EducationCredentialViewSet, EmploymentCredentialViewSet, TextCredentialViewSet, add_concentration, add_role
from django.conf.urls import url

education_credential_list = EducationCredentialViewSet.as_view({'get':'list', 'post':'create'})
education_credential_detail = EducationCredentialViewSet.as_view({'get':'retrieve', 'put':'update', 'patch':'partial_update', 'delete':'destroy'})

employment_credential_list = EmploymentCredentialViewSet.as_view({'get':'list', 'post':'create'})
employment_credential_detail = EmploymentCredentialViewSet.as_view({'get':'retrieve', 'put':'update', 'patch':'partial_update', 'delete':'destroy'})

text_credential_list = TextCredentialViewSet.as_view({'get':'list', 'post':'create'})
text_credential_detail = TextCredentialViewSet.as_view({'get':'retrieve', 'put':'update', 'patch':'partial_update', 'delete':'destroy'})

urlpatterns = [
    url(r'^education/$', education_credential_list, name='education credential list'),
    url(r'^education/(?P<pk>[0-9]+)/$', education_credential_detail, name='education credential detail'),
    url(r'^employment/$', employment_credential_list, name='employment credential list'),
    url(r'^employment/(?P<pk>[0-9]+)/$', employment_credential_detail, name='employment credential detail'),
    url(r'^text/$', text_credential_list, name='text credential list'),
    url(r'^text/(?P<pk>[0-9]+)/$', text_credential_detail, name='text credential detail'),
    url(r'^concentration/$', add_concentration, name='add concentration'),
    url(r'^role/$', add_role, name='add role'),
]