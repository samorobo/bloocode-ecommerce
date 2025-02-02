"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

function Header() {
  const { cart, removeFromCart, totalPrice, cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleCheckout = () => {
    setCartOpen(false); // Close cart modal before navigating
    router.push("/checkout");
  };

  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white dark:bg-gray-900 z-50 shadow">
      <Link href="/">
        <Image
          src="https://i.ibb.co/McdzmYG/logo-removebg-preview-new.png"
          width={70}
          height={70}
          alt="Logo"
        />
      </Link>

      {/* Wrap the cart button and the theme toggle button in a flex container with a gap */}
      <div className="flex items-center gap-12">
        <Button
          variant="outline"
          className="relative flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingBag className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
              {cartCount}
            </span>
          )}
          <span className="hidden text-xs font-semibold text-gray-500 sm:block">
            Cart
          </span>
        </Button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-800" />
          )}
        </button>
      </div>

      {/* Cart Dialog */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
          </DialogHeader>

          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <>
              {/* Cart Items */}
              <div className="max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{item.title} x {item.quantity}</p>
                      <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <p className="text-right font-bold mt-4">Total: ${totalPrice.toFixed(2)}</p>

              {/* Checkout Button */}
              <Button onClick={handleCheckout} className="w-full bg-green-500 hover:bg-green-600 text-white mt-4">
                Proceed to Checkout
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;