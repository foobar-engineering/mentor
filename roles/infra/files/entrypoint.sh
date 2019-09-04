#!/bin/sh

/usr/local/bin/dockerd-entrypoint.sh &
/gotty --permit-write --reconnect tmux new -A -s gotty_session /bin/ash