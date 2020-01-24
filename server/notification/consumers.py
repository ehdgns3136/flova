from channels import Group
from channels.security.websockets import allowed_hosts_only
from urllib.parse import parse_qs
from rest_framework.authtoken.models import Token


# Connected to websocket.connect
@allowed_hosts_only
def ws_add(message):
    # TODO : 같은 client tab에서 두 개 이상의 websocket connect 방지하기
    params = parse_qs(message.content["query_string"].decode("utf-8"))

    if 'token' in params:
        try:
            user = Token.objects.get(key=params['token'][0]).user

            # Add to the user Group. Group name by user_id
            Group(str(user.id)).add(message.reply_channel)

            # Accept Connection
            message.reply_channel.send({"accept": True})
        except:
            # invalid token. Reject Connection
            message.reply_channel.send({"close": True})
    else:
        # no token. Reject Connection
        message.reply_channel.send({"close": True})


# Connected to websocket.receive
def ws_message(message):
    print("We don't need this now.")
    message.reply_channel.send({"close": True})


# Connected to websocket.disconnect
def ws_disconnect(message):
    # TODO : Group에 남아있는 channel들 지워주기 (channel_name -> user.id mapping 정보 필요할듯. redis 같은 곳에 저장.)
    pass
    # Group(str(user.id)).discard(message.reply_channel)