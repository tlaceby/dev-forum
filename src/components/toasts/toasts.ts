import { writable } from "svelte/store";

export type ToastKind = "primary" | "success" | "error" | "dark";

interface Toast {
  id: string;
  message: string;
  kind: ToastKind;
}

const TOAST_DURATION = 5000;

export const TOAST_STORE = writable<Toast[]>([]);

export default function make_toast(kind: ToastKind, message: string) {
  const id = crypto.randomUUID();
  const t = { message, kind, id } as Toast;
  TOAST_STORE.update((toasts) => [...toasts, t]);

  setTimeout(() => clearToast(id), TOAST_DURATION);
}

export function toast_success(message: string) {
  make_toast("success", message);
}

export function toast_error(message: string) {
  make_toast("error", message);
}

export function toast_primary(message: string) {
  make_toast("primary", message);
}

export function toast(message: string) {
  make_toast("dark", message);
}

export function clearToast(id: string) {
  TOAST_STORE.update((toasts) => {
    const updated = [] as Toast[];

    for (const toast of toasts) {
      if (toast.id !== id) {
        updated.push(toast);
      }
    }

    return updated;
  });
}

export function clearAllToasts() {
  TOAST_STORE.set([]);
}
