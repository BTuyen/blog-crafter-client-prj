"use client";
import { toast } from "sonner";

export const showToast = (type: "success" | "error" | "warning", message: string) => {
  if (type === "success") {
    toast.success(message, { richColors: true });
  } else if (type === "warning") {
    toast.warning(message, { richColors: true });
  } else {
    toast.error(message, { richColors: true });
  }
};
