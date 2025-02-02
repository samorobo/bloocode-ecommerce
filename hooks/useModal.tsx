"use client"
// hooks/useModal.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Product from "@/components/Product";

function useModal() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();

      setProduct(product);

      setLoading(false);
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // const handleAddToCart = () => {
  //   if (addToCart && product) {
  //     addToCart(product);
  //   }
  // };

  return {
    loading,
    isOpen,
    product,
    closeModal: () => {
      setIsOpen(false);
      router.back();
    },
  };
}

export default useModal;
