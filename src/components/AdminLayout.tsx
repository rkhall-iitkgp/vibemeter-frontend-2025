import { connectWebSocket } from "@/store/actions/webSocketActions";
import { AppDispatch, fetchHighRiskEmployees } from "@/store";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Sidebar from "./Admin/sidenav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(connectWebSocket("admin"));
    dispatch(fetchHighRiskEmployees());
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - fixed on desktop, toggleable on mobile */}
      <div className="fixed inset-y-0 left-0 z-50 md:relative md:flex">
        <Sidebar />
      </div>

      {/* Main content area */}
      {children}
    </div>
  );
}
