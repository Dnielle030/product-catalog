import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

const badges = { 1: "New", 5: "Sale" };

function App() {
  // Cart state from Lab 3
  const [count, setCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Lab 4 state
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Debounce: wait 300 ms after the last keystroke before filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer); // cleanup
  }, [searchText]);

  const handleAddToCart = (title) => {
    setCount((prev) => prev + 1);
    setLastAdded(title);
  };

  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  // Derived list: filter first, then sort a copy
  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
    )
    .filter((p) => category === "All" || p.category === category);

  const displayedProducts = [...filteredProducts];
  if (sortOrder === "asc") {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  // Update the browser tab title whenever the number of results changes
  useEffect(() => {
    document.title = `CvSU Mini Store (${displayedProducts.length} results)`;
  }, [displayedProducts.length]);

  return (
    <div className="app">
      <header>
        <h1>CvSU Mini Store</h1>
      </header>

      <p className="cart-message">
        {count === 0
          ? "Your cart is empty."
          : `Items added to cart: ${count} (Last added: ${lastAdded})`}
      </p>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClear}
      />

      <p className="result-count">
        Showing {displayedProducts.length} of {products.length} products
      </p>

      {displayedProducts.length === 0 ? (
        <p className="empty-state">
          No products found. Try a different keyword or category.
        </p>
      ) : (
        <div className="grid">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              inStock={product.inStock}
              onAddToCart={handleAddToCart}
            >
              {badges[product.id] && <span>{badges[product.id]}</span>}
            </ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;