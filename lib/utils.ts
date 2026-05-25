import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractIdFromSlug(slug: string): string | null {
  const parts = slug.split("-");
  const id = parts[parts.length - 1];

  return /^\d+$/.test(id) ? id : null;
}
