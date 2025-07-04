"use client";

import "../../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookieToken, setCookieToken] = useState("");

  useEffect(() => {
    const firstName = Cookies.get("firstName");
    const lastName = Cookies.get("lastName");
    const token = Cookies.get("token"); // ⬅️ ambil token dari cookie

    if (firstName) setFirstName(firstName);
    if (lastName) setLastName(lastName);
    if (token) {
      setCookieToken(token);
    } else {
      // Jika tidak ada token, redirect ke halaman login
      window.location.href = "/sign-in";
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar firstName={firstName} lastName={lastName} />
      <main className="flex flex-col min-h-screen w-full bg-gray-50">
        <div className="border-b-2 px-6 border-gray-200 flex items-center justify-between py-4 mb-6">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
