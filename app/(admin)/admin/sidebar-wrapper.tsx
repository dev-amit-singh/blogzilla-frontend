"use client";

import { SidebarProvider } from "./components/Layouts/sidebar/sidebar-context";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
