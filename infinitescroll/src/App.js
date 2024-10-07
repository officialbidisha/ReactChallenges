import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setError] = useState(null);
  const [pageNum, setPageNum] = useState(1); // Start with page 1
  const observer = useRef(null);
  const TOTAL_PAGES = 20;

  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoading) return; // Don't observe when data is loading

      // Disconnect the previous observer if it exists
      if (observer.current) observer.current.disconnect();

      // Create new observer instance
      observer.current = new IntersectionObserver((entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && pageNum <= TOTAL_PAGES) {
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      });

      // Observe the last product element
      if (node) observer.current.observe(node);
    },
    [isLoading, pageNum]
  );

  const url = `https://randomuser.me/api/?page=${pageNum}&results=25&seed=abc`;

  // Function to fetch data from the API
  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const result = await res.json();
      setData((prev) => [...prev, ...result.results]); // Append new data
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }

  // Effect to fetch data on pageNum change
  useEffect(() => {
    fetchData();
  }, [pageNum]);

  return (
    <div className="App">
      {isError && <p>{isError.message}</p>}

      {!isError && (
        <div style={{ display: "inline-block" }}>
          {data.map((d, index) => {
            if (index === data.length - 1) {
              // Add ref to the last product to trigger the intersection observer
              return (
                <div ref={lastProductElementRef} key={index}>
                  <ProductCard product={d} />
                </div>
              );
            }
            return <ProductCard key={index} product={d} />;
          })}
        </div>
      )}

      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
