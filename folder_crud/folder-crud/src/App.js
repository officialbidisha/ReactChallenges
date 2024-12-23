import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import useTraverseTree from "./hooks/useTraverseTree";
function App() {
  const [explorerData, setIsExplorer] = useState(explorer);
  const { insertNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorer, folderId, item, isFolder);
    setIsExplorer(finalTree);
  };
  return (
    <div className="App">
      <Folder
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
      ></Folder>
    </div>
  );
}

export default App;
