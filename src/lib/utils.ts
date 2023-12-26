import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openDeleteModal = (id: string) => {};
export const openRenameModal = (id: string, fileName: string) => {};
