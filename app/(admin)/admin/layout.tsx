"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useProfile } from "./context/ProfileContext"; // ✅ ProfileContext use करें

import SidebarWrapper from "./sidebar-wrapper";
import { AdminSidebar } from "./components/Layouts/sidebar";
import { AdminHeader } from "./components/Layouts/header";
import { ProfileProvider } from "./context/ProfileContext";

// ✅ Separate component for authenticated content
function AuthenticatedContent({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarWrapper>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          <AdminHeader />
          <main className="bg-gray-50 flex-1">{children}</main>
        </div>
      </div>
    </SidebarWrapper>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // ✅ Login page → no sidebar/header, no ProfileProvider needed
  if (isLoginPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  // ✅ Protected pages → ProfileProvider के साथ
  return (
    <ProfileProvider>
      <AuthenticatedContent>{children}</AuthenticatedContent>
    </ProfileProvider>
  );
}