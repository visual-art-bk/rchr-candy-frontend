#!/bin/bash

# 변경을 감지할 파일 경로 (예: index.html)
WATCHED_PATH="/home/kbk/kbk-apps/project-wordpress-swipre-plugin/frontend/wp-rchr-swp-dashboard/main/wp-rchr-swp-dashboard/assets/js"

# 새로고침할 브라우저 창 이름 (예: "Google Chrome")
BROWSER_WINDOW_NAME="Google Chrome"

while true; do
    # 파일 변경 감지
    inotifywait -e modify "$WATCHED_PATH"
    
    # 웹 브라우저 새로고침
    xdotool search --name "$BROWSER_WINDOW_NAME" windowactivate --sync key F5
done