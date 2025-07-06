"use client";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Search, Plus, Edit, Trash2, Star } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useStore from "@/state";
import AddProductModal from "@/components/ui/modalAddForm";
import Loader from "@/components/ui/loader";
import { tree } from "next/dist/build/templates/app-page";

export default function Products() {
  const { products, categories, addProduct, deleteProduct, editProduct } =
    useStore();

  const [showAddModal, setShowAddModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingProduct, setEditingProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const handleAddProduct = (productData: {
    title: string;
    description: string;
    price: number;
    stock: number;
    brand: string;
    category: string;
  }) => {
    addProduct(productData);
    toast.message("Product has been created", {
      description: "New Product has been created successfully",
    });
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditForm({
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleUpdateProduct = () => {
    // Here you would typically update the product in your database
    editProduct(editingProduct.id, editForm);

    console.log("Updating product:", editingProduct.id, editForm);
    setEditingProduct(null);
    console.log(products);

    setEditForm({
      title: "",
      description: "",
      price: 0,
      stock: 0,
    });
    toast.message("Prouct has been updated", {
      description: "product updated successfully  ",
    });
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setEditForm({
      title: "",
      description: "",
      price: 0,
      stock: 0,
    });
  };

  const handleDeleteProduct = (id: number) => {
    // Here you would typically delete the product from your database
    deleteProduct(id);
    toast.message("Product has been deleted", {
      description: "Product deleted successfully  ",
    });
  };

  return (
    <div className="min-h-screen relative bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button
          className="bg-gray-800 hover:bg-gray-900 text-white"
          onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
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
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.length > 0 &&
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src={
                      product.images?.[0]
                        ? product.images[0]
                        : "https://m.media-amazon.com/images/M/MV5BMGVhZTI3NzAtZTNhNy00ZmFhLTgwNTYtYjE0OGQzMzczZjUxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {renderStars(product?.rating)}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {product.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
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
      <Dialog open={!!editingProduct} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Product
            </DialogTitle>
            <p className="text-gray-600 text-sm">Update product information</p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="w-full min-h-[100px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-sm font-medium">
                  Stock
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={editForm.stock}
                  onChange={(e) =>
                    setEditForm({ ...editForm, stock: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleUpdateProduct}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6">
              Update Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <AddProductModal
        categories={categories}
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
