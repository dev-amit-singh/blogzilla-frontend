'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { getFadeVariant } from "../scrollAnimation/directionalVariants";
import { useScrollDirection } from "../scrollAnimation/useScrollDirection";

export default function FeaturedSmallCard({
  image,
  category,
  title,
  meta,
}: {
  image: string;
  category: string;
  title: string;
  meta: string;
}) {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  return (
    <motion.div
      className="
        h-[420px] overflow-hidden rounded-xl
        bg-[color:var(--bg-card)]
        border border-[color:var(--border-color)]
        shadow-sm hover:shadow-[var(--shadow-card)]
        transition
      "
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      {/* IMAGE */}
      <div className="relative h-[230px]">
        <Image src={image} alt={title} fill className="object-cover w-full" unoptimized={true} />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* CATEGORY */}
        <span className="text-sm font-medium text-orange-500">
          {category}
        </span>

        {/* TITLE */}
        <Link
          href="blog-detail"
          className="
            my-3 block text-lg font-semibold leading-snug
            text-[color:var(--text-title)]
            hover:text-[color:var(--primary)]
            transition
          "
        >
          {title}
        </Link>

        {/* META */}
        <p className="text-xs uppercase text-[color:var(--text-muted)]">
          {meta}
        </p>
      </div>
    </motion.div>
  );
}
