const useTraverseTree = () => {
  function insertNode(tree, id, actualItem, isFolder) {
    let queue = [tree];

    while (queue.length) {
      let currentNode = queue.shift();

      if (currentNode.id === id && currentNode.isFolder) {
        currentNode.children.unshift({
          id: new Date().getTime(),
          name: actualItem,
          isFolder,
          children: [],
        });
        return tree;
      }

      if (currentNode.children) {
        queue.push(...currentNode.children);
      }
    }

    return tree; // Return the tree as is if no match is found
  }

  const editNode = (tree, nodeId, newName) => {
    let queue = [tree];

    while (queue.length) {
      let currentNode = queue.shift();

      if (currentNode.id === nodeId) {
        currentNode.name = newName;
        return tree;
      }

      if (currentNode.children) {
        queue.push(...currentNode.children);
      }
    }

    return tree; // Return the tree as is if no match is found
  };

  const deleteNode = (tree, nodeId) => {
    let queue = [tree];

    while (queue.length) {
      let currentNode = queue.shift();

      if (currentNode.children) {
        currentNode.children = currentNode.children.filter(
          (child) => child.id !== nodeId
        );
        queue.push(...currentNode.children);
      }
    }

    // Check if the root itself should be deleted
    if (tree.id === nodeId) return null;

    return tree; // Return the modified tree
  };

  return { insertNode, editNode, deleteNode };
};

export default useTraverseTree;
