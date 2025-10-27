
import { useState,useEffect } from "react";

import { ProductContext } from "../context/context";

export const ProductProvider = ({children}) =>{
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/products");
      if (!res.ok){
        setError("Failed to fetch products");
      }
      const data = await res.json();
      console.log("🚀 ~ fetchProducts ~ data:", data)
      setProducts(data);
      console.log('Products: ', data);
    
      }
    catch (error){
      console.log("🚀 ~ fetchProducts ~ error:", error)
      setError("Failed to fetch products");
    }
    finally{
      setLoading(false);
    }}


    useEffect(() => {
    fetchProducts()
    },[])
    
    return(
      <ProductContext.Provider value={{products, loading, error}}>
        {children}
      </ProductContext.Provider>
    )

}

  
