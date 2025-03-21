"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { watch } from "fs";

// Form validation schema
const formSchema = z
  .object({
    employeeId: z.string().min(1, { message: "Employee ID is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });



  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      // Handle successful signup here
    }, 1000);
  }
  
  const userRegister=async(employee_id:string, email:string, password:string)=>{
    const user={employee_id,email,password}
    try {
      const response = await axios.post('http://ec2-65-2-151-235.ap-south-1.compute.amazonaws.com/api/auth/register', user);
      if (response.data.code === 200) {
        toast.success(response.data.message);
       }
    else {
      toast.error(response.data.message)
  }
  }
  catch(err){
    toast.error("error")
    console.log(err)
  }
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Image */}
      <div className="relative hidden md:block md:w-7/11">
        <img
          src="/2random.png?height=800&width=600"
          alt="Interior design with bookshelves"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side - Sign Up Form */}
      <div className="flex w-full flex-col justify-center px-6 md:w-1/2 md:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="mb-6">
            <div className="flex items-center">
              <h1 className="text-6xl font-semibold">D</h1>
              <span className="ml-0.5 h-2 w-2 rounded-full bg-green-500"></span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="mb-2 text-4xl font-semibold">Register</h2>
            <p className="text-muted-foreground">
              Enter your information to register
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
          <form
    onSubmit={form.handleSubmit((data) => {
      onSubmit(data); 
      userRegister(data.employeeId, data.email, data.password); 
    })}
    className="space-y-6"
  >
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Employee ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm your Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#8BC34A] py-6 text-white hover:bg-[#7CB342]"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
