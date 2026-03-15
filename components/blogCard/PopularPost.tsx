'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useScrollDirection } from "../scrollAnimation/useScrollDirection";
import { getFadeVariant } from "../scrollAnimation/directionalVariants";

type PopularPostProps = {
  image: string;
  title: string;
  date: string;
  views: string;
};

export default function PopularPost({
  image,
  title,
  date,
  views,
}: PopularPostProps) {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  return (
    <motion.div
      className="flex gap-3"
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <Image
        src={image}
        alt={title}
        width={60}
        height={60}
        className="rounded-md object-cover"
      />

      <div>
        <Link
          href="blog-detail"
          className="
            text-sm font-medium leading-snug
            text-[color:var(--text-title)]
            hover:text-[color:var(--primary)]
            transition
          "
        >
          {title}
        </Link>

        <p className="text-xs text-[color:var(--text-muted)]">
          {date} • {views}
        </p>
      </div>
    </motion.div>
  );
}
