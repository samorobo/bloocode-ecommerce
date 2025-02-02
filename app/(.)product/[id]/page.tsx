"use client";

import ProductImage from "@/components/ProductImage";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react"; // Replace HeroIcons with lucide-react
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Modal() {
  let [isOpen, setIsOpen] = useState(true);
  const id = useParams().id;
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();

      setProduct(product);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()} // Prevent auto-focus
        className="max-w-3xl rounded-lg p-6 bg-white"
      >
        <DialogHeader>
          <DialogTitle>{product?.title}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
        ) : (
          <div className="flex gap-x-8 h-96">
            {product?.image && (
              <div className="relative w-72 h-full hidden md:inline">
                <ProductImage product={product} fill />
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <p className="font-medium text-sm">${product?.price}</p>

                <div className="flex items-center text-sm my-4">
                  <p>{product?.rating.rate}</p>
                  {product?.rating.rate && (
                    <div className="flex items-center ml-2 mr-6">
                      {/* Display filled stars */}
                      {Array.from({ length: Math.floor(product.rating.rate) }, (_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}

                      {/* Display empty stars */}
                      {Array.from({ length: 5 - Math.floor(product.rating.rate) }, (_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                  )}
                  <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                    See all {product?.rating.count} reviews
                  </p>
                </div>

                <p className="line-clamp-5 text-sm">{product?.description}</p>
              </div>

              <div className="space-y-3 text-sm">
                <button className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
                  Add to bag
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
                >
                  View full details
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
