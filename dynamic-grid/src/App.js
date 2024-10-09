import "./styles.css";
import { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [products, setProducts] = useState([]); // All loaded products
  const [filteredProducts, setFilteredProducts] = useState([]); // Search results
  const [searchQuery, setSearchQuery] = useState("");
  const [limit] = useState(10); // Fixed limit for each page
  const [skip, setSkip] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Fetch products from API
  async function fetchProducts() {
    setIsLoading(true); // Start loading before the fetch
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();

      if (data.products.length > 0) {
        const newProducts = [...products, ...data.products];
        setProducts(newProducts); // Append new products to the existing ones

        // Filter new products based on search query
        if (searchQuery) {
          const filtered = newProducts.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredProducts(filtered);
        }

        if (data.total <= skip + limit) {
          setHasNextPage(false); // No more pages available
        }
      } else {
        setHasNextPage(false); // No more products
      }
    } catch (err) {
      setIsError(err.message); // Handle error
    } finally {
      setIsLoading(false); // Stop loading
    }
  }

  // Load more products when the last item is in view
  const loadMoreProducts = () => {
    if (!isLoading && hasNextPage) {
      setSkip((prev) => prev + limit);
    }
  };

  // Ref for the last product to observe with IntersectionObserver
  const lastProductRef = useIntersectionObserver(loadMoreProducts, [hasNextPage]);

  // Handle search input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Filter products based on the search query
    if (value.length > 0) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Reset filtered products when search query is empty
    }
  };

  // Fetch products when the component mounts and when `skip` changes (pagination)
  useEffect(() => {
    fetchProducts(); // Trigger fetch when `skip` changes (for infinite scrolling)
  }, [skip]);

  return (
    <div className="App">
      {/* Show loader if products are still loading */}
      {isLoading && skip === 0 && (
        <div className="loader">
          <p>Loading products...</p>
        </div>
      )}

      {/* Render search input and product table */}
      {products.length > 0 && (
        <>
          <div>
            <input
              type="text"
              placeholder="Search products here..."
              value={searchQuery}
              onChange={handleInputChange}
              className="input_holder"
            />
          </div>
          <table>
            <ProductTable
              products={
                searchQuery && filteredProducts.length > 0
                  ? filteredProducts
                  : products
              }
            />
          </table>

          {/* Trigger to load more products via infinite scrolling */}
          {hasNextPage && !isLoading && !searchQuery && (
            <div ref={lastProductRef} className="loading-trigger" />
          )}
        </>
      )}

      {/* Show no products message if none are available */}
      {!isLoading && products.length === 0 && !isError && (
        <p>No products available.</p>
      )}

      {/* Handle error display */}
      {isError && <p className="error">{isError}</p>}
    </div>
  );
}
