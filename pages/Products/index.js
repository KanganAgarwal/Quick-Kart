import Link from 'next/link'
import {ArrowRightCircleIcon } from '@heroicons/react/24/solid';

export default function Products({products}) {




  return (
    <div className="flex items-center justify-center p-2 sm:p-4 w-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.length==0 ?
        (<div className="text-base sm:text-xl md:text-2xl lg:text-4xl px-12">Oooooooooooooops!! No items Found......</div>):
        products?.map((product) => (
          <div key={product.id} className="p-2 m-2 sm:m-4 md:m-6 md:p-4 lg:p-6 rounded shadow border-b-2 hover:shadow-lg">
           
            <img src={product.image} alt={product.name} className="w-64 h-64 sm:w-72 sm:h-72 lg:h-80 lg:w-80  object-contain" />
            <h2 className="text-lg font-semibold">
              {product?.title?.length < 30 ? product.title : product?.title?.substring(0, 30)+"..."}
            </h2>
            <p className="text-base text-gray-400">
              {product?.description?.length < 30 ? product?.description : product?.description?.substring(0, 30)+"..."}
            </p>
            <p className="text-lg text-black-600 font-bold m-2">${product?.price?.toFixed(2)}</p>
            <Link href={`/Products/${product?.id}`}> <button
        
        className="button flex ml-auto items-center m-3"
      >
     Know more
        <ArrowRightCircleIcon className="size-6 text-gray-800 ml-2" />
      </button>
            </Link>
          </div>
        ))}
      </div>
     
    </div>
  );
}
