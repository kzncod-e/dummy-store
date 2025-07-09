"use client";
import Cookies from "js-cookie";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { Package, Users, ShoppingCart, TrendingUp, Menu } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/ui/loader";
import useStore from "@/state";

// Define the expected shape of your store
type StoreType = {
  carts: any[];
  setCarts: (carts: any[]) => void;
  products: any[];
  setProducts: (products: any[]) => void;
  categories: any[];
  setCategories: (categories: any[]) => void;
};

// Use the correct type for destructuring
const barData = [
  { name: "beauty", value: 5 },
  { name: "fragrances", value: 5 },
  { name: "furniture", value: 5 },
];

const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];
const chartColors = {
  bar: "#8884d8",
  barGrid: "#303030",
  pieFill: "#4A90e2",
  text: "#fffff",
};

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const { carts, setCarts, products, setProducts, setCategories, categories } =
    useStore() as StoreType;
  const [totalCarts, setTotalCarts] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersRes, productsRes, cartsRes, categoriesRes] =
          await Promise.all([
            axios.get("https://dummyjson.com/users"),
            axios.get("https://dummyjson.com/products"),
            axios.get("https://dummyjson.com/carts"),
            axios.get("https://dummyjson.com/products/categories"),
          ]);

        if (usersRes.status === 200) {
          setUsers(usersRes.data.users);
          setTotalUsers(usersRes.data.total);
          console.log("Users fetched successfully:", usersRes.data);
        }

        if (productsRes.status === 200) {
          setProducts(productsRes.data.products);
          setTotalProducts(productsRes.data.total);
          console.log("Products fetched successfully:", productsRes.data);
        }

        if (cartsRes.status === 200) {
          setCarts(cartsRes.data.carts);
          setTotalCarts(cartsRes.data.total);
          console.log("Carts fetched successfully:", cartsRes.data);
        }

        if (categoriesRes.status === 200) {
          setCategories(categoriesRes.data);
          console.log("Categories fetched successfully:", categoriesRes.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const productCount = products.reduce((acc, product) => {
    const { category } = product;
    if (acc[category]) {
      acc[category] += 1;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});
  const productDistribution = Object.keys(productCount).map((key) => ({
    name: key,
    count: productCount[key],
  }));
  console.log(productDistribution);
  const totalRevenue = carts.reduce(
    (sum, order) => sum + order.discountedTotal,
    0
  );
  const formattedRevenue = Number(totalRevenue.toFixed(2));
  if (loading === true) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6  w-full  ">
        <Loader />
      </div>
    );
  }
  return (
    <div className="min-h-screen mx-auto px-6  w-full ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-600">Overview of your e-commerce metrics</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {totalProducts ?? totalProducts}
            </div>
            <p className="text-xs text-gray-600 mt-1">Available in store</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {totalUsers ?? totalUsers}
            </div>
            <p className="text-xs text-gray-600 mt-1">Registered customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Active Carts
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {totalCarts ?? totalCarts}
            </div>
            <p className="text-xs text-gray-600 mt-1">Items in carts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Total Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${formattedRevenue ?? formattedRevenue}
            </div>
            <p className="text-xs text-gray-600 mt-1">From all carts</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Products by Category
            </CardTitle>
            <CardDescription className="text-gray-600">
              Distribution of products across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productDistribution}>
                  <CartesianGrid
                    strokeDasharray={"3 3"}
                    stroke={chartColors.barGrid}
                  />
                  <XAxis dataKey={"name"} stroke={chartColors.text} />
                  <YAxis stroke={chartColors.text} />
                  <Tooltip
                    contentStyle={{
                      width: "min-content",
                      height: "min-content",
                    }}
                  />

                  <Bar dataKey="count" fill={chartColors.bar} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Category Distribution
            </CardTitle>
            <CardDescription className="text-gray-600">
              Pie chart view of product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className=" flex items-center justify-center">
              <div className="relative">
                <ResponsiveContainer width={400} height={400}>
                  <PieChart>
                    <Pie
                      data={productDistribution}
                      cx="50%"
                      cy="50%"
                      label={({ name, percent = 0 }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count">
                      {barData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const current = payload[0];
                          return (
                            <div>
                              <p>
                                {current.name}: {current.value}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
