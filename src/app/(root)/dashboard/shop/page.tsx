"use client";

import { useState } from "react";
import { Search, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useStore from "@/state";

// Define the shape of your store state
type StoreState = {
  products: any[];
  categories: { name: string }[];
  cartShop: any[];
  addCart: (product: any) => void;
};

import { toast } from "sonner";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Loader from "@/components/ui/loader";

export default function Products() {
  const { products, categories, cartShop, addCart } = useStore() as StoreState;

  console.log("Products:", products);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  const filteredProducts = products
    ? products
        .filter((product) => {
          const matchesSearch =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          const matchesCategory =
            selectedCategory === "all" ||
            product.category.toLowerCase() === selectedCategory.toLowerCase();
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          switch (sortOption) {
            case "name-az":
              return a.title.localeCompare(b.title);
            case "price-low-high":
              return a.price - b.price;
            case "price-high-low":
              return b.price - a.price;
            case "highest-rated":
              return b.rating - a.rating;
            default:
              return 0; // no sorting (default)
          }
        })
    : [];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const handleAddToCart = async (productId: number) => {
    try {
      const res = await axios.post("https://dummyjson.com/carts/add", {
        userId: 1,
        products: [{ id: productId, quantity: 1 }],
      });

      addCart(res.data?.products[0]);
      toast.message("Product has been added to cart", {
        description: "product added successfully",
      });
      if (cartShop.length > 0) {
        console.log("Carts:>>>>>>>>", cartShop);
      }
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Shop</h1>
          <p className="text-gray-600">Browse and purchase products</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-200"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48 bg-white border-gray-200">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(({ name }) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="name-az">Name A-Z</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="highest-rated">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.length > 0 &&
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="w-full max-w-sm mx-auto overflow-hidden">
              <CardContent className="p-4">
                {/* Discount Badge */}
                <div className="relative mb-4">
                  <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs font-medium">
                    {product.discountPercentage &&
                      product.discountPercentage.toFixed(0)}
                    %
                  </Badge>

                  {/* Product Image */}
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={
                        product.images
                          ? product.images[0]
                          : "https://m.media-amazon.com/images/M/MV5BMGVhZTI3NzAtZTNhNy00ZmFhLTgwNTYtYjE0OGQzMzczZjUxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
                      }
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Product Title */}
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {product.title}
                </h3>

                {/* Product Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                </div>

                {/* Rating and Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">
                      {renderStars(product.rating)}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                {/* Stock Status */}
                <div className="flex justify-end mb-4">
                  <span className="text-sm text-gray-600">99 in stock</span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="min-h-screen w-full flex items-center justify-center mx-auto absolute inset-0  ">
          <Loader />
        </div>
      )}
      {filteredProducts.length === 0 && products.length > 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Edit Product Modal */}
    </div>
  );
}
