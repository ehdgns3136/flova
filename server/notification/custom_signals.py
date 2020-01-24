from django.dispatch import Signal


# custom signal for updating UserLastNotificationCheck when user checked notification
update_last_notification_check_signal = Signal(providing_args=['request', 'user', 'time'])

# custom signal for sending new notification
new_notification = Signal(providing_args=['instance'])

