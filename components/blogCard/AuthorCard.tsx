'use client'

import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useScrollDirection } from "../scrollAnimation/useScrollDirection";
import { getFadeVariant } from "../scrollAnimation/directionalVariants";

export default function AuthorCard() {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  return (
    <motion.div
      className="
        rounded-xl p-6 text-center
        bg-[color:var(--bg-card)]
        shadow-sm hover:shadow-[var(--shadow-card)]
        transition
      "
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <Image
        src="/avatar.jpg"
        alt="Author"
        width={60}
        height={60}
        className="rounded-full mx-auto mb-4"
        style={{ minHeight: "60px", maxWidth: "60px" }}
      />

      <h3 className="font-semibold text-lg text-[color:var(--text-title)]">
        Hello, I’m Steven
      </h3>

      <p className="mt-2 text-sm text-[color:var(--text-subtitle)]">
        Hi, I’m Steven, a Florida native, who left my career in corporate
        wealth management six years ago to embark on a summer of soul
        searching that would change the course of my life forever.
      </p>

      <div className="mt-4 flex justify-center gap-4 text-[color:var(--text-muted)]">
        <Link
          href="https://instagram.com"
          className="hover:text-[color:var(--primary)] transition"
        >
          <Instagram />
        </Link>
        <Link
          href="https://facebook.com"
          className="hover:text-[color:var(--primary)] transition"
        >
          <Facebook />
        </Link>
        <Link
          href="https://youtube.com"
          className="hover:text-[color:var(--primary)] transition"
        >
          <Youtube />
        </Link>
      </div>
    </motion.div>
  );
}
