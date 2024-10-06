const TableRow = ({ product }) => {
    const { id, title, category, price, availabilityStatus, rating, thumbnail } =
      product;
    return (
      <tr>
        {/* <td>{id}</td> */}
        <td>{title}</td>
        <td>{category}</td>
        <td>${price.toFixed(2)}</td>
        <td>{rating}</td>
        <td>{availabilityStatus}</td>
        <td>
          <img src={thumbnail} style={{ width: 35, height: 35 }} alt="product_thumbnail_image"></img>
        </td>
      </tr>
    );
  };
  export default TableRow;
  