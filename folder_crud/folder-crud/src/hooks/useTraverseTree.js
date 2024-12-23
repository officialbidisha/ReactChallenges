const useTraverseTree = () => {
  function insertNode(tree, id, actualItem, isFolder) {
    if (tree.id === id && tree.isFolder) {
      tree.children.unshift({
        id: new Date().getTime(),
        name: actualItem,
        isFolder,
        children: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.children.map((t) => {
      return insertNode(t, id, actualItem, isFolder);
    });
    return { ...tree, children: latestNode };
  }

  const editNode = (tree, nodeId, newName) => {
    if (tree.id === nodeId) {
      tree.name = newName;
      return tree;
    }
    tree.children = tree.children.map((child) =>
      editNode(child, nodeId, newName)
    );
    return tree;
  };

  const deleteNode = (tree, nodeId) => {
    if (nodeId === tree.id) return null;
    if (!tree.children) return tree;

    // Remove the node if it matches the given ID
    tree.children = tree.children.filter((child) => child.id !== nodeId);

    // Recursively traverse children to delete the node
    tree.children = tree.children.map((child) => deleteNode(child, nodeId));

    return tree;
  };

  return { insertNode, editNode, deleteNode };
};
export default useTraverseTree;
