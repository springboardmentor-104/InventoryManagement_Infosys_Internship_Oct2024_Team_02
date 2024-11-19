import React from 'react'
import '../Customer_Css/ProductDetails.css';
import { Link,useParams } from 'react-router-dom';
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';

function ProductDetails() {
    const{id}=useParams();
    const handleAddToCart = (product) => {
      console.log(product);
      dispatch(addToCart(product))
    }
    const [selectedIndexes, setSelectedIndexes] = useState({});
    const singleProduct = data?.product || {};
    const smImgsRef = useRef({});
  
    const handleImgChange = (newIndex, productId) => {
      setSelectedIndexes(prevState => ({
        ...prevState,
        [productId]: newIndex
      }));
  
      const images = smImgsRef.current[productId].children;
      for (let i = 0; i < images.length; i++) {
        images[i].className = images[i].className.replace("active", "");
      }
      images[newIndex].className = "active";
    };
  
    useEffect(() => {
      productData.forEach(({ id }) => {
        const index = selectedIndexes[id] ?? 0;
        if (smImgsRef.current[id]) {
          smImgsRef.current[id].children[index].className = "active";
        }
      });
    }, [selectedIndexes]);
  
    // Filter products based on selected category
    
  
    return (
      <section className='app'>
        {/* Filter Component */}
        <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
  
        {/* Products List */}
        {products.map(({ _id, title, src, description, content, price, colors }) => (
          <div key={index} className="details">
            <div className='large-img-wrapper'>
              <img src={src[selectedIndexes[_id] ?? 0]} alt="largeImg" className='large-img'/>
            </div>
  
            <div className='box'>
              <div className='row'>
                <h2>{title}</h2>
                <span>{price} $</span>
              </div>
              <Colors colors={colors} />
              <p>{description}</p>
              <p>{content}</p>
              <DetailsThumb
                images={src}
                handleImgChange={(newIndex) => handleImgChange(newIndex, _id)}
                smImgsRef={(ref) => smImgsRef.current[_id] = ref}
              />
              <button className='add-to-cart'>Add to cart</button>
            </div>
          </div>
        ))}
      </section>
    );
}

export default ProductDetails
