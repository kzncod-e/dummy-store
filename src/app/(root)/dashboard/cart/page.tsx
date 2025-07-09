"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useStore from "@/state";
import Link from "next/link";
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}
export default function CartPage() {
  const { cartShop, deleteCart, editCartQuantity } = useStore() as {
    cartShop: CartItem[];
    deleteCart: (id: number) => void;
    editCartQuantity: (id: number, quantity: number) => void;
  };

  const removeItem = (id: number) => {
    deleteCart(id);
  };

  const subtotal = cartShop.reduce((sum, item) => sum + item.total, 0);
  const tax = 7.99;
  const shipping = 0;
  const total = subtotal + tax + shipping;
  if (!cartShop) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {cartShop.length} items in your cart
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            // onClick={clearCart}
            className="text-gray-600 hover:text-gray-900">
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartShop &&
              cartShop.length > 0 &&
              cartShop.map((item: CartItem) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-lg font-bold text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() =>
                            editCartQuantity(item.id, item.quantity - 1)
                          }>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() =>
                            editCartQuantity(item.id, item.quantity + 1)
                          }>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Total Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${item.total.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {cartShop.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link href="/dashboard/checkout">
                    <Button
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3"
                      disabled={cartShop.length === 0}>
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/dashboard/shop">
                    <Button
                      variant="ghost"
                      className="w-full text-gray-600 hover:text-gray-900">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
