import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./Controls.scss";
import { useDispatch, useSelector } from "react-redux";
import { prevMusic  , nextMusic, setRepeat} from "../../store/musicPlayerReducer";

const RepeatButton =  ({repeat , ...props}) => {
  switch (repeat){
    case 'ALL':
      return  <RepeatIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props}/>
    case 'ONE':
      return <RepeatOneIcon sx = {{fontSize : 30 , cursor : "pointer"}} {...props}/>
    case "SHUFFLE":
      return <ShuffleIcon sx = {{fontSize : 30 , cursor : "pointer"}} {...props}/>
    default:
      return  null;
  }
} 

const Controls = ({
  showMusicList,
  setShowMusicList,
  resetDuration,
  play,
  pause,
  changeVolume,
}) => {
  
    const playing = useSelector((state)=> state.playing);
    const repeat = useSelector((state)=> state.repeat);
    const dispatch = useDispatch();

    const onClickRepeat = () => {
      dispatch(setRepeat())
    }
    const onClickPlay = () => {
      play();
    }
    
    const onClickPause = () => {
      pause();
    }
    const onClickNext = () => {
      dispatch(nextMusic());
    }
    
    const onClickPrev = () => {
      dispatch(prevMusic());
    }

    const onChagneVolume = (event) =>{
      changeVolume(event.target.value);
    }
  return (
    <div className="control-area">
      <QueueMusic
        sx={{ fontSize: 30, cursor: "pointer" }}
    
      />
      <RepeatButton repeat = {repeat} 
       onClick = {onClickRepeat}/>

      <SkipPrevious
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick = {onClickPrev}
      />
      {playing ? (
        <PauseIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick = {onClickPause} 
        />
      ) : (
        <PlayArrow
          className="play"
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick = {onClickPlay}
        />
      )}
      <SkipNext
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick = {onClickNext}
      />
      <div className="volume-container">
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          min="0"
          max="1"
          step="0.1"
          onChange={onChagneVolume}
        />
      </div>
    </div>
  );
};

export default Controls;
