import { createContext, useState, useContext } from 'react';
import {products} from "../pages/api/data/product"
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0); // New state for discount
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = products.filter(product =>
      product?.title.toLowerCase().includes(lowercasedQuery) ||
      product?.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const applyDiscount = (discountCode) => {
    // Improved discount logic
    if (discountCode === "SAVE10") {
      setDiscount(10); // Fixed discount of $10
    }
    else if (discountCode === "SAVE20") {
      setDiscount(20); // Fixed discount of $10
    }  
     else if (discountCode === "SAVE10PERCENT") {
      setDiscount("10%"); // Percentage discount of 20%
    }else if (discountCode === "SAVE20PERCENT") {
      setDiscount("20%"); // Percentage discount of 20%
    } else {
      setDiscount(0); // No discount
    }
  };

  
  const calculateTotal = () => {
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (typeof discount === "number") {
      total -= discount;
    } else if (typeof discount === "string" && discount.endsWith("%")) {
      const percentage = parseFloat(discount) / 100;
      total -= total * percentage;
    }
    return parseFloat(total) || 0; // Ensure a valid number is returned
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, applyDiscount, calculateTotal, discount,filteredProducts,handleSearch,discount,setCart}}>
      {children}
    </CartContext.Provider>
  );
};
