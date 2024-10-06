import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { useState } from "react";
import "./ProductTable.css";

const ProductTable = ({ products }) => {
  const [sortConfig, setSortConfig] = useState(null); // Initially, no sorting is applied

  const handleSort = (key) => {
    let direction = "ascending";

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"; // Toggle the direction if the same column is clicked again
    }

    setSortConfig({ key, direction }); // Set sorting configuration
  };

  const sortedProducts = sortConfig
    ? [...products].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      })
    : products; // If no sorting is applied, return the products in the original order

  return (
    <>
      <table>
        <TableHeader handleSort={handleSort} />
        <tbody>
          {sortedProducts.map((product) => (
            <TableRow product={product} key={product.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
