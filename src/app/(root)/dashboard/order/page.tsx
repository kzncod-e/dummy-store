"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Menu, Calendar, DollarSign, Package } from "lucide-react";
import Image from "next/image";

import useStore, { Order } from "@/state";
import { useState } from "react";
import OrderDetailsModal from "@/components/ui/orderDetail";

export default function OrderHistoryPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const { orders, getOrderById } = useStore() as {
    orders: Order[];
    getOrderById: (id: string | null) => Order | undefined;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track and manage your orders
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Card */}
        <div className="flex flex-col gap-2">
          {orders &&
            orders.length > 0 &&
            orders.map((order) => (
              <Card
                key={order.id}
                className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {/* Order Header */}
                      <div className="flex items-center space-x-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.id}
                        </h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-1">
                          {order.status}
                        </Badge>
                      </div>

                      {/* Order Meta Information */}
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{order.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4" />
                          <span>{order.items.length} items</span>
                        </div>
                      </div>

                      {/* Product Images */}
                      <div className="flex items-center space-x-3">
                        {order.items.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="relative h-12 w-12 flex-shrink-0">
                            <Image
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="rounded-md object-cover border border-gray-200"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="flex-shrink-0 ml-6">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setOrderId(order.id);
                          setIsModalOpen(true);
                        }}
                        className="flex items-center space-x-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
      <OrderDetailsModal
        getOrderById={getOrderById}
        orderId={orderId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
