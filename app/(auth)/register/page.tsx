"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase-client";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "https://example.com/welcome",
        },
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        localStorage.setItem("accessToken", data.session.access_token);
        localStorage.setItem("token_type", data.session.token_type);
        localStorage.setItem("expires_in", data.session.expires_in.toString());
        localStorage.setItem(
          "expires_at",
          data.session?.expires_at?.toString() || ""
        );
        localStorage.setItem("refresh_token", data.session.refresh_token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast({
        title: "Success",
        description:
          "Registration successful. Please check your email to verify your account.",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      let errorMessage = "Failed to register. Please try again.";

      if (error.status === 422) {
        errorMessage = "User already exists. Please try logging in.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthRegister = async (provider: string) => {
    setIsLoading(true);

    try {
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider: "google",
      //   options: {
      //     redirectTo:
      //       "https://tmonexoitirozzijyoxa.supabase.co/auth/v1/callback",
      //   },
      // });

      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `https://tmonexoitirozzijyoxa.supabase.co/auth/v1/callback`,
        },
      })
      // if (data) {
      //   localStorage.setItem('accessToken', data.session.access_token)
      //   localStorage.setItem('token_type', data.session.token_type)
      //   localStorage.setItem('expires_in', data.session.expires_in.toString())
      //   localStorage.setItem('expires_at', data.session?.expires_at?.toString() || '')
      //   localStorage.setItem('refresh_token', data.session.refresh_token)
      //   localStorage.setItem('user', JSON.stringify(data.user))
      // }

      toast({
        title: "Redirecting",
        description: `Redirecting to ${provider} for authentication.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to register with ${provider}.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Sign up to get started with Lydiian AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button
              variant="outline"
              onClick={() => handleOAuthRegister("github")}
              disabled={isLoading}
              className="w-full"
            >
              <Github className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <form onSubmit={handleRegister}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
