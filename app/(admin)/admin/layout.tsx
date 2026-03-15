"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import SidebarWrapper from "./sidebar-wrapper";
import { AdminSidebar } from "./components/Layouts/sidebar";
import { AdminHeader } from "./components/Layouts/header";
import { ProfileProvider } from "./context/ProfileContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";
  const [loading, setLoading] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) return; // ✅ skip auth check on login page

    const checkLogin = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/check-auth",
          { credentials: "include" }
        );

        if (!res.ok) {
          router.replace("/admin/login");
        } else {
          setLoading(false);
        }
      } catch {
        router.replace("/admin/login");
      }
    };

    checkLogin();
  }, [router, isLoginPage]);

  // ✅ Login page → no sidebar/header
  if (isLoginPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  // ✅ Protected pages → check auth loading
  if (loading) {
    return <div className="p-10">Checking login...</div>;
  }

  // ✅ Admin layout UI
  return (
    <ProfileProvider>
      <SidebarWrapper>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex flex-1 flex-col">
            <AdminHeader />
            <main className="bg-gray-50 flex-1">{children}</main>
          </div>
        </div>
      </SidebarWrapper>
    </ProfileProvider>
  );
}
