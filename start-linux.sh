#!/bin/sh

export ELASTICSEARCH_URL="http://localhost:8080"

echo "ElasticSearch available from localhost only on $ELASTICSEARCH_URL"
echo "Indicator search on port 8008"
pm2 start app/bin/www --name indicator-search --log ./log.txt

