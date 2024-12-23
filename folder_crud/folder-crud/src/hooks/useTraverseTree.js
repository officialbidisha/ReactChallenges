const useTraverseTree = () => {
  function insertNode(tree, id, actualItem, isFolder) {
    debugger;
    if (tree.id === id && isFolder) {
      tree.children.unshift({
        id: new Date().getTime(),
        name: actualItem,
        isFolder,
        children: [],
      });
    }
    return tree;
  }
  return { insertNode };
};
export default useTraverseTree;
