import Products from './Products'
import { useCart } from '../context/CartContext';

export default function Home() {
  const { filteredProducts } = useCart();

  return (
    <div className="min-h-screen w-screen flex flex-col  items-center justify-center m-2 md:m-4 lg:m-6 p-6 md:p-4 lg:p-6">
    
   
    <Products products={filteredProducts}/>
    </div>
  )
}
