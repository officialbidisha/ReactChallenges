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
  return { insertNode };
};
export default useTraverseTree;
