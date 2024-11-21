import React, { useState } from "react";
import { useShop } from "../contexts/ShopContext";
import "./Products.css";
import FilterSection from "./FilterSection";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 9999.99,
    category: "Electronics",
    image: "/images/wireless-headphones.jpg",
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 1599.99,
    category: "Fashion",
    image: "/images/cotton-tshirt.jpg",
  },
  {
    id: 3,
    name: "Smartphone",
    price: 39999.99,
    category: "Electronics",
    image: "/images/smartphone.jpg",
  },
  {
    id: 4,
    name: "Yoga Mat",
    price: 2599.99,
    category: "Fitness",
    image: "/images/yoga-mat.jpg",
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 1999.99,
    category: "Home",
    image: "/images/water-bottle.jpg",
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 4999.99,
    category: "Electronics",
    image: "/images/gaming-mouse.jpg",
  },
  {
    id: 7,
    name: "Leather Jacket",
    price: 12000.0,
    category: "Fashion",
    image: "/images/leather-jacket.jpg",
  },
  {
    id: 8,
    name: "Running Shoes",
    price: 8999.99,
    category: "Fitness",
    image: "/images/running-shoes.jpg",
  },
  {
    id: 9,
    name: "Electric Kettle",
    price: 3999.99,
    category: "Home",
    image: "/images/electric-kettle.jpg",
  },
  {
    id: 10,
    name: "LED Desk Lamp",
    price: 2999.99,
    category: "Home",
    image: "/images/desk-lamp.jpg",
  },
];

const Products = () => {
  const { addToCart, addToWishlist } = useShop();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [addedToCart, setAddedToCart] = useState(null);
  const [addedToWishlist, setAddedToWishlist] = useState(null);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setAddedToWishlist(product.id);
    setTimeout(() => setAddedToWishlist(null), 2000);
  };

  return (
    <div>
      <FilterSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>₹{product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  backgroundColor: addedToCart === product.id ? "green" : "",
                }}
              >
                {addedToCart === product.id ? "Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => handleAddToWishlist(product)}
                style={{
                  backgroundColor: addedToWishlist === product.id ? "green" : "",
                }}
              >
                {addedToWishlist === product.id
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
