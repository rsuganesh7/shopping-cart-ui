import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (!res.ok){
        setError("Failed to fetch products");
      }
      const data = await res.json();
      setProducts(data);
      console.log('Products: ', data);
    
      }
    catch (error){
      setError("Failed to fetch products");
      console.error('Error fetching products: ', error);
    }
    finally{
      setLoading(false);
    }
}
  useEffect(() => {
    fetchProducts()
    },[])

  
 
  return (
    <div className="container">
      <header>
        <h1>Shopping Cart</h1>
      </header>
      <main>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
