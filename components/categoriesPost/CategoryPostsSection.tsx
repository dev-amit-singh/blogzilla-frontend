"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CategoryPostItem from "./CategoryPostItem";

interface Blog {
  _id: string;
  title: string;
  mainimg: string;
  createdAt: string;
  views?: string;
}

export default function CategoryPostsSection() {
  const [columns, setColumns] = useState<{ title: string; data: Blog[] }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const layoutRes = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/layout/home-footer`);
        const { col1, col2, col3 } = layoutRes.data;

        const formatSlug = (name: string) => name ? name.toLowerCase().replace(/ /g, "-") : "";

        const [res1, res2, res3] = await Promise.all([
          col1 ? axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/blogs/category/${formatSlug(col1)}`) : Promise.resolve({ data: [] }),
          col2 ? axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/blogs/category/${formatSlug(col2)}`) : Promise.resolve({ data: [] }),
          col3 ? axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/blogs/category/${formatSlug(col3)}`) : Promise.resolve({ data: [] }),
        ]);

        setColumns([
          { title: col1, data: res1.data.slice(0, 3) },
          { title: col2, data: res2.data.slice(0, 3) },
          { title: col3, data: res3.data.slice(0, 3) },
        ]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <section className="py-12 bg-[color:var(--bg-section)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {loading ? (
            // Jab loading ho raha ho tab 3 columns of skeletons dikhao
            [1, 2, 3].map((i) => (
              <div key={i} className="space-y-6">
                <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse mb-6"></div>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ))
          ) : (
            // Jab data aa jaye
            columns.map((column, index) => (
              <div key={index}>
                <h3 className="mb-6 pb-2 text-sm font-semibold text-[color:var(--text-subtitle)] border-b border-[color:var(--border-color)] uppercase tracking-widest">
                  {column.title || "Category"}
                </h3>

                <div className="space-y-5">
                  {column.data.map((blog) => (
                    <CategoryPostItem
                      key={blog._id}
                      image={blog.mainimg}
                      title={blog.title}
                      date={new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                      views={blog.views || "10K views"}
                    />
                  ))}
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </section>
  );
}

// Shining Glass Skeleton Component
function SkeletonCard() {
  // Humne 'dark:' classes hata di hain taaki color same rahe
  const skeletonBase = "bg-zinc-200"; // Fixed light grey color
  const shimmerLayer = "absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer";

  return (
    <div className="flex gap-4 items-center">
      {/* Image Skeleton */}
      <div className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${skeletonBase}`}>
        <div className={shimmerLayer}></div>
      </div>

      {/* Text Skeleton */}
      <div className="flex-1 space-y-3">
        {/* Title line */}
        <div className={`relative h-4 w-full rounded-sm overflow-hidden ${skeletonBase}`}>
          <div className={shimmerLayer}></div>
        </div>
        {/* Meta line */}
        <div className={`relative h-3 w-2/3 rounded-sm overflow-hidden ${skeletonBase}`}>
          <div className={shimmerLayer}></div>
        </div>
      </div>
    </div>
  );
}