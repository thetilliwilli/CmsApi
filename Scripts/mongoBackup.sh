#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
lastUpdate=$(cat "$DIR"/lastUpdate.txt)
lastBackup=$(cat "$DIR"/lastBackup.txt)
now=$(date -u +"%Y%m%dT%H%M%SZ")
if [[ "$lastUpdate" > "$lastBackup" ]]; then (sudo mongodump --db TAG --archive=/opt/backup/mongodb/`echo $now`.archive && sudo echo $now > "$DIR"/lastBackup.txt); else echo "no"; fi
