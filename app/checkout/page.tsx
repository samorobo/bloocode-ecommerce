"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import OrderSuccess from "@/components/OrderSuccess";
import { useTheme } from "@/context/ThemeContext";

// Define form validation schema
const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().regex(/^\d{10,15}$/, "Phone must be between 10-15 digits"),
  email: z.string().email("Invalid email address"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const [orderId, setOrderId] = useState("");

  const { theme } = useTheme();

  const SHIPPING_FEE = 10; // ✅ Fixed shipping fee of $10
  const subTotal = totalPrice;
  const finalTotal = subTotal + SHIPPING_FEE;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleProceedToConfirm = (data: CheckoutFormData) => {
    setFormData(data);
    setConfirmOpen(true);
  };

  const handleConfirmCheckout = () => {
    if (formData) {
      setOrderPlaced(true);
      clearCart();
      setConfirmOpen(false);
      setOrderId(`ORD-${Math.floor(Math.random() * 1000000)}`);
    }
  };

  if (orderPlaced && formData) {
    return (
      <OrderSuccess
        orderId={orderId}
        formData={formData}
        subTotal={subTotal}
        shippingFee={SHIPPING_FEE}
        totalPrice={finalTotal}
      />
    );
  }

  return (
    <main className={`p-10 mt-20 max-w-2xl mx-auto ${theme === "dark" ? "text-white" : "text-black"}`}>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Items */}
      <div className={`border p-4 rounded-md shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-xl font-semibold mb-3">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-2 border-b">
                <span>{item.title} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        {/* ✅ Display Subtotal, Shipping Fee, and Total */}
        <div className="mt-4 space-y-2 text-right font-semibold">
          <p>Subtotal: ${subTotal.toFixed(2)}</p>
          <p>Shipping Fee: ${SHIPPING_FEE.toFixed(2)}</p>
          <p className="text-lg font-bold">Total: ${finalTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit(handleProceedToConfirm)}
        className={`mt-6 space-y-4 p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-xl font-semibold">Shipping Details</h2>

        <div>
          <label className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Full Name
          </label>
          <input type="text" {...register("name")} className="w-full border p-2 rounded mt-1" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Address
          </label>
          <input type="text" {...register("address")} className="w-full border p-2 rounded mt-1" />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div>
          <label className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Phone Number
          </label>
          <input type="text" {...register("phone")} className="w-full border p-2 rounded mt-1" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Email
          </label>
          <input type="email" {...register("email")} className="w-full border p-2 rounded mt-1" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
          Proceed to Confirm
        </button>
      </form>

      {/* ✅ Confirmation Modal */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to place this order?</p>
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmCheckout} className="bg-green-500 text-white">
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}