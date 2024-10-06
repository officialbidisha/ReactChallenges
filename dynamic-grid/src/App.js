import "./styles.css";
import { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [products, setProducts] = useState([]);
  async function fetchProduct() {
    let result = await fetch("https://dummyjson.com/products");
    let r = await result.json();
    return r;
  }
  useEffect(() => {
    setIsLoading(true);
    fetchProduct()
      .then((res) => {
        setIsLoading(false);
        setProducts(res.products);
      })
      .catch((err) => {
        setIsError(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="App">
      {!isLoading && !isError && (
        <table>
          <ProductTable products={products}></ProductTable>
        </table>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
