# Music Player
npm install 한후 package.json에 입력된 scripts를 참고하여 실행하세요.


# Progress Bar
 audio 태그가 시간이 업데이트 될 때마다 onTimeUpdate 이벤트를 발생
 audio 태그가 currentTime과 duration을 리턴함 단위 : s

 progress Bar에서 onTimeUpdate를 이벤트로 받음
    1. ready State가 아니면 return
    2. audio 태그의 currentTime과duration을 이용해 progressbar의 width를 조정
        