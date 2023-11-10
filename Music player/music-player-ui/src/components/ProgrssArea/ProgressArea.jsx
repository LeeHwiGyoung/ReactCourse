import React, { useImperativeHandle, useRef ,forwardRef, useState } from "react";
import "./ProgressArea.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { playMusic, stopMusic  , nextMusic} from "../../store/musicPlayerReducer";
function ProgressArea(props, ref) {
 const audio = useRef();
 const progressBar = useRef();
 const dispatch = useDispatch()
 const {playList, currentIndex} = useSelector(state => ({playList: state.playList , currentIndex:state.currentIndex}) , shallowEqual) //사용이유 : 새로운object를 리턴하므로 매번 리랜더링이 발생하여 누수가 생김  shallowEqual : 가장 겉의 값만 비교 {playList의 값 , currentIndex의 값}
 const [currentTime , setCurrentTime] = useState('00:00');
 const [duration , setDuration ] = useState('00:00');

 useImperativeHandle(ref , ()=> ({
  play : ()=>{
    audio.current.play();
  },
  pause : () => {
    audio.current.pause();
  },
  changeVolume : (volume) => {
    audio.current.volume = volume;
  }
 }))

 const onPlay = () => {
  dispatch(playMusic())
 }
 
 const convertFormat = (time) => {
  const min =  `0${parseInt(time/60)}`; 
  const sec = `0${parseInt(time%60)}`;
  return `${min}:${sec.slice(-2)}`
 }

 const onTimeUpdate = (event) => {
    if(event.target.readyState === 0) //리소스가 부족한 상태
      return;
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const progressBarWidth = (currentTime/duration) * 100;
    progressBar.current.style.width = `${progressBarWidth}%`;
    setCurrentTime(convertFormat(currentTime));
    setDuration(convertFormat(duration));
 }

 const onEnded =() => {
    dispatch(nextMusic())
 }

 const onClickProgress = (event) => {
  const progressBarWidth = event.currentTarget.clientWidth;
  const offsetX = event.nativeEvent.offsetX;
  const duration = audio.current.duration;
  audio.current.currentTime = (offsetX/progressBarWidth) * duration;
 }

 const onPause = () => {
  dispatch(stopMusic())
 }
  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref = {progressBar}>
        <audio
          autoPlay
          ref = {audio}
          src = {playList[currentIndex].src}
          onPlay= {onPlay}
          onPause = {onPause}
          onTimeUpdate={onTimeUpdate}
          onEnded = {onEnded} 
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);
