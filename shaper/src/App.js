import "./App.css";
import Shaper from "./components/Shaper";

function App() {
  const data = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ];
  return (
    <div className="App">
      <Shaper data={data}></Shaper>
    </div>
  );
}

export default App;
