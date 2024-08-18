import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const { cart, calculateTotal, discount ,setCart} = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
   
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <div className="min-h-screen pt-6 px-4 mx-6 md:px-12 lg:px-16">
     <hr className="my-4" />


      {orderPlaced ? (
        <div className="text-center">
          <h2 className="text-sm md:text-lg lg:text-2xl font-semibold text-green-600">Order Placed Successfully!</h2>
          <p className="mt-4">Thank you for your purchase. Your order is <span className="text-lg md:text-xl lg:text-2xl text-yellow-500"> on its way!</span></p>
          <Link href="/" className="mt-4 lg:text-2xl text-gray-800 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span className="text-base lg:text-lg mr-2 md:mr-4">{item.title}<span className="text-yellow-700"> (x{item.quantity})</span></span>
                <span className="text-base lg:text-lg ">${item.price * item.quantity}</span>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            {discount !== 0 && (
              <div className="flex justify-between font-semibold text-green-600 mt-2">
                <span>Discount Applied:</span>
                <span>{typeof discount === "number" ? `$${discount}` : discount}</span>
              </div>
            )}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="button"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
