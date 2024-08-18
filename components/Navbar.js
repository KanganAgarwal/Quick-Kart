// components/Navbar.js
import Link from 'next/link';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Logo from '../public/Logo.png';
import Image from 'next/image'
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cart, handleSearch } = useCart();

  const onSearch = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);  // Trigger search in context
  };
 

  return (
    <nav className="bg-amazon-dark object-contain min-w-[250px] text-white p-2 md:p-4 flex items-center justify-between my-4 mx-2 sm:mx-4 md:mx-12 lg:mx-16">
     <Link href="/">
     <Image
      src={Logo}
      width={100}
      height={80}
      alt="Quick Kart"
    />
      </Link>

      {/* Search Bar */}
      <form className="flex flex-grow max-w-2xl bg-white rounded-full overflow-hidden border border-black/25">
        <input
          type="text"
          value={searchQuery}
          onChange={onSearch}
          placeholder="Search..."
          className="flex-grow px-4 :py-2 text-gray-800 placeholder-gray-500 outline-none placeholder:text-sm sm:placeholder:text-base"
        />
        <button type="submit" className="bg-yellow-500 p-2">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-800" />
        </button>
      </form>

      {/* Cart Icon */}
      <Link href="/Cart" className="flex items-center ml-4 relative">
        <ShoppingCartIcon className="h-8 w-8 md:h-10 md:w-10 text-gray-600" />
 
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-[6px] md:px-2 py-1 text-xs font-bold leading-none text-red-100 bg-yellow-600 rounded-full">
          {cart.length}
        </span>
      </Link>
    </nav>
  );
}
