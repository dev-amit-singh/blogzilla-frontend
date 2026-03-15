'use client'

import Image from "next/image";
import { motion } from "framer-motion";

import { useScrollDirection } from "../scrollAnimation/useScrollDirection";
import { getFadeVariant } from "../scrollAnimation/directionalVariants";
import Link from "next/link";

type LatestPostItemProps = {
  image: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  views: string;
};

export default function LatestPostItem({
  image,
  category,
  title,
  date,
  readTime,
  views,
}: LatestPostItemProps) {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  return (
    <motion.div
      className="flex gap-5"
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="relative w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold text-orange-500">
          {category}
        </p>

        <Link href={"#"} className="mb-2 text-base lg:text-2xl font-semibold leading-snug text-[color:var(--text-title)] hover:text-[color:var(--primary)]">
          {title}
        </Link>

        <p className="text-xs text-[color:var(--text-muted)]">
          {date} • {readTime} • {views}
        </p>
      </div>
    </motion.div>
  );
}
