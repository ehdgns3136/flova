from channels.routing import route, include
from .default_consumers import ws_reject

channel_routing = [
    include('notification.routing.channel_routing', path=r'^/notification/'),
    route('websocket.connect', ws_reject), # reject for no match path
]