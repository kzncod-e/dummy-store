import {
  ShoppingBag,
  ShoppingCart,
  Package,
  ChartColumn,
  History,
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
    url: "#",
    icon: ShoppingBag,
  },
  {
    title: "Cart",
    url: "#",
    icon: ShoppingCart,
  },
  {
    title: "Orders",
    url: "#",
    icon: History,
  },
];

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
        <h1>
          {firstName} {lastName}
        </h1>
      </SidebarFooter>
    </Sidebar>
  );
}
