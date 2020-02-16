#!/bin/bash

if [ $REDIS_ADDRESS ]; then
	sed -i "s/localhost/$REDIS_ADDRESS/g" /opt/rapidfs/config.js
fi

if [ $REDIS_PORT ]; then
	sed -i "s/3306/$REDIS_PORT/g" /opt/rapidfs/config.js
fi
cat  /opt/rapidfs/config.js > /opt/rapidfs/config.js.bak

echo "start rapidfs daemon"
cd /opt/rapidfs
npm run start

tail -f /dev/null