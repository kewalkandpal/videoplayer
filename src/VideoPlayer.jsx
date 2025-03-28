import { Maximize, Minimize, Pause, SkipBack, SkipForward, SquarePlay, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";


function VideoPlayer(){
    const videoRef = useRef(null);
    const [isPlay,setIsplay] = useState(false);
    const [duration,setDuration] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);
    const [progressBar,setprogressBar] = useState(0);
    const fullScreenRef = useRef(null);
    const [isFullScreen,setIsFullScreen] = useState(false);
    const progressRef = useRef(null);
    const [volume,setVolume] = useState(0.5);
    const [toggle,setToggle] = useState(false);

    function handlePlayAndPause(){
        const player = videoRef.current;
        if(!player) return;
        if(player.paused){
            setIsplay(true);
            player.play()
        }else{
            setIsplay(false);
            player.pause();
        }
    };

    function convertTimeInMinute(time){
        return (time / 60).toFixed(2);
    };

    function fullScreen(){
        const screen = fullScreenRef.current;
        if(!screen) return;
        if(document.fullscreenElement){
            setIsFullScreen(false);
            document.exitFullscreen();
        }else{
            setIsFullScreen(true);
            screen.requestFullscreen();
        }
    };

    function onTimeUpdate(player){
        setCurrentTime(player.currentTime);
        const getPercent = (player.currentTime / player.duration) * 100;
        setprogressBar(getPercent);
    };

    function seek(time){
        const player = videoRef.current;
        if(!player) return;
        player.currentTime += time;
    };

    function updateProgressOnClick(e){
        const player = videoRef.current;
        const container = progressRef.current;
        if(!container || !player) return;
        const containerRect = container.getBoundingClientRect();
        const clientX = e.clientX - containerRect.left;
        const newProgress = (clientX / containerRect.width) * duration;
        player.currentTime = newProgress;
        
    };

    function volumeControl(e){
        const player = videoRef.current;
        if(!player) return;
        const curVolume = e.target.value;
        setVolume(curVolume);
        player.volume = curVolume;
        
    };

    useEffect(()=>{
        const player = videoRef.current;
        if(!player) return;
        player.addEventListener("loadedmetadata",()=>{
            setDuration(player.duration);   
        })

        player.addEventListener("timeupdate",()=>{
            onTimeUpdate(player);
        })

    },[]);

    return(
        <div className="w-[700px] relative" ref={fullScreenRef}>
            <video src='myvdo.mp4' ref={videoRef} onContextMenu={(e)=> e.preventDefault()} />
            <div className="absolute w-full text-white bottom-0 left-0  bg-gradient-to-t from-black to-transparent">
                <div className="h-[7px] bg-gray-500/50 m-2 cursor-pointer" ref={progressRef} onClick={(e)=>updateProgressOnClick(e)}>
                    <div className="h-full bg-red-500" style={{width:progressBar+"%"}}></div>
                </div>
                <div className="flex px-4 py-3 items-center ">
                    <div className="flex gap-5 items-center flex-1">
                        <button className="cursor-pointer" onClick={handlePlayAndPause}>
                            { isPlay ? <Pause /> : <SquarePlay />}
                        </button>
                        <button className="cursor-pointer" onClick={()=>seek(-10)}>
                            <SkipBack />
                        </button>
                        <button className="cursor-pointer" onClick={()=>seek(10)}>
                            <SkipForward />
                        </button>
                        <button className="cursor-pointer">
                            {
                                volume < 0.1 ?  <VolumeOff /> : <Volume2 />
                            }
                        </button>
                        <input type="range" min={0} max={1} value={volume} step={0.1} className="w-[80px] h-[5px] cursor-pointer bg-white" onChange={(e)=>volumeControl(e)}/>
                        <div>{convertTimeInMinute(currentTime)} / {convertTimeInMinute(duration)}</div>
                    </div>
                    <div className="flex gap-5">
                        {isFullScreen ?  
                        <button className="cursor-pointer" onClick={fullScreen}> <Minimize /></button>
                        :
                        <button className="cursor-pointer" onClick={fullScreen}>
                        <Maximize />
                        </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VideoPlayer;