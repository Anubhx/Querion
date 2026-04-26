import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { NavProvider } from "@/lib/NavContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden bg-app-bg text-text-main">
      <NavProvider>
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 shrink overflow-hidden">
          <Topbar />
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
            {children}
          </div>
        </main>
      </NavProvider>
    </div>
  );
}
