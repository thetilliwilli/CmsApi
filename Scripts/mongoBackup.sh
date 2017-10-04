#!/bin/bash
was=$(cat /opt/CmsApi/lastUpdate.txt)
now=$(date -u +"%Y%m%dT%H%M%SZ")
if [[ "$now" > "$was" ]]; then (sudo mongodump --db TAG --archive=/opt/backup/mongodb/`echo $now`.archive); else echo "no"; fi
