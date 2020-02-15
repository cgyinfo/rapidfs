#!/bin/bash

new_val=$REDIS_ADDRESS
old_val="localhost"

sed -i "s/$old_val/$new_val/g" /opt/rapidfs/config.js
cat  /opt/rapidfs/config.js > /opt/rapidfs/config.js.bak

echo "start rapidfs daemon"
cd /opt/rapidfs
npm run start

tail -f /dev/null