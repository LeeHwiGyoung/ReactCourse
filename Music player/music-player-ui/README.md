# Music Player
npm install 한후 package.json에 입력된 scripts를 참고하여 실행하세요.


# Progress Bar
 audio 태그가 시간이 업데이트 될 때마다 onTimeUpdate 이벤트를 발생
 audio 태그가 currentTime과 duration을 리턴함 단위 : s

 progress Bar에서 onTimeUpdate를 이벤트로 받음
    1. ready State가 아니면 return
    2. audio 태그의 currentTime과duration을 이용해 progressbar의 width를 조정

 progress Bar 클릭시 mouseDown 이벤트를 발생 
  1. progressbar의 clientWidth를 저장
  2. event가 발생한 지점을 기준으로 하는 offsetX를 저장
  3. (offsetX/ progressBar) * durtaion 으로 클릭 지점의 time을 구함
  4. audio 태그의 current 타임을 3번에서 구한 time으로 변경
  => progressbar의 width를 직접적으로 수정하는게 아닌 aduio에 데이터를 보내 onTimeUpdate가 width를 변경하게 함

  # Volume 기능
   1. useImperativeHook을 이용하여 progressbar의 audio 태그의 volume을 App.js에 넘겨준다.
   2. App.js에서 controls의 prop로 넘겨줌
   3. (0, 1) range 타입의 input의 변경값으로 onChange 이벤트 발생 시 volume을 변경해준다.
