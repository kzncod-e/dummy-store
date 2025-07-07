"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { Order } from "@/state";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string | null;
  getOrderById: (id: string | null) => Order | undefined;
}

export default function OrderDetailsModal({
  isOpen,
  onClose,
  orderId,
  getOrderById,
}: OrderDetailsModalProps) {
  const order = getOrderById(orderId ?? null);
  if (!order) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Order Not Found
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  console.log("Order Details:", order);

  const orderData = {
    id: orderId,
    date: "7/7/2025",
    status: "completed",
    total: 87.94,
    items: [
      {
        id: 1,
        name: "Eyeshadow Palette with Mirror",
        quantity: 2,
        unitPrice: 19.99,
        totalPrice: 39.98,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 2,
        name: "Powder Canister",
        quantity: 2,
        unitPrice: 14.99,
        totalPrice: 29.98,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 3,
        name: "Essence Mascara Lash Princess",
        quantity: 1,
        unitPrice: 9.99,
        totalPrice: 9.99,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    shipping: {
      name: "Emily Johnson",
      address: "Jl Dato Tonggara 1",
      city: "Jakarta, Jawa Barat 10115",
      email: "emily.johnson@x.dummyjson.com",
      phone: "082129794729",
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <DialogTitle className="text-xl font-semibold">
              Order #{orderId} Details
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-1">
              Order placed on {new Date(order.date).toLocaleDateString()} at{" "}
              {new Date(order.date).toLocaleTimeString()}
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status and Total */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Status</h3>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                {order.status}
              </Badge>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Total Amount</h3>
              <p className="text-2xl font-bold text-gray-900">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Items Ordered */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {order.shipping.firstName} {order.shipping.lastName}'s Shipping
              Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="font-medium text-gray-900">
                {order.shipping.firstName} {order.shipping.lastName}
              </p>
              <p className="text-gray-700">{order.shipping.address}</p>
              <p className="text-gray-700">{order.shipping.city}</p>
              <div className="pt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  Email: {order.shipping.email}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {order.shipping.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
