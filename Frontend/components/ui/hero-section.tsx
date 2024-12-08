"use client";

import { Code2 } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-20 text-center">
      <div className="flex items-center space-x-2">
        <Code2 className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold">CodeMaster</h1>
      </div>
      <h2 className="max-w-2xl text-3xl font-bold tracking-tight">
        Master Your Coding Skills with Real-World Challenges
      </h2>
      <p className="max-w-xl text-lg text-muted-foreground">
        Join millions of developers who are sharpening their skills and preparing
        for technical interviews with CodeMaster.
      </p>
      <div className="flex space-x-4">
        <Button size="lg" asChild>
          <Link href="/user">Sign Up</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/admin">Admin Login</Link>
        </Button>
      </div>
    </div>
  );
}