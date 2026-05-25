"use client";

import AuthForm from "@/app/auth/AuthForm";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "register" ? "register" : "login";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthForm mode={mode} />
    </div>
  );
}
