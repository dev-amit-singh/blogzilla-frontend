"use client";

import Image from "next/image";
import Link from "next/link";

interface Category {
  label: string;
  color?: string;
}

interface CardOneProps {
  image: string;
  categories: Category[];
  title: string;
  date: string;
  readTime: string;
  views: string;
  onCameraClick?: () => void;
}

export default function CardOne({
  image,
  categories,
  title,
  date,
  readTime,
  views,
  onCameraClick,
}: CardOneProps) {
  return (
    <article
      className="
        h-[420px] overflow-hidden rounded-xl
        bg-[color:var(--bg-card)]
        border border-[color:var(--border-color)]
        shadow-sm hover:shadow-[var(--shadow-card)]
        transition
      "
    >
      {/* IMAGE */}
      <div className="relative h-[240px]">
        <Image src={image} alt={title} fill className="object-cover" />

        {onCameraClick && (
          <button
            onClick={onCameraClick}
            className="
              absolute right-3 top-3
              flex h-9 w-9 items-center justify-center rounded-full
              bg-[color:var(--primary)]
              text-[color:var(--primary-text)]
              shadow
            "
          >
            📷
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* CATEGORY */}
        <div className="mb-2 text-sm font-medium">
          {categories.map((c, i) => (
            <span
              key={i}
              className="text-orange-500"
            >
              {c.label}
              {i < categories.length - 1 && " · "}
            </span>
          ))}
        </div>

        {/* TITLE */}
        <Link
          href="blog-detail"
          className="
            mb-4 block text-lg font-semibold leading-snug
            text-[color:var(--text-title)]
            hover:text-[color:var(--primary)]
            transition
          "
        >
          {title}
        </Link>

        {/* META */}
        <div className="flex gap-3 text-xs uppercase text-[color:var(--text-muted)]">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
          <span>•</span>
          <span>{views}</span>
        </div>
      </div>
    </article>
  );
}
