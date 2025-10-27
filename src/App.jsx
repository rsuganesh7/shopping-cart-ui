import { useContext } from 'react'
import './App.css'
import ProductList from './components/ProductList';
import { ProductContext } from './context/context';
import Header from './components/Header';
const productImages = import.meta.glob('./assets/images/*', {
  eager: true,
  import: 'default'
});

const resolveProductImage = (relativePath) => {
  if (typeof relativePath !== 'string' || !relativePath.length) {
    return relativePath;
  }

  const normalizedPath = relativePath.replace(/^\.?\/*/, '');
  const assetKey = `./assets/${normalizedPath}`;

  if (productImages[assetKey]) {
    return productImages[assetKey];
  }

  if (/^https?:\/\//i.test(relativePath)) {
    return relativePath;
  }

  return `/${normalizedPath}`;
};

function App() {
  

  const {products,loading,error} = useContext(ProductContext);
 
  return (
    <div className="container">
      <Header resolveProductImage={resolveProductImage}/>
      <main>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        <ProductList products={products} resolveProductImage={resolveProductImage} />
      </main>
    </div>
  )
}

export default App
