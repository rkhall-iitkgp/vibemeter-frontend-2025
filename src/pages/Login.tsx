"use client";

import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, login } from "../store";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface LoginPageProps {
  backgroundImage?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({
  backgroundImage = "/2random.png?height=800&width=600",
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ id: 1, name: "John Doe", email }));
    navigate("/vibemeter");
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Image */}
      <div className="relative hidden md:block md:w-7/11">
        <img
          src={backgroundImage}
          alt="Login Background"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <span className="text-6xl font-semibold">D</span>
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#8BC34A]"></span>
          </div>

          {/* Login Form */}
          <Card className="border-none shadow-none">
            <CardHeader className="space-y-1 p-0">
              <CardTitle className="text-4xl font-semibold">Login</CardTitle>
              <CardDescription>Enter your credentials to login</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#8BC34A] hover:bg-[#7CB342]"
                >
                  Log In
                </Button>
              </form>

              <div className="mt-6 text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-600 hover:text-[#8BC34A]"
                >
                  Forgot your password?
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
