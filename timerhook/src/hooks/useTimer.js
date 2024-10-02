import {useRef, useState} from 'react';
const useTimer = (props)=>{
  const [isRunning, setIsRunning] = useState(false);
  const [seconds,setSeconds] = useState(props);
  let timerRef = useRef(null);
  const start = () =>{
    if(timerRef.current) return;
    timerRef = setInterval(()=>{
      setSeconds((prev)=> {
        if(prev === 0){
          stop();
          return 0;
        }
        return prev-1});
    },1000);
    setIsRunning(true);
  }
  const stop = () => {
    clearInterval(timerRef);
    if(timerRef.current){
    timerRef.current = null;
    }
    setIsRunning(false);
  }
  return {isRunning, start, stop, seconds};
};
export default useTimer;