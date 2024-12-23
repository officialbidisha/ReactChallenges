import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <h1>The Great Tic Tac Toe</h1>
      <Board size={3} />
    </div>
  );
}

export default App;
