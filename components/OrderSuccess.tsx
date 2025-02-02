"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  orderId: string;
  formData: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  totalPrice: number;
};

export default function OrderSuccess({ orderId, formData, totalPrice }: Props) {
  const router = useRouter();

  // Redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl mx-auto mt-20">
      <p className="text-base font-medium text-green-600">Thank you!</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Your order is on the way!
      </h1>
      <p className="mt-2 text-base text-gray-500">
        We've received your order and are now processing it.
      </p>

      <div className="mt-6 text-sm font-medium">
        <p className="text-gray-900">Order number</p>
        <p className="mt-2 text-gray-500">{orderId}</p>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6">
        <h4 className="font-semibold text-gray-900">Billing Address</h4>
        <p className="mt-2 text-sm text-gray-700">
          {formData.name}
          <br />
          {formData.address}
          <br />
          Phone: {formData.phone}
          <br />
          Email: {formData.email}
        </p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6 text-sm">
        <div className="flex justify-between">
          <p className="font-medium text-gray-900">Subtotal</p>
          <p className="text-gray-700">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-900">Shipping</p>
          <p className="text-gray-700">$0.00</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-900">Total</p>
          <p className="text-gray-700">${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <p className="mt-6 text-gray-500 text-sm">
        Redirecting to homepage in 5 seconds...
      </p>
    </div>
  );
}
