"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { CloudSun, X } from "lucide-react";
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
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

const sidebarVariants: Variants = {
  open: {
    clipPath: "circle(150% at 90% 40px)",
    transition: { type: "spring", stiffness: 20, restDelta: 2 },
  },
  closed: {
    clipPath: "circle(0% at 90% 40px)",
    transition: { delay: 0.2, type: "spring", stiffness: 400, damping: 40 },
  },
};

const listVariants: Variants = {
  open: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 20 },
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  const menuItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Travel", href: "#", icon: MapPin },
    { label: "Guides", href: "#", icon: BookOpen },
    { label: "Food", href: "#", icon: Utensils },
    { label: "Hotels", href: "#", icon: Hotel },
    { label: "Review", href: "#", icon: Star },
    { label: "Healthy", href: "#", icon: HeartPulse },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SIDEBAR */}
          <motion.aside
            className="fixed inset-0 z-50 bg-[color:var(--bg-page)]"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            {/* HEADER */}
            <div
              className="
                flex items-center justify-between px-6 py-5
                border-b border-[color:var(--border-color)]
              "
            >
              <Link href="/" className="flex items-center" onClick={onClose}>
                <Image
                  src="/blog-logo.png"
                  alt="Blogzilla Logo"
                  width={300}
                  height={60}
                  priority
                  className="w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] h-auto"
                />
              </Link>

              <button
                onClick={onClose}
                className="text-[color:var(--text-title)]"
              >
                <X />
              </button>
            </div>

            {/* CONTENT */}
            <motion.div
              className="flex h-[calc(100%-72px)] flex-col justify-between px-8 py-6"
              variants={listVariants}
            >
              {/* MAIN NAV */}
              <div>
                <p className="mb-4 text-xs uppercase tracking-widest text-[color:var(--text-muted)]">
                  Menu
                </p>

                <ul className="space-y-4 text-lg font-medium text-[color:var(--text-title)]">
                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <motion.li
                        key={item.label}
                        variants={itemVariants}
                        whileHover={{ x: 8 }}
                        className="relative"
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="
                            flex items-center gap-3 rounded-lg px-3 py-2
                            hover:bg-[color:var(--bg-section)]
                            transition
                          "
                        >
                          <Icon
                            size={18}
                            className="text-[color:var(--text-muted)]"
                          />
                          <span>{item.label}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                  
                  {/* 👇 FIXED: Added onClick={onClose} here */}
                  <li>
                    <Link 
                      href={"/blogs"} 
                      onClick={onClose} 
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[color:var(--bg-section)] transition"
                    >
                      <PenLine size={18} className="text-[color:var(--text-muted)]"/>Blogs
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href={"/news"} 
                      onClick={onClose} 
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[color:var(--bg-section)] transition"
                    >
                      <Sparkles size={18} className="text-[color:var(--text-muted)]"/>News
                    </Link>
                  </li>
                  
                  {/* 👇 FIXED: Added onClick={onClose} here */}
                  <li>
                    <Link 
                      href={"/weather"} 
                      onClick={onClose} 
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[color:var(--bg-section)] transition"
                    >
                      <CloudSun size={18} className="text-[color:var(--text-muted)]"/>Weather
                    </Link>
                  </li>
                </ul>
              </div>

              {/* FOOTER */}
              <div>
                <p className="mb-3 text-xs uppercase tracking-widest text-[color:var(--text-muted)]">
                  Follow us
                </p>

                <div className="flex gap-3">
                  <SocialIcon bg="bg-blue-600">
                    <FaFacebookF size={14} />
                  </SocialIcon>
                  <SocialIcon bg="bg-sky-500">
                    <FaTwitter size={14} />
                  </SocialIcon>
                  <SocialIcon bg="bg-red-500">
                    <FaPinterestP size={14} />
                  </SocialIcon>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SocialIcon({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg: string;
}) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${bg}`}
    >
      {children}
    </div>
  );
}