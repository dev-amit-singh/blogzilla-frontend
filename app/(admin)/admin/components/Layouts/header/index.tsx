"use client";

import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { UserInfo } from "./user-info";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProfile } from "../../../context/ProfileContext";
import { api } from "../../../context/ProfileContext";

export function AdminHeader() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const router = useRouter();

  const { setIsAuthenticated } = useProfile();

  const handleLogout = async () => {
  const ok = confirm("Are you sure you want to logout?");
  if (!ok) return;

  try {
    await api.post("/logout");
    setIsAuthenticated(false);
    
    router.replace("/admin/login");
    
  } catch (err) {
    console.error("Logout failed", err);
      setIsAuthenticated(false);
      router.replace("/admin/login");
  }
};



  return (
    <header className="sticky top-0 z-30 px-4 py-4 md:px-6">
      {/* Rounded Light Container */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 px-5 py-3 shadow-md">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 hover:bg-slate-100 active:scale-95 transition shadow-sm"
          >
            <MenuIcon />
          </button>

          {/* Logo */}
          {isMobile && (
            <Link href="/">
              <Image
                src="/images/logo/logo-icon.svg"
                width={34}
                height={34}
                alt="Logo"
                className="drop-shadow-sm"
              />
            </Link>
          )}

          {/* Title */}
          <div className="hidden xl:block">
            <h1 className="text-lg font-bold text-slate-800">
              Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Admin Control Panel
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-1 items-center justify-end gap-3">

          {/* Search Box — upgraded */}
          <div className="relative w-full max-w-sm hidden sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              placeholder="Search anything..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
            />
          </div>

          {/* Actions Group */}
          <div className="flex justify-between items-center gap-2 rounded-xl bg-white px-2 py-1 shadow-sm border border-slate-200">
            {/* <Notification /> */}
            <UserInfo />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-2 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 active:scale-95 transition"
            >
              Logout
            </button>
          </div>


        </div>
      </div>
    </header>
  );
}
