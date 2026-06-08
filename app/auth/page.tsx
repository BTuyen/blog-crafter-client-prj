"use client";

import { Suspense } from "react";
import AuthForm from "@/app/auth/AuthForm";
import { useSearchParams } from "next/navigation";

function AuthContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "register" ? "register" : "login";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthForm mode={mode} />
    </div>
  );
}

export default function AuthPage() {
  // useSearchParams() phải nằm trong Suspense boundary, nếu không
  // Next.js fail khi prerender trang tĩnh.
  return (
    <Suspense fallback={null}>
      <AuthContent />
    </Suspense>
  );
}
