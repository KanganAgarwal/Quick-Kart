import { useRouter } from 'next/router';
import { products } from '../api/data/product'; // Adjust path as necessary
import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import {ArrowLeftCircleIcon } from '@heroicons/react/24/solid';

import { useCart } from '../../context/CartContext';
export async function getServerSideProps(context) {
  const { id } = context.params;
  const product = products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export default function ProductDetails({ product }) {
 const [addedProducts, setAddedProducts] = useState(new Set());
 
  const { addToCart} = useCart();

  const handleButtonClick = (product) => {
    addToCart(product);
    setAddedProducts(prev => new Set(prev).add(product.id));
   
  };
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBackClick}
        className="button"
      >
        <ArrowLeftCircleIcon className="size-6 text-gray-800 " />
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={product.image} // Ensure image URL is correct
          alt={product.title}
          className="w-full md:w-1/2 lg:w-1/3 object-cover rounded-lg shadow-md"
        />
        <div className="md:ml-6 mt-4 md:mt-0 w-full md:w-1/2 lg:w-2/3">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">{product.title}</h1>
          <p className="text-base md:text-lg text-gray-700 mt-2">{product.description}</p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mt-4">${product.price}</p>
            <button
              onClick={() => handleButtonClick(product)}
              className=" button"
            >
              
              <span>{addedProducts.has(product.id) ?'Added to Cart' : 'Add to Cart'}</span>
              <ShoppingCartIcon className="size-6 text-gray-800 ml-2" />
            </button>
        </div>
       
      </div>
    </div>
  );
}
