import { useState } from "react";

const Folder = ({ explorer }) => {
  const [expanded, setIsExpanded] = useState(false);
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: "5px" }}>
        <div className="folder" onClick={() => setIsExpanded(!expanded)}>
          {explorer.name}
        </div>
        <div
          style={{ display: expanded ? "block" : "hidden", marginLeft: "5px" }}
        >
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
