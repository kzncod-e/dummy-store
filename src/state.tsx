"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

export type ShippingInfo = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  email: string;
  phone: string;
};

export type Order = {
  id: string;
  date: string;
  status: "completed";
  totalAmount: number;
  items: OrderItem[];
  shipping: ShippingInfo;
};

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
};

const useStore = create(
  persist(
    (set, get) => ({
      checkoutOrder: {
        id: "",
        date: "",
        status: "completed",
        totalAmount: 0,
        items: [],
        shipping: {
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          province: "",
          postalCode: "",
          email: "",
          phone: "",
        },
      } as Order,
      orders: [],
      carts: [],
      products: [],
      categories: [],
      cartShop: [],

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
      addCart: (cart) =>
        set((state) => {
          const existingProduct = state.cartShop.find(
            (el) => el.id === cart.id
          );

          if (existingProduct) {
            return {
              cartShop: state.cartShop.map((el) =>
                el.id === cart.id ? { ...el, quantity: el.quantity + 1 } : el
              ),
            };
          } else {
            const newCart = { ...cart, quantity: 1 };
            return {
              cartShop: [...state.cartShop, newCart],
            };
          }
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
      editCartQuantity: (id: number, newQuantity: number) =>
        set((state) => {
          if (newQuantity < 1) {
            return state;
          } else {
            return {
              cartShop: state.cartShop.map((c) =>
                c.id === id
                  ? {
                      ...c,
                      quantity: newQuantity,
                      total: c.price * newQuantity,
                    }
                  : c
              ),
            };
          }
        }),
      setCheckoutOrder: (order: Partial<Order>) =>
        set({ checkoutOrder: order }),
      prepareCheckoutOrderFromCart: () =>
        set((state) => {
          const items = state.cartShop.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            thumbnail: item.thumbnail,
          }));

          const totalAmount = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          const newOrder: Order = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            status: "completed",
            totalAmount,
            items,
            shipping: state.checkoutOrder.shipping, // ambil data shipping dari checkoutOrder
          };

          return {
            orders: [...state.orders, newOrder],
            cartShop: [],
            checkoutOrder: {
              id: "",
              date: "",
              status: "pending",
              totalAmount: 0,
              items: [],
              shipping: {
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                province: "",
                postalCode: "",
                email: "",
                phone: "",
              },
            },
          };
        }),

      updateCheckoutForm: (field: keyof ShippingInfo, value: string) =>
        set((state) => {
          if (!state.checkoutOrder) return state;
          return {
            checkoutOrder: {
              ...state.checkoutOrder,
              shipping: {
                ...state.checkoutOrder.shipping,
                [field]: value,
              },
            },
          };
        }),

      deleteCart: (id) =>
        set((state) => ({
          cartShop: state.cartShop.filter((c) => c.id !== id),
        })),

      addOrder: (order: Order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),

      getOrderById: (id: string) => {
        const state = get() as OrderStore & { orders: Order[] };
        return state.orders.find((o) => o.id === id);
      },
    }),

    {
      name: "my-global-store", // nama key di localStorage
    }
  )
);

export default useStore;
