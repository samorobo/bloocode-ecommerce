"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import { useCart } from "@/context/CartContext";

type Props = {
  product: Product;
};

function Product({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border p-4 flex flex-col space-y-4">
      <Link
        href={`/product/${product.id}`}
        className="flex flex-col h-96 p-5  items-center hover:scale-105 transition-transform ease-out duration-200"
      >
        <div className="relative w-full h-60">
          <ProductImage product={product} fill />
        </div>

        <div className="font-semibold flex items-center justify-between mt-12 mb-1">
          <p className="w-44 truncate">{product.title}</p>
          <p className="">${product.price}</p>
        </div>

        <p className="italic text-xs w-64 line-clamp-2 text-gray-600 mt-18">
          {product.description}
        </p>
      </Link>

      <button
        onClick={() =>
          addToCart({
            id: Number(product.id),
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1, // ✅ Quantity will be handled in `CartContext.tsx`
          })
        }
        className="w-full bg-blue-600 h-8 text-white mb-32 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Add To Cart
      </button>
    </div>
  );
}

export default Product;