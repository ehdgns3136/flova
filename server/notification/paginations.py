from collections import OrderedDict, namedtuple
from rest_framework.pagination import CursorPagination, _reverse_ordering


Cursor = namedtuple('Cursor', ['offset', 'reverse', 'position'])


class NotificationListPagination(CursorPagination):
    page_size = 10
    ordering = '-added_time'

    # TODO : 새로 업데이트된 notification을 받아오는 previous url도 전달해줄 것. 지금은 null이 전달됨.
    """
    def paginate_queryset(self, queryset, request, view=None):
        self.page_size = self.get_page_size(request)
        if not self.page_size:
            return None

        self.base_url = request.build_absolute_uri()
        self.ordering = self.get_ordering(request, queryset, view)

        self.cursor = self.decode_cursor(request)
        print(self.cursor) # TODO
        if self.cursor is None:
            (offset, reverse, current_position) = (0, False, None)
        else:
            (offset, reverse, current_position) = self.cursor

        # Cursor pagination always enforces an ordering.
        if reverse:
            queryset = queryset.order_by(*_reverse_ordering(self.ordering))
        else:
            queryset = queryset.order_by(*self.ordering)

        # If we have a cursor with a fixed position then filter by that.
        if current_position is not None:
            order = self.ordering[0]
            is_reversed = order.startswith('-')
            order_attr = order.lstrip('-')

            # Test for: (cursor reversed) XOR (queryset reversed)
            if self.cursor.reverse != is_reversed:
                print('lt') # TODO
                print('reverse', reverse) # TODO
                kwargs = {order_attr + '__lt': current_position}
            else:
                print('gt') # TODO
                print('reverse', reverse) # TODO
                kwargs = {order_attr + '__gt': current_position}

            queryset = queryset.filter(**kwargs)

        # If we have an offset cursor then offset the entire page by that amount.
        # We also always fetch an extra item in order to determine if there is a
        # page following on from this one.
        results = list(queryset[offset:offset + self.page_size + 1])
        self.page = list(results[:self.page_size])

        # Determine the position of the final item following the page.
        if len(results) > len(self.page):
            has_following_position = True
            following_position = self._get_position_from_instance(results[-1], self.ordering)
        else:
            has_following_position = False
            following_position = None

        # If we have a reverse queryset, then the query ordering was in reverse
        # so we need to reverse the items again before returning them to the user.
        if reverse:
            self.page = list(reversed(self.page))

        if reverse:
            # Determine next and previous positions for reverse cursors.
            self.has_next = (current_position is not None) or (offset > 0)
            self.has_previous = has_following_position
            self.has_previous = True  # TODO
            if self.has_next:
                self.next_position = current_position
            if self.has_previous:
                print('following_position', following_position) # TODO
                self.previous_position = following_position
        else:
            # Determine next and previous positions for forward cursors.
            self.has_next = has_following_position
            self.has_previous = (current_position is not None) or (offset > 0)
            self.has_previous = True  # TODO
            if self.has_next:
                self.next_position = following_position
            if self.has_previous:
                self.previous_position = current_position

        print('has_previous', self.has_previous) # TODO

        # Display page controls in the browsable API if there is more
        # than one page.
        if (self.has_previous or self.has_next) and self.template is not None:
            self.display_page_controls = True

        return self.page

    def get_previous_link(self):
        if not self.has_previous:
            return None

        if self.cursor and not self.cursor.reverse and self.cursor.offset != 0:
            # If we're reversing direction and we have an offset cursor
            # then we cannot use the first position we find as a marker.
            compare = self._get_position_from_instance(self.page[0], self.ordering)
        else:
            compare = self.previous_position
        offset = 0

        for item in self.page:
            position = self._get_position_from_instance(item, self.ordering)
            if position != compare:
                print('position != compare') # TODO
                # The item in this position and the item following it
                # have different positions. We can use this position as
                # our marker.
                break

            print('position == compare') # TODO
            # The item in this position has the same position as the item
            # following it, we can't use it as a marker position, so increment
            # the offset and keep seeking to the previous item.
            compare = position
            offset += 1

        else:
            # There were no unique positions in the page.
            if not self.has_next:
                # We are on the final page.
                # Our cursor will have an offset equal to the page size,
                # but no position to filter against yet.
                offset = self.page_size
                position = None
            elif self.cursor.reverse:
                # Use the position from the existing cursor and increment
                # it's offset by the page size.
                offset = self.cursor.offset + self.page_size
                position = self.next_position
            else:
                # The change in direction will introduce a paging artifact,
                # where we end up skipping back a few extra items.
                offset = 0
                position = self.next_position

        print(position) # TODO

        cursor = Cursor(offset=offset, reverse=True, position=position)

        print(cursor)
        return self.encode_cursor(cursor)
    """