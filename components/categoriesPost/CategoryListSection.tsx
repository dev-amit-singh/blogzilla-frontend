"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import CategoryListItem from "./CategoryListItem";
import { MoveLeft, MoveRight } from "lucide-react";

const API = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:5000";

export default function CategoryListSection() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Axios fetch
        const response = await axios.get(`${API}/api/admin/blogs/categories`);
        console.log(response.data)
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 bg-transparent">

      {/* SECTION TITLE & NAV */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-widest uppercase pb-2 border-b text-[color:var(--text-subtitle)] border-[color:var(--border-color)]">
          Categories
        </h2>

        <div className="flex gap-2">
          <button ref={prevRef} className="group w-8 h-8 rounded-full border flex items-center justify-center border-[color:var(--border-color)] hover:border-[color:var(--text-title)] transition">
            <MoveLeft size={18} className="text-[color:var(--text-muted)] group-hover:text-[color:var(--text-title)] transition-colors" />
          </button>
          <button ref={nextRef} className="group w-8 h-8 rounded-full border flex items-center justify-center border-[color:var(--border-color)] hover:border-[color:var(--text-title)] transition">
            <MoveRight size={18} className="text-[color:var(--text-muted)] group-hover:text-[color:var(--text-title)] transition-colors" />
          </button>
        </div>
      </div>

      {loading ? (
        /* LOADING SKELETONS - No Carousel during loading for stability */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
        </div>
      ) : (
        /* ACTUAL CAROUSEL */
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={4}
          slidesPerGroup={1}
          loop={categories.length > 4}
          speed={700}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          onBeforeInit={(swiper) => {
            // Re-assigning navigation refs
            if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {/* Manual Access (Requested: No .map method) */}
          {categories[0] && (
            <SwiperSlide>
              <CategoryListItem
                image={categories[0].image || "/blogimg/blog-14.jpg"}
                title={categories[0]._id}
                description={"Protecting data through advanced encryption and privacy strategies."}
              />
            </SwiperSlide>
          )}
          {categories[1] && (
            <SwiperSlide>
              <CategoryListItem
                image={categories[1].image || "/blogimg/blog-13.jpg"}
                title={categories[1]._id}
                description={"Expert tips for balanced living and total physical well-being"}
              />
            </SwiperSlide>
          )}
          {categories[2] && (
            <SwiperSlide>
              <CategoryListItem
                image={categories[2].image || "/blogimg/blog-12.jpg"}
                title={categories[2]._id}
                description={"Journey through Earth’s diverse ecosystems and wild creatures."}
              />
            </SwiperSlide>
          )}
          {categories[3] && (
            <SwiperSlide>
              <CategoryListItem
                image={categories[3].image || "/blogimg/blog-11.jpg"}
                title={categories[3]._id}
                description={"Real-time monitoring and rapid response to modern digital threats."}
              />
            </SwiperSlide>
          )}
          {categories[4] && (
            <SwiperSlide>
              <CategoryListItem
                image={categories[4].image || "/blogimg/blog-10.jpg"}
                title={categories[4]._id}
                description={"Exploring future innovations, latest gadgets and digital trends"}
              />
            </SwiperSlide>
          )}
          {categories[5] && (
            <SwiperSlide>
              <CategoryListItem
                image={categories[4].image || "/blogimg/blog-10.jpg"}
                title={categories[4]._id}
                description={categories[4].description}
              />
            </SwiperSlide>
          )}
        </Swiper>
      )}
    </section>
  );
}

/* INTERNAL SKELETON COMPONENT (FIXED COLORS) */
function CategorySkeleton() {
  // Base colors for the skeleton parts
  // const baseBg = "bg-zinc-200 dark:bg-zinc-800";
  // const shimmerEffect = "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer";
  const baseBg = "bg-zinc-200"; // Fixed light grey color
  const shimmerEffect = "absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer";

  return (
    <div className="group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden bg-[color:var(--bg-card)] border border-[color:var(--border-color)]">

      {/* 1. IMAGE SKELETON (Circular match) */}
      <div className={`relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ${baseBg}`}>
        <div className={shimmerEffect}></div>
      </div>

      {/* 2. CONTENT SKELETON */}
      <div className="flex-1 space-y-2">
        {/* Title Line */}
        <div className={`relative h-4 w-24 rounded-md overflow-hidden ${baseBg}`}>
          <div className={shimmerEffect}></div>
        </div>

        {/* Description Line */}
        <div className={`relative h-5 py-8 w-full rounded-md overflow-hidden ${baseBg}`}>
          <div className={shimmerEffect}></div>
        </div>
      </div>

    </div>
  );
}