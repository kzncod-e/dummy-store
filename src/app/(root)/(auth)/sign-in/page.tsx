"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Cookies from "js-cookie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      if (res.status === 200) {
        Cookies.set("token", res.data.accessToken, { expires: 7 });
        Cookies.set("firstName", res.data.firstName, { expires: 7 });
        Cookies.set("lastName", res.data.lastName, { expires: 7 });
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access the e-commerce dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
              disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <div className="font-medium text-blue-800 mb-1">
              Demo Credentials:
            </div>
            <div className="text-blue-700">Username: emilys</div>
            <div className="text-blue-700">Password: emilyspass</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
