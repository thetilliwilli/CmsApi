#!/bin/bash
lastUpdate=$(cat /opt/CmsApi/current/lastUpdate.txt)
lastBackup=$(cat lastBackup.txt)
now=$(date -u +"%Y%m%dT%H%M%SZ")
if [[ "$lastUpdate" > "$lastBackup" ]]; then (sudo mongodump --db TAG --archive=/opt/backup/mongodb/`echo $now`.archive && echo $now > lastBackup.txt); else echo "no"; fi
