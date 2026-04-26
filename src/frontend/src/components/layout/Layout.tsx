import { useState } from "react";
import { Toaster } from "sonner";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-4 lg:p-6 max-w-screen-2xl mx-auto">{children}</div>
        </main>
      </div>

      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "bg-card border-border text-foreground font-body",
            success: "border-accent/30",
            error: "border-destructive/30",
          },
        }}
      />
    </div>
  );
}
