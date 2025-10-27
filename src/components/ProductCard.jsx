import { useContext } from "react";
import { CartContext } from "../context/context";

const ProductCard = ({ product, resolveProductImage }) => {
  const {addToCart} = useContext(CartContext);
  return (
    <div key={product.id} className="product-card">
      <img src={resolveProductImage(product.image)} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-card__description">{product.description}</p>
      <p className="product-card__price">${product.price}</p>
      <button onClick={()=>addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
