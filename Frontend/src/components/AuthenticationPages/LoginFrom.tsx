import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { z } from "zod";
import { cn } from "@/lib/utils";
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,15}$/;
const LoginFrom = () => {
  const { toast } = useToast();
  const [showp, setShowp] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const formSchema = z.object({
    username: z.string().min(1, { message: "Enter the email or username" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" })
      .max(15, { message: "Password must be at most 15 characte  rs" })
      .regex(passwordRegex, {
        message: "Invalid password",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setValid(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        values,
        {
          withCredentials: true,
        }
      );
      console.log("Login Sucessfull:", response.data);
      toast({
        title: "Login Successfull",
        description: "You will be redirected to Landing page",
      });
      navigate("/");
      return;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status == 404) {
          if (error.response.data == "NO USER FOUND") {
            form.setError("username", {
              type: "manual",
              message: "No user found",
            });
          } else if (error.response.data == "WRONG PASSWORD") {
            form.setError("password", {
              type: "manual",
              message: "Wrong password",
            });
          }
        }
        setValid(false);
      } else {
        console.error("Unexpected error:", error);
      }
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="username">
                  Email or Username
                </Label>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                    id="username"
                    placeholder="johndoe"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="password">
                  Password
                </Label>

                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Input
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                      id="password"
                      required
                      type={showp ? "text" : "password"}
                      {...field}
                    />
                    <FaEye
                      className={cn(
                        "w-5 h-5",
                        !showp ? "text-black" : "text-blue-600"
                      )}
                      onClick={() => setShowp(!showp)}
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex-col items-center flex justify-center">
            <Button disabled={valid} type="submit" className="w-full">
              Submit
            </Button>
            <div className="w-full text-sm text-right mt-2">
              Not hav an account?{" "}
              <a className="text-blue-600 italic" href="/register">
                {" "}
                Register
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginFrom;
