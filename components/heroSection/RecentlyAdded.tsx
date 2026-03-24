'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { getFadeVariant } from "../scrollAnimation/directionalVariants";
import { useScrollDirection } from "../scrollAnimation/useScrollDirection";

export default function RecentlyAdded() {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  return (
    <section className="bg-[color:var(--bg-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-10">

        {/* TITLE */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[color:var(--text-title)] mb-8 sm:mb-10">
          Engaging Dialogues with the Exceptional
        </h1>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* FEATURED POST */}
          <motion.div
            className="lg:col-span-2 space-y-5 sm:space-y-6"
            variants={fadeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden border border-[color:var(--border-color)]">
              <Image
                src={`/blogimg/blog-6.jpg`}
                alt="Featured"
                width={1000}
                height={600}
                className="w-full h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] object-cover"
                priority
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <span
                className="
                  inline-flex items-center gap-2
                  text-xs uppercase tracking-wide
                  bg-[color:var(--bg-section)]
                  text-[color:var(--text-subtitle)]
                  px-3 py-1 rounded-full w-fit
                "
              >
                Security
              </span>

              <Link
                href="blog-detail"
                className="
                  text-lg sm:text-xl md:text-2xl lg:text-3xl
                  font-serif leading-snug block
                  text-[color:var(--text-title)]
                  hover:text-[color:var(--primary)]
                  transition
                "
              >
                Cloud-Native Cybersecurity Startup Security Raises{" "}
                <span className="underline decoration-[color:var(--border-color)]">
                  $60M Fund
                </span>
              </Link>

              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm text-[color:var(--text-muted)]">
                <span>May 20, 2024</span>
                <span>•</span>
                <span>Kathryn Jackson</span>
                <span>•</span>
                <span>02 min read</span>
              </div>
            </div>
          </motion.div>

          {/* SIDEBAR */}
          <aside className="space-y-5 sm:space-y-6">

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[color:var(--text-title)] rounded-full"></span>
              <h3 className="uppercase text-xs sm:text-sm tracking-wide text-[color:var(--text-subtitle)]">
                Top Posts
              </h3>
            </div>

            <div className="space-y-2 sm:space-y-2">
              {posts.map((post, i) => (
                <motion.div
                  key={i}
                  variants={fadeVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.2 }}
                  className="
                    flex gap-3 sm:gap-4 items-start
                    rounded-xl p-2 sm:p-2
                    hover:bg-[color:var(--bg-section)]
                    transition
                  "
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={100}
                    height={56}
                    className="rounded-lg object-cover shrink-0"
                  />

                  <div className="min-w-0">
                    <Link
                      href="blog-detail"
                      className="
                        text-sm sm:text-base font-serif leading-snug
                        text-[color:var(--text-title)]
                        hover:text-[color:var(--primary)]
                        line-clamp-2 transition
                      "
                    >
                      {post.title}
                    </Link>

                    <p className="text-xs text-[color:var(--text-muted)] mt-1">
                      {post.author} • {post.read}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </aside>
        </div>
      </div>
      <Image
        src={`/blogimg/blog-6.jpg`}
        alt="Featured"
        width={1000}
        height={600}
        className="w-full h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] object-cover"
        priority
        unoptimized={true}
      />
    </section>
  );
}

const posts = [
  {
    title: "The Science of Happiness: Cultivating Joy",
    author: "Alex",
    read: "03 min read",
    image: "/blogimg/blog-8.jpg",
  },
  {
    title: "First Look: Nine New Indie Bio Companies",
    author: "Nilima",
    read: "03 min read",
    image: "/blogimg/blog-9.jpg",
  },
  {
    title: "Breaking into a Tech Support Opportunity",
    author: "Alex",
    read: "03 min read",
    image: "/blogimg/blog-10.jpg",
  },
  {
    title: "Embracing Change with Resilience",
    author: "Alex",
    read: "03 min read",
    image: "/blogimg/blog-11.jpg",
  },
];
