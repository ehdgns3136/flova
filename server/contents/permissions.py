from rest_framework import permissions
from rest_framework.compat import is_authenticated


class QuestionPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'create', 'destroy', 'update', 'partial_update']:
            return request.user.is_authenticated()
        return True

    def has_object_permission(self, request, view, obj):
        if view.action in ['destroy', 'update', 'partial_update']:
            return request.user.is_staff or obj.writer == request.user
        return True


class AnswerRetrieveUpdateDestroyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['destroy', 'update', 'partial_update']:
            return request.user.is_authenticated()
        return True

    def has_object_permission(self, request, view, obj):
        if view.action in ['destroy', 'update', 'partial_update']:
            return request.user.is_staff or obj.writer == request.user
        return True


class CommentPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        elif request.method == 'PUT' or request.method == 'DELETE':
            return request.user.is_staff or obj.writer == request.user
        elif request.method == 'POST':
            return request.user and is_authenticated(request.user)
