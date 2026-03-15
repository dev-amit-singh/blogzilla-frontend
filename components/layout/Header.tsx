"use client";

import Link from "next/link";
import MegaMenu from "@/components/layout/MegaMenu";
import MobileSidebar from "@/components/layout/Sidebar";
import { Search, Menu, ArrowUp, CloudSun } from "lucide-react";
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Home,
  MapPin,
  BookOpen,
  Utensils,
  Hotel,
  Star,
  HeartPulse,
  Sparkles,
  PenLine,
} from "lucide-react";
import ThemeSwitch from "../themeSwitch/ThemeSwitch";

const Header = () => {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
  const onScroll = () => {
    setShowTop(window.scrollY > 300);
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Travel", href: "#", icon: MapPin },
    { label: "Guides", href: "#", icon: BookOpen },
    { label: "Food", href: "#", icon: Utensils },
    { label: "Hotels", href: "#", icon: Hotel },
    { label: "Review", href: "#", icon: Star },
  ];

  return (
    <>
      {/* ================= MOBILE + TABLET HEADER ================= */}
      <header className="w-full sticky top-0 z-50 lg:static bg-[color:var(--bg-page)]">
        <div className="border-b border-[color:var(--border-color)]">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <Image
                src="/blog-logo.png"
                alt="Blogzilla Logo"
                width={300}
                height={60}
                priority
                className="w-[160px] md:w-[200px] lg:w-[220px] h-auto"
              />
            </Link>
            

            {/* DESKTOP RIGHT CONTENT */}
            <ThemeSwitch />
            <div className="hidden md:flex items-center gap-6 text-sm text-[color:var(--text-subtitle)]">
              

              {/* DESKTOP SEARCH */}
              <div className="relative">
                {!searchOpen ? (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center gap-1 hover:text-[color:var(--text-title)] transition"
                  >
                    <Search size={14} />
                    <span>Search</span>
                  </button>
                ) : (
                  <div className="flex items-center rounded-md overflow-hidden bg-[color:var(--bg-card)] border border-[color:var(--border-color)]">
                    <div className="px-2 text-[color:var(--text-muted)]">
                      <Search size={14} />
                    </div>

                    <input
                      type="text"
                      placeholder="Search blogs..."
                      autoFocus
                      className="w-40 px-1 text-sm outline-none bg-transparent text-[color:var(--text-title)] placeholder:text-[color:var(--text-muted)]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch((e.target as HTMLInputElement).value);
                          setSearchOpen(false);
                        }
                      }}
                    />

                    <button
                      onClick={(e) => {
                        const input =
                          (e.currentTarget.previousSibling as HTMLInputElement);
                        handleSearch(input.value);
                        setSearchOpen(false);
                      }}
                      className="px-3 py-1 text-sm btn-color"
                    >
                      Search
                    </button>
                  </div>
                )}
              </div>

              <button className="px-4 py-2 rounded-md text-sm btn-color">
                Buy Now
              </button>
            </div>

            {/* MOBILE ICONS */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-2 rounded-md hover:bg-[color:var(--bg-section)] transition"
              >
                <Search size={20} />
              </button>

              <button onClick={() => setOpen(true)} className="p-2">
                <Menu />
              </button>
            </div>
          </div>
        </div>

        {/* ================= MOBILE SEARCH BAR ================= */}
        {searchOpen && (
          <div className="md:hidden w-full bg-[color:var(--bg-page)] px-2 py-2">
            <div className="flex items-center gap-2 bg-[color:var(--bg-card)] border border-[color:var(--border-color)] rounded-md px-3 py-2 shadow-[var(--shadow-card)]">
              <div className="flex items-center w-full">
                <div className="px-2 text-[color:var(--text-muted)]">
                  <Search size={16} />
                </div>

                <input
                  type="text"
                  placeholder="Search blogs..."
                  autoFocus
                  className="flex-1 px-1 text-sm outline-none bg-transparent text-[color:var(--text-title)] placeholder:text-[color:var(--text-muted)]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch((e.target as HTMLInputElement).value);
                      setSearchOpen(false);
                    }
                  }}
                />

                <button
                  onClick={(e) => {
                    const input =
                      (e.currentTarget.previousSibling as HTMLInputElement);
                    handleSearch(input.value);
                    setSearchOpen(false);
                  }}
                  className="px-4 py-2 text-sm btn-color rounded-md"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ================= DESKTOP STICKY NAV ================= */}
      <div className="hidden lg:block sticky top-0 z-40 bg-[color:var(--bg-page)] border-b border-[color:var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <nav className="flex items-center gap-6 text-sm font-medium text-[color:var(--text-subtitle)] h-14">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1.5 hover:text-[color:var(--primary)] transition"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
            <MegaMenu />
            <Link href={'/news'} className="flex items-center gap-1.5 hover:text-[color:var(--primary)] transition"><Sparkles size={16}/> News</Link>
            <Link href={'/blogs'} className="flex items-center gap-1.5 hover:text-[color:var(--primary)] transition"><PenLine size={16}/> Blogs</Link>
            <Link href={'/weather'} className="flex items-center gap-1.5 hover:text-[color:var(--primary)] transition"><CloudSun  size={16}/> Weather</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Icon bg="bg-blue-600">
              <FaFacebookF size={14} />
            </Icon>
            <Icon bg="bg-sky-500">
              <FaTwitter size={14} />
            </Icon>
            <Icon bg="bg-red-500">
              <FaPinterestP size={14} />
            </Icon>
          </div>
        </div>
      </div>

      <MobileSidebar open={open} onClose={() => setOpen(false)} />
        {showTop && (
  <button
    onClick={() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    className="
    w-10 h-10 rounded-full
      fixed bottom-6 right-6 z-50
      bg-[color:var(--primary)]
      text-white
      shadow-lg
      hover:scale-110
      hover:bg-[color:var(--primary-hover)]
      transition-all duration-200
      flex items-center justify-center
    "
    aria-label="Go to top"
  >
    <ArrowUp size={20} />
  </button>
)}
    </>
  );
};

export default Header;

function Icon({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg: string;
}) {
  return (
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${bg}`}
    >
      {children}
    </div>
  );
}
