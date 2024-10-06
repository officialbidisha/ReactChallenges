import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { useState } from "react";
import "./ProductTable.css";
const ProductTable = ({ products }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "price",
    direction: "ascending",
  });
  console.log("Products inside producttable", products);
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  return (
    <>
      <TableHeader handleSort={handleSort} />
      <tbody>
        {sortedProducts.map((product) => {
          return <TableRow product={product} key={product.id}></TableRow>;
        })}
      </tbody>
    </>
  );
};

export default ProductTable;
