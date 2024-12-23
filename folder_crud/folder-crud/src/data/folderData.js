const explorer = {
  id: "1",
  name: "src",
  isFolder: true,
  children: [
    {
      id: "2",
      name: "data",
      isFolder: true,
      children: [
        { id: "3", name: "folderData", isFolder: false, children: [] },
        {
          id: "4",
          name: "datum",
          isFolder: true,
          children: [
            { id: "5", name: "loopdatum", isFolder: false, children: [] },
          ],
        },
      ],
    },
    {
      id: "5",
      name: "App.css",
      isFolder: false,
      children: [],
    },
    {
      id: "6",
      name: "App.js",
      isFolder: false,
      children: [],
    },
  ],
};
export default explorer;
