from rest_framework import permissions


class CredentialPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'create', 'destroy', 'update', 'partial_update']:
            return request.user.is_authenticated()
        return True

    def has_object_permission(self, request, view, obj):
        if view.action in ['destroy', 'update', 'partial_update']:
            return request.user.is_staff or obj.user.first() == request.user
        return True
