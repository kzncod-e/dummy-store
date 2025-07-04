"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      carts: [],
      products: [],
      categories: [],
      setCategories: (newCategories) => set({ categories: newCategories }),
      setProducts: (newProducts) => set({ products: newProducts }),
      setCarts: (newCarts) => set({ carts: newCarts }),
      addProduct: (product) =>
        set((state) => {
          const maxId =
            state.products.length > 0
              ? Math.max(...state.products.map((p) => p.id))
              : 0;
          const newProduct = { ...product, id: maxId + 1 };
          return { products: [...state.products, newProduct] };
        }),
      editProduct: (id, updated) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "my-global-store", // nama key di localStorage
    }
  )
);

export default useStore;
