from rest_framework import permissions


class IsSelf(permissions.BasePermission):
    message = '본인만 접근할 수 있습니다.'

    def has_permission(self, request, view):
        if 'pk' in view.kwargs:
            return request.user.id == int(view.kwargs['pk'])

        return True  # For Swagger: it tests without url params.


class NotSelf(permissions.BasePermission):
    message = '자기 자신에게는 접근할 수 없습니다.'

    def has_permission(self, request, view):
        if 'pk' in view.kwargs:
            return request.user.id != int(view.kwargs['pk'])

        return True

