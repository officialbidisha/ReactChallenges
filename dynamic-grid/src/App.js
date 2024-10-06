import "./styles.css";
import { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  async function fetchProduct() {
    let result = await fetch("https://dummyjson.com/products");
    let r = await result.json();
    return r;
  }

  useEffect(() => {
    console.log("query", searchQuery);
  }, [searchQuery]);
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

  const handleInputChange=(e) =>{
    let value = e.target.value;
    if(value.length === 0){
      setFilteredProducts(products);
      return;
    }
    setSearchQuery(value);
    let filteredProducts = products && products.filter((x)=> x.title.toLowerCase().includes(value.toLowerCase()))
    setFilteredProducts(filteredProducts);
  }
  return (
    <div className="App">
      {!isLoading && !isError && (
        <>
          <div>
            <input type="text" placeholder="Search products here..." onInput={handleInputChange} className="input_holder"></input>
          </div>
          <table>
            <ProductTable products={filteredProducts.length>0?filteredProducts : products}></ProductTable>
          </table>
        </>
      )}
      {isLoading && (
        <div className="loader">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
