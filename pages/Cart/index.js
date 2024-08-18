import { useCart } from '../../context/CartContext';
import { TrashIcon } from '@heroicons/react/24/solid';
import {useState} from 'react'
import Link from "next/link"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, applyDiscount, calculateTotal, discount } = useCart();
  const [discountCode, setDiscountCode] = useState("");

  const handleApplyDiscount = () => {
    applyDiscount(discountCode);
  };



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.length === 0 ? (
          <p className="text-lg font-semibold text-yellow-600">Oooops! Your cart is empty :(</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="border p-2 md:p-4 rounded shadow flex items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover sm:mr-4" />
              <div className="flex-grow">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold">{item.title.slice(0,30)+"..."}</h2>
                <p className="ext-base sm:text-lg md:text-xl text-gray-600 text-base">{item.description.slice(0,30) + "..."}</p>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    className="bg-gray-300 text-gray-800 py-1 px-2 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity || 1}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="border p-1 mx-2 w-16 text-center"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    className="bg-gray-300 text-gray-800 py-1 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-white-600 py-1 px-4 rounded ml-4"
              >
             <TrashIcon className="size-8 text-amazon-primary ml-2" />
              </button>
            </div>
          ))
        )}
      </div>
     {cart.length > 0 && (<div className="my-4">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="border p-2 rounded w-[250px] md:w-1/3 mr-2"
            />
            <button
              onClick={handleApplyDiscount}
              className="button"
            >
              Apply Discount
            </button>
          </div>)}

          {(discount !== 0 && cart.length>0) && (
            <div className="mb-4 text-green-600">
           
             Discount Applied: {typeof discount === "number" ? `$${discount}` : discount}
           
            </div>
           )}
    

      {cart.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h2>
          <Link href='/Checkout'>
          <button
           
            className="button"
          >
         Checkout
          </button>
          </Link>
        </div>
      )}
    </div>
  );
}
