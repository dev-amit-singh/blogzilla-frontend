'use client'

import Image from "next/image";
import { motion } from "framer-motion";

import { useScrollDirection } from "../scrollAnimation/useScrollDirection";
import { getFadeVariant } from "../scrollAnimation/directionalVariants";
import Link from "next/link";

type CategoryPostItemProps = {
  image: string;
  title: string;
  date: string;
  views: string;
};

export default function CategoryPostItem({
  image,
  title,
  date,
  views,
}: CategoryPostItemProps) {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  return (
    <motion.div
      className="flex gap-4"
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={image} alt="not-found" fill className="object-cover"/>
      </div>

      <div>
        <Link href={"#"} className="mb-1 text-sm font-semibold leading-snug text-[color:var(--text-title)] hover:text-[color:var(--primary)]">
          {title}
        </Link>

        <p className="text-xs text-[color:var(--text-muted)]">
          {date} • {views}
        </p>
      </div>
    </motion.div>
  );
}
