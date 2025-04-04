import { DashboardContent } from "@/components/dashboard-content";
import { Sidebar } from "@/components/sidebar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <DashboardContent />
      </div>
    </div>
  );
}
