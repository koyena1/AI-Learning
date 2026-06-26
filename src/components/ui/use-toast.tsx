"use client";

import * as React from "react";

type ToastVariant = "default" | "destructive";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
};

type ToastArgs = Omit<Toast, "id">;

type ToastContextValue = {
  toast: (args: ToastArgs) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((args: ToastArgs) => {
    const id = Math.random().toString(16).slice(2);
    setToasts((t) => [{ id, ...args }, ...t].slice(0, 3));
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[320px] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              t.variant === "destructive"
                ? "rounded-md border border-red-600 bg-red-600/10 p-3 text-red-700"
                : "rounded-md border bg-background p-3"
            }
          >
            {t.title && <div className="text-sm font-semibold">{t.title}</div>}
            {t.description && <div className="mt-1 text-sm opacity-80">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function Toaster() {
  return (
    <ToastProvider>
      <span />
    </ToastProvider>
  );
}


export function toast(args: ToastArgs) {
  // Fallback for environments where provider isn't mounted.
  // This will be replaced by the actual context when used within app.
  if (typeof window === "undefined") return;
  console.log("toast:", args);
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  return {
    toast: (args: ToastArgs) => ctx?.toast(args),
  };
}

// Provide a named export consistent with shadcn usage.
// keep single named export


