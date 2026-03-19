'use client';

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Importing your custom scroll animation hooks
import { getFadeVariant } from "@/components/scrollAnimation/directionalVariants"; 
import { useScrollDirection } from "@/components/scrollAnimation/useScrollDirection"; 

// --- Mock Data ---
const MOCK_POSTS = [
  {
    id: 1,
    category: "Frontend",
    title: "Mastering Next.js 14 Server Actions",
    description: "Dive deep into the new paradigms of data fetching and mutations without writing standalone API routes.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    views: "1.2k"
  },
  {
    id: 2,
    category: "Backend",
    title: "Building Scalable APIs with Node & Express",
    description: "Architecture patterns for handling high traffic and structuring your MERN stack backend effectively.",
    image: "https://images.unsplash.com/photo-1627398248735-0ba6bececa5a?auto=format&fit=crop&q=80&w=800",
    date: "Mar 10, 2026",
    readTime: "12 min read",
    views: "850"
  },
  {
    id: 3,
    category: "Career",
    title: "Landing Remote Tech Jobs Abroad",
    description: "Actionable strategies for showcasing your portfolio and navigating international hiring processes.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    date: "Mar 05, 2026",
    readTime: "6 min read",
    views: "3.4k"
  },
  {
    id: 4,
    category: "Database",
    title: "MongoDB Aggregations Demystified",
    description: "Stop writing multiple queries. Learn how to use the aggregation pipeline to transform data on the fly.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
    date: "Feb 28, 2026",
    readTime: "10 min read",
    views: "920"
  },
  {
    id: 5,
    category: "Blogging",
    title: "Monetizing Your Developer Blog",
    description: "From ad networks to sponsorships: a realistic guide to generating revenue from your technical writing.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    date: "Feb 20, 2026",
    readTime: "7 min read",
    views: "2.1k"
  }
];

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Career", "Blogging"];

export default function SubCategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  // Filter functionality based on category AND search query
  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[var(--bg-page)] py-16 px-4 sm:px-8 lg:px-12 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & CONTROLS */}
        <header className="mb-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-title)] tracking-tight">
                Explore Topics
              </h1>
              <p className="mt-3 text-lg text-[var(--text-muted)] max-w-2xl">
                Deep dives, tutorials, and insights into modern development.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[var(--bg-section)] border border-[var(--border-color)] text-[var(--text-title)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow placeholder:text-[var(--text-muted)]"
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[var(--primary)] text-[var(--primary-text)] shadow-md transform scale-105"
                    : "bg-[var(--bg-section)] text-[var(--text-subtitle)] hover:bg-[var(--border-color)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* DYNAMIC GRID LAYOUT */}
        {filteredPosts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPosts.map((post, index) => {
                // The first post in the filtered list gets a larger featured layout
                const isFeatured = index === 0;

                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial="hidden"
                    whileInView="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                    viewport={{ amount: 0.1 }}
                    variants={fadeVariant}
                    className={`group relative flex flex-col rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] hover:shadow-[var(--shadow-card)] transition-all duration-300 ${
                      isFeatured ? "md:col-span-2 md:flex-row" : "col-span-1"
                    }`}
                  >
                    {/* Image Area */}
                    <div className={`relative overflow-hidden ${isFeatured ? "md:w-3/5 h-64 md:h-auto" : "h-56 w-full"}`}>
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[var(--bg-card)]/90 backdrop-blur-sm text-[var(--primary)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className={`flex flex-col justify-center p-6 lg:p-8 ${isFeatured ? "md:w-2/5" : "w-full"}`}>
                      <Link href={`/blog/${post.id}`} className="block mt-2">
                        <h2 className={`font-bold text-[var(--text-title)] group-hover:text-[var(--primary)] transition-colors ${isFeatured ? "text-2xl lg:text-3xl leading-tight" : "text-xl leading-snug"}`}>
                          {post.title}
                        </h2>
                      </Link>
                      
                      <p className={`mt-3 text-[var(--text-muted)] line-clamp-3 ${isFeatured ? "text-base" : "text-sm"}`}>
                        {post.description}
                      </p>

                      <div className="mt-auto pt-6 flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
                        <div className="flex items-center gap-3">
                          <span>{post.date}</span>
                          <span className="w-1 h-1 rounded-full bg-[var(--border-color)]"></span>
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          {post.views}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-bold text-[var(--text-title)]">No articles found</h3>
            <p className="mt-2 text-[var(--text-muted)]">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
              className="mt-6 px-6 py-2 bg-[var(--primary)] text-[var(--primary-text)] rounded-full hover:bg-[var(--primary-hover)] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}