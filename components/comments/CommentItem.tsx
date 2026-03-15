'use client'

import Image from "next/image";
import { motion } from "framer-motion";

import { useScrollDirection } from "../scrollAnimation/useScrollDirection";
import { getFadeVariant } from "../scrollAnimation/directionalVariants";

type CommentItemProps = {
  avatar: string;
  name: string;
  date: string;
  comment: string;
};

export default function CommentItem({
  avatar,
  name,
  date,
  comment,
}: CommentItemProps) {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  return (
    <motion.div
      className="
        flex gap-3 rounded-xl p-4
        bg-transparent
        shadow-sm hover:shadow-[var(--shadow-card)]
        transition
      "
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <Image
        src={avatar}
        alt={name}
        width={40}
        height={40}
        className="rounded-full"
        style={{ maxHeight: "40px" }}
      />

      <div>
        <p className="text-sm font-semibold text-[color:var(--text-title)]">
          {name}
          <span className="ml-2 text-xs font-normal text-[color:var(--text-muted)]">
            • {date}
          </span>
        </p>

        <p className="mt-1 text-sm leading-snug text-[color:var(--text-subtitle)]">
          {comment}
        </p>
      </div>
    </motion.div>
  );
}
