import useTimer from './hooks/useTimer.js';
export default function App() {
  const {isRunning, start, stop, seconds} = useTimer(5);
  const startHandler = (e) => {
    start();
  }
  const endHandler = (e) => {
    stop();
  }
  return (
    <main>
      <p>{isRunning ? seconds : 'No Timer Running'}</p> 
      <button onClick={startHandler}>Start</button>
      <button onClick={endHandler}>End</button>
    </main>
  );
}