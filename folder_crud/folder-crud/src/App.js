import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
function App() {
  return (
    <div className="App">
      <Folder explorer={explorer}></Folder>
    </div>
  );
}

export default App;
