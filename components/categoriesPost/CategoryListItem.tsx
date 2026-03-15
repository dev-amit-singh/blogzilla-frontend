import Image from "next/image";
import Link from "next/link";

type CategoryListItemProps = {
  image: string;
  title: string;
  description: string;
};

export default function CategoryListItem({
  image,
  title,
  description,
}: CategoryListItemProps) {
  return (
    <div
      className="
        group relative flex items-center gap-4 p-4
        rounded-xl overflow-hidden
        bg-[color:var(--bg-card)]
        border border-[color:var(--border-color)]
        transition-all duration-500
        hover:shadow-[var(--shadow-card)]
        hover:border-[color:var(--primary)]
      "
    >
      {/* GRADIENT HOVER OVERLAY */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-r
          from-[color:var(--primary)]/10
          via-purple-500/10
          to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
      />

      {/* IMAGE */}
      <div
        className="
          relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0
          ring-2 ring-transparent
          transition-all duration-500
          group-hover:ring-[color:var(--primary)]
        "
      >
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />
      </div>

      {/* CONTENT */}
      <div className="relative">
        <Link href={"#"}
          className="
            text-sm font-semibold
            text-[color:var(--text-title)]
            transition-all duration-300
            group-hover:text-[color:var(--primary)]
            group-hover:translate-x-1
          "
        >
          {title}
        </Link>

        <p className="text-sm leading-snug text-[color:var(--text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}
