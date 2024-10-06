const TableHeader = ({ handleSort }) => {
    const handleClick = (e) => {
      switch (e.target.id) {
        case "rating_sorter": {
          handleSort("rating");
          break;
        }
        case "price_sorter": {
          handleSort("price");
          break;
        }
        default:
          break;
      }
    };
    return (
      <thead onClick={handleClick}>
        <tr>
          {/* <th>ID</th> */}
          <th>Title</th>
          <th>Category</th>
          <th>
            Price
            <span>
              <button
                style={{
                  backgroundColor: "white",
                  outline: "none",
                  border: 0,
                  cursor: "pointer",
                }}
                id="price_sorter"
              >
                ^v
              </button>
            </span>
          </th>
          <th>
            {" "}
            Rating
            <span>
              <button
                style={{
                  backgroundColor: "white",
                  outline: "none",
                  border: 0,
                  cursor: "pointer",
                }}
                id="rating_sorter"
              >
                ^v
              </button>
            </span>{" "}
          </th>
          <th>Availability</th>
          <th>Thumbnail</th>
        </tr>
      </thead>
    );
  };
  
  export default TableHeader;
  