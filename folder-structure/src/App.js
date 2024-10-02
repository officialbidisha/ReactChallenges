import { useState } from "react";
import "./index.css";
import data from "./data/folderData";
import Folder from "./components/folder";
import useTraverseTree from "./hooks/use-traverse-tree";
export default function App() {
  const [explorerData, setExplorerData] = useState(data);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}