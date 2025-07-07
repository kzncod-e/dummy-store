import {
  ShoppingBag,
  ShoppingCart,
  Package,
  ChartColumn,
  History,
  User,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Menu items.

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: ChartColumn,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Shop",
    url: "/dashboard/shop",
    icon: ShoppingBag,
  },
  {
    title: "Cart",
    url: "/dashboard/cart",
    icon: ShoppingCart,
  },
  {
    title: "Orders",
    url: "/dashboard/order",
    icon: History,
  },
];
const handleLogout = () => {
  Cookies.remove("token");
  Cookies.remove("firstName");
  Cookies.remove("lastName");
  window.location.href = "/sign-in";
};
export function AppSidebar({
  firstName,
  lastName,
}: {
  firstName?: string;
  lastName?: string;
}) {
  return (
    <Sidebar className="p-3">
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <ShoppingBag />
          <h1 className="text-slate-700 font-semibold text-xl">
            DummyJSON Store
          </h1>
        </div>
      </SidebarHeader>
      <SidebarGroupLabel>
        <h3>Navigation</h3>
      </SidebarGroupLabel>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1>
                {firstName} {lastName}
              </h1>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <User />
                <span>Profile</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <div className="flex  items-center gap-2">
                <LogOut />
                <p>Logout</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
