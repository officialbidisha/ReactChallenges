import { useState } from "react";

const Folder = ({
  explorer,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
}) => {
  const [expanded, setIsExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState("");

  const handleEdit = (e) => {
    if (e.key === "Enter" && input) {
      handleEditNode(explorer.id, input);
      setEditMode(false);
      setInput("");
    }
  };

  const handleDelete = () => {
    handleDeleteNode(explorer.id);
  };

  const addNewFolder = (e) => {
    setInput(e.target.value);
    if (e.keyCode === 13 && e.target.value) {
      setShowInput({ ...input, visible: false });
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
        {editMode ? (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEdit}
            onBlur={() => setEditMode(false)}
            autoFocus
          />
        ) : (
          <div
            className="folder"
            onClick={() => {
              debugger;
              setIsExpanded(!expanded);
            }}
            style={{ cursor: "pointer" }}
          >
            {explorer.name}
            <div>
              <button onClick={(e) => handleFolder(e, false)}>File +</button>
              <button onClick={(e) => handleFolder(e, true)}>Folder +</button>
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={() => handleDelete()}>Delete</button>
            </div>
          </div>
        )}

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
          {expanded &&
            explorer.children.map((exp) => {
              return (
                <Folder
                  explorer={exp}
                  handleInsertNode={handleInsertNode}
                  handleEditNode={handleEditNode}
                  handleDeleteNode={handleDeleteNode}
                ></Folder>
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="file">{explorer.name}</div>
      </>
    );
  }
};
export default Folder;
