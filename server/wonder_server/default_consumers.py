from channels.security.websockets import allowed_hosts_only


# Connected to websocket.connect
@allowed_hosts_only
def ws_reject(message):
    # Reject the connection
    message.reply_channel.send({"close": True})