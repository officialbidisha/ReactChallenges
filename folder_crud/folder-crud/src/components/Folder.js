import { useState } from "react";

const Folder = ({ explorer, handleInsertNode }) => {
  const [expanded, setIsExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [input, setInput] = useState("");

  const addNewFolder = (e) => {
    debugger;
    setInput(e.target.value);
    if (e.keyCode === 13 && e.target.value) {
      debugger;
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
    }
  };

  const handleFolder = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder });
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: "5px" }}>
        <div className="folder" onClick={() => setIsExpanded(!expanded)}>
          {explorer.name}
          <div>
            <button onClick={(e) => handleFolder(e, false)}>File +</button>
            <button onClick={(e) => handleFolder(e, true)}>Folder +</button>
          </div>
        </div>
        <div
          style={{ display: expanded ? "block" : "hidden", marginLeft: "5px" }}
        >
          {showInput.visible && (
            <div className="input_container">
              <input
                className="inputContainer"
                type="text"
                autoFocus
                value={input}
                onInput={(e) => setInput(e.target.value)}
                onKeyDown={(e) => addNewFolder(e)}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              ></input>
            </div>
          )}
          {explorer.children.map((exp) => {
            return <Folder explorer={exp}></Folder>;
          })}
        </div>
      </div>
    );
  } else {
    return <div className="file">{explorer.name}</div>;
  }
};
export default Folder;
