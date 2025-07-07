"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { toast } from "sonner";
import useStore, { Order, ShippingInfo } from "@/state";
import { useRouter } from "next/navigation";

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

export default function CheckoutPage() {
  const {
    cartShop,
    updateCheckoutForm,
    checkoutOrder,
    prepareCheckoutOrderFromCart,
  } = useStore() as {
    cartShop: CartItem[];
    updateCheckoutForm: (field: string, value: string) => void;
    checkoutOrder: Order;
    // Add other properties of checkoutOrder if needed

    prepareCheckoutOrderFromCart: () => void;
  };
  const router = useRouter();
  const subtotal = cartShop.reduce((sum, item) => sum + item.total, 0);
  const shipping: number = 0;
  const tax = 7.99;
  const total = subtotal + tax + shipping;
  const handleCheckout = () => {
    prepareCheckoutOrderFromCart();
    router.push("/dashboard/order"); // redirect ke /orders
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-1">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={checkoutOrder.shipping.firstName}
                      onChange={(e) =>
                        updateCheckoutForm("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={checkoutOrder.shipping.lastName}
                      onChange={(e) =>
                        updateCheckoutForm("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      required
                      id="email"
                      type="email"
                      value={checkoutOrder.shipping.email}
                      onChange={(e) =>
                        updateCheckoutForm("email", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      required
                      id="phone"
                      type="tel"
                      value={checkoutOrder.shipping.phone}
                      onChange={(e) =>
                        updateCheckoutForm("phone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    required
                    id="address"
                    value={checkoutOrder.shipping.address}
                    onChange={(e) =>
                      updateCheckoutForm("address", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      required
                      id="city"
                      value={checkoutOrder.shipping.city}
                      onChange={(e) =>
                        updateCheckoutForm("city", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      required
                      id="state"
                      value={checkoutOrder.shipping.province}
                      onChange={(e) =>
                        updateCheckoutForm("province", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      required
                      id="zipCode"
                      value={checkoutOrder.shipping.postalCode}
                      onChange={(e) =>
                        updateCheckoutForm("postalCode", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    required
                    id="cardholderName"
                    // value={checkoutForm.cardholderName}
                    onChange={(e) =>
                      updateCheckoutForm("cardholderName", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    required
                    id="cardNumber"
                    // value={checkoutForm.cardNumber}
                    onChange={(e) =>
                      updateCheckoutForm("cardNumber", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      required
                      id="expiryDate"
                      placeholder="MM/YY"
                      //   value={checkoutForm.expiryDate}
                      onChange={(e) =>
                        updateCheckoutForm("expiryDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      required
                      id="cvv"
                      placeholder="123"
                      //   value={checkoutForm.cvv}
                      onChange={(e) =>
                        updateCheckoutForm("cvv", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-4">
                  {cartShop &&
                    cartShop.length > 0 &&
                    cartShop.map((item: CartItem) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Complete Order Button */}
                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 mt-6"
                  onClick={handleCheckout}>
                  Complete Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
