"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="mt-5">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-4">
              <p>{item.title} (x{item.quantity})</p>
              <p>${item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}
          <p className="mt-4 font-bold">Total: ${totalPrice}</p>
          <Link href="/checkout" className="mt-4 bg-green-500 text-white p-3 rounded">
            Proceed to Checkout
          </Link>
        </>
      )}
    </main>
  );
}
