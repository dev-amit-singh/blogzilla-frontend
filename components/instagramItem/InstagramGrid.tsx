"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

const images = [
  { src: "/blogimg/blog-7.jpg", link: "https://www.instagram.com/p/POST1/" },
  { src: "/blogimg/blog-8.jpg", link: "https://www.instagram.com/p/POST2/" },
  { src: "/blogimg/blog-9.jpg", link: "https://www.instagram.com/p/POST3/" },
  { src: "/blogimg/blog-10.jpg", link: "https://www.instagram.com/p/POST4/" },
  { src: "/blogimg/blog-11.jpg", link: "https://www.instagram.com/p/POST5/" },
  { src: "/blogimg/blog-12.jpg", link: "https://www.instagram.com/p/POST6/" },
];

export default function InstagramGrid() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          target="_blank"
          className="group relative h-24 rounded-lg overflow-hidden"
        >
          {/* Image */}
          <Image
            src={item.src}
            alt="Instagram"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <Instagram className="text-white opacity-0 group-hover:opacity-100 transition duration-300 w-6 h-6" />
          </div>
        </Link>
      ))}
    </div>
  );
}
