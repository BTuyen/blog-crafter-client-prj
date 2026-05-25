"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import { Toaster } from "sonner";

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.includes("/auth");

  return (
    <>
      <Toaster />
      {!isAuthRoute && <Header />}
      <div className={`${!isAuthRoute ? "mt-16" : ""}`}>{children}</div>
    </>
  );
}
