import React, { useState } from "react";
import { useShop } from '../contexts/ShopContext';
import '../Customer_Css/Products.css';
import FilterSection from '../Customer_Pages/FilterSection';
import headphone from '../assests/wireless-headphones.jpg';
import cotton from '../assests/cotton-tshirt.jpg';
import smartphn from '../assests/smartphone.jpg'
import yoga from '../assests/yoga-mat.jpg';
import water from '../assests/water-bottle.jpg';
import gaming from '../assests/gaming-mouse.jpg';
import leather from '../assests/leather-jacket.jpg';
import shoe from '../assests/running-shoes.jpg';
import kettle from '../assests/electric-kettle.jpg';
import lamp from '../assests/desk-lamp.jpg';
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { addToCart } from "../redux/features/cartSlice";


const products = [
  {
    _id: 1,
    name: "Wireless Headphones",
    price: 9999.99,
    category: "Electronics",
    image: headphone,
  },
  {
    _id: 2,
    name: "Cotton T-Shirt",
    price: 1599.99,
    category: "Fashion",
    image: cotton,
  },
  {
    _id: 3,
    name: "Smartphone",
    price: 39999.99,
    category: "Electronics",
    image: smartphn,
  },
  {
    _id: 4,
    name: "Yoga Mat",
    price: 2599.99,
    category: "Fitness",
    image: yoga,
  },
  {
    _id: 5,
    name: "Stainless Steel Water Bottle",
    price: 1999.99,
    category: "Home",
    image: water,
  },
  {
    _id: 6,
    name: "Gaming Mouse",
    price: 4999.99,
    category: "Electronics",
    image: gaming,
  },
  {
    _id: 7,
    name: "Leather Jacket",
    price: 12000.0,
    category: "Fashion",
    image: leather,
  },
  {
    _id: 8,
    name: "Running Shoes",
    price: 8999.99,
    category: "Fitness",
    image: shoe,
  },
  {
    _id: 9,
    name: "Electric Kettle",
    price: 3999.99,
    category: "Home",
    image:kettle,
  },
  {
    _id: 10,
    name: "LED Desk Lamp",
    price: 2999.99,
    category: "Home",
    image: lamp,
  },
];

const Products = () => {
  const dispatch=useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  
 

  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);
 
  const navigate = useNavigate();
  const handleProduct=()=>{
    navigate(`/customer/productdetails/${products._id}`);
  }

  const filteredProducts = products.filter((product) =>
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

      <div className="products"  onClick={() => handleProduct()}>
        
        {filteredProducts.map((product,index) => (

          <div key={index} className="product-card">
           
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
           
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>₹{product.price.toFixed(2)}</p>
              <button className="addbutton"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product)}}
                
              >
                Add to Cart
              </button>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;