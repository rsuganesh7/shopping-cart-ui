import ProductCard from "./ProductCard";
import "./Product.css";
const ProductList = ({ products, resolveProductImage }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          resolveProductImage={resolveProductImage}
        />
      ))}
    </div>
  );
};

export default ProductList;
