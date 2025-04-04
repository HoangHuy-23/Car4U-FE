"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

type Props = {};

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});
function LoginPage({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isAuthenticated, isLoading, login, loginWithGoogle } = useAuthStore();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await login({ email: data.email, password: data.password });
      toast.success("Successful registration!");
    } catch (error) {
      toast.error("Register for failure");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Login
          </h1>
          <p className="mt-2 text-sm text-foreground">
            Enter your email and password to access your account.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-8 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 gap-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Processing..." : "Login"}
            </Button>

            {/* Social Login Section */}
            <div className="space-y-4">
              <Separator className="my-6" />
              <div className="flex flex-col space-y-3">
                <Button
                  type="button"
                  onClick={loginWithGoogle}
                  variant="outline"
                  className="w-full gap-2"
                  disabled={isLoading}
                >
                  <FcGoogle className="w-5 h-5" />
                  <span>Continue with Google</span>
                </Button>

                <Button
                  type="button"
                  // onClick={loginWithFacebook}
                  variant="outline"
                  className="w-full gap-2"
                  disabled={isLoading}
                >
                  <FaFacebook className="w-5 h-5 text-blue-600" />
                  <span>Continue with Facebook</span>
                </Button>
              </div>
            </div>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Register now
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
