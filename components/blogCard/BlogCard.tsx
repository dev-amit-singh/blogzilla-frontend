'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { getFadeVariant } from "../scrollAnimation/directionalVariants";
import { useScrollDirection } from "../scrollAnimation/useScrollDirection";

type BlogCardProps = {
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  views: string;
};

export default function BlogCard({
  image,
  category,
  title,
  description,
  date,
  readTime,
  views,
}: BlogCardProps) {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  return (
    <motion.div
      className="
        rounded-xl overflow-hidden
        bg-[color:var(--bg-card)]
        shadow-sm hover:shadow-[var(--shadow-card)]
        transition
      "
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      {/* IMAGE */}
      <div className="relative h-56 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* CATEGORY */}
        <p className="mb-1 text-xs font-medium text-orange-500">
          {category}
        </p>

        {/* TITLE */}
        <Link
          href="blog-detail"
          className="
            mb-2 block text-lg font-semibold leading-snug
            text-[color:var(--text-title)]
            hover:text-[color:var(--primary)]
            transition
          "
        >
          {title}
        </Link>

        {/* DESCRIPTION */}
        <p className="mb-4 text-sm text-[color:var(--text-subtitle)]">
          {description}
        </p>

        {/* META */}
        <div className="flex gap-3 text-xs text-[color:var(--text-muted)]">
          <span>{date}</span>
          <span>• {readTime}</span>
          <span>• {views}</span>
        </div>
      </div>
    </motion.div>
  );
}
