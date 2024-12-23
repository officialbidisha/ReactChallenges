import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import useTraverseTree from "./hooks/useTraverseTree";
function App() {
  const [explorerData, setIsExplorer] = useState(explorer);
  const { insertNode, editNode, deleteNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorer, folderId, item, isFolder);
    setIsExplorer(finalTree);
  };
  const handleEditNode = (nodeId, newName) => {
    const updatedTree = editNode(explorerData, nodeId, newName);
    setIsExplorer({ ...updatedTree });
  };

  const handleDeleteNode = (nodeId) => {
    const updatedTree = deleteNode(explorerData, nodeId);
    setIsExplorer({ ...updatedTree });
  };
  return (
    <div className="App">
      <Folder
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
      ></Folder>
    </div>
  );
}

export default App;
