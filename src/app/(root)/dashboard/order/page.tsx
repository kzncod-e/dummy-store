"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Menu, Calendar, DollarSign, Package } from "lucide-react";
import Image from "next/image";
import useStore from "@/state";
export default function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="icon" className="mr-4">
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order History
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Track and manage your orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Card */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {/* Order Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #1751821314014
                  </h3>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-1">
                    completed
                  </Badge>
                </div>

                {/* Order Meta Information */}
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>7/7/2025</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>$87.94</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Package className="h-4 w-4" />
                    <span>3 items</span>
                  </div>
                </div>

                {/* Product Images */}
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Eyeshadow Palette with Mirror"
                      fill
                      className="rounded-md object-cover border border-gray-200"
                    />
                  </div>
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Powder Canister"
                      fill
                      className="rounded-md object-cover border border-gray-200"
                    />
                  </div>
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Essence Mascara Lash Princess"
                      fill
                      className="rounded-md object-cover border border-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <div className="flex-shrink-0 ml-6">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
