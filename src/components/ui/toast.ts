"use client";

import { toast } from "sonner";

export const Toast = {
  info: (message: string) => toast(message),
  success: (message: string) => toast.success(message),
  warning: (message: string) => toast.warning(message),
  error: (message: string) => toast.error(message),
};
