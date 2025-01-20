#!/bin/bash

WATCH_DIR="/home/kbk/kbk-apps/preto-rchr-candy/frontend/rchr-candy-frontend/main/rchr-candy-frontend/assets/js"

DEST_DIR="/home/kbk/Local Sites/8-studio/app/public/wp-content/plugins/rchr-candy/assets"

inotifywait -m -r -e modify,create,delete,move "$WATCH_DIR" --format '%w%f' | while read FILE
do
  echo "File changed: $FILE"
  rsync -av --delete "$WATCH_DIR" "$DEST_DIR"
done