#!/bin/bash

# 감시할 파일 경로 (여기서는 index.html)
WATCHED_FILE="/home/kbk/kbk-apps/test/no-focus=browser-auto-reload/target/index.html"
WATCHED_PATH="/home/kbk/kbk-apps/project-wordpress-swipre-plugin/frontend/wp-rchr-swp-dashboard/main/wp-rchr-swp-dashboard/assets/js"

# 웹 브라우저의 창 이름 또는 클래스 (Firefox, Chrome 등)
WINDOW_NAME="Google Chrome"  # 실제 사용하는 브라우저 이름으로 수정하세요.

# 무한 루프 실행
while true; do
    # index.html 파일의 변경 감지
    inotifywait -e modify "$WATCHED_PATH"
    
    # 변경이 감지되면 웹 브라우저 새로고침

    # 현재 마우스 위치 저장
    MOUSE_POSITION=$(xdotool getmouselocation --shell)

    # 웹 브라우저의 윈도우 ID 가져오기
    WINDOW_ID=$(xdotool search --onlyvisible --name "$WINDOW_NAME" | head -n 1)

    # 윈도우 ID가 유효한 경우에만 새로고침 실행
    if [ -n "$WINDOW_ID" ]; then
        # 브라우저 창에 포커스를 맞추지 않고 새로고침 명령어 전송 (Ctrl+R)
        xdotool key --window $WINDOW_ID ctrl+r
    fi

    # 마우스 위치 복원 (마우스 커서가 깜빡이는 상태 유지)
    eval $MOUSE_POSITION
done
