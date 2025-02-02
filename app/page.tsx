"use client";

import { useState, useEffect } from "react";
import Product from "@/components/Product";
import Hero from "@/components/Hero";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-48 py-32">
      <Hero />
      <section className="flex flex-col space-y-6 pb-10">
        <h1 className="text-5xl font-bold text-center">DEALS OF THE DAY</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}