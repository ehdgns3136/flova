from rest_framework.pagination import CursorPagination

class CommentsSetPagination(CursorPagination):
    page_size = 5
    page_size_query_param = 'page_size'