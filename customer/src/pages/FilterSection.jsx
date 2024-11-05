import React from "react";
import "./FilterSection.css";

const FilterSection = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
}) => {
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceRange([0, 50000]);
  };

  return (
    <div className="filter-section">
      <input
        type="text"
        className="search-input"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Fitness">Fitness</option>
        <option value="Home">Home</option>
      </select>
      <input
        type="range"
        min="0"
        max="50000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
      />
      <span>Up to ₹{priceRange[1]}</span> {/* Changed $ to ₹ */}
      <button className="reset-button" onClick={handleResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
