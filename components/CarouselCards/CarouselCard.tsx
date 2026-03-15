import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselCardProps = {
  image: string;
  title: string;
  category: string;
  date: string;
  views: string;
};

export default function CarouselCard({
  image,
  title,
  category,
  date,
  views,
}: CarouselCardProps) {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-xl">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
        {/* Category (ANCHOR 1) */}
        <Link
          href={`/category/${category.toLowerCase()}`}
          className="mb-3 inline-block text-sm font-medium text-orange-500 hover:underline"
        >
          {category}
        </Link>

        {/* Title (ANCHOR 2 – paragraph style) */}
        <Link
          href="#"
          className="max-w-3xl text-3xl font-bold leading-tight hover:underline"
        >
          {title}
        </Link>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-300">
          <span>{date}</span>
          <span>•</span>
          <span>{views} Views</span>
        </div>
      </div>

      
    </div>
  );
}
