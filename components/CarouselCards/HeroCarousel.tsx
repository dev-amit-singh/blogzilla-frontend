"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import CarouselArrow from "@/components/CarouselCards/CarouselArrow";

import "swiper/css";
import "swiper/css/navigation";
import BlurText from "../ui/BlurText";

export default function HeroCarousel() {
  return (
    <section className="w-full py-120 bg-[color:var(--bg-page)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-2 md:grid-cols-2">

        {/* LEFT SIDE – TEXT CONTENT */}
        <div>
          <span
            className="
              mb-3 inline-block rounded-full
              bg-[color:var(--bg-section)]
              px-4 py-1 text-sm font-medium
              text-[color:var(--primary)]
            "
          >
            <i className="fa fa-rocket" aria-hidden="true"></i> Featured Blogs
          </span>

          <BlurText
            text="Learn Web Development &"
            animateBy="words"
            direction="top"
            delay={120}
            className="mt-4 text-4xl font-bold leading-tight md:text-5xl"
          />

          <BlurText
            text="Digital Marketing"
            animateBy="words"
            direction="top"
            delay={120}
            className="text-4xl font-bold leading-tight md:text-5xl"
          />

          <BlurText
            text="Read high-quality blogs on Next.js, React, SEO, performance,
            and modern web technologies."
            animateBy="words"
            direction="top"
            delay={120}
            className="mt-5 text-lg text-[color:var(--text-muted)]"
          />

          <div className="mt-6 flex gap-4">
            {/* PRIMARY CTA */}
            <button
              className="
                rounded-lg
                bg-[color:var(--primary)]
                px-6 py-3
                text-[color:var(--primary-text)]
                hover:bg-[color:var(--primary-hover)]
                transition
              "
            >
              Read Latest Blog
            </button>

            {/* SECONDARY CTA */}
            <button
              className="
                rounded-lg
                bg-[color:var(--bg-card)]
                px-6 py-3
                text-[color:var(--text-title)]
                border border-[color:var(--border-color)]
                shadow-[var(--shadow-card)]
                hover:bg-[color:var(--primary)]
                hover:text-[color:var(--primary-text)]
                transition
              "
            >
              Browse Categories
            </button>
          </div>
        </div>

        {/* RIGHT SIDE – CAROUSEL */}
        <div className="relative">

          {/* LEFT ARROW */}
          <button
            className="hero-prev absolute left-0 top-1/2 z-10 -translate-y-1/2"
            aria-label="Previous slide"
          >
            <CarouselArrow direction="left" />
          </button>

          {/* RIGHT ARROW */}
          <button
            className="hero-next absolute right-5 top-1/2 z-10 -translate-y-1/2"
            aria-label="Next slide"
          >
            <CarouselArrow direction="right" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".hero-prev",
              nextEl: ".hero-next",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="rounded-xl"
          >
            {[
              { title: "Next.js 14 Complete Guide", img: "banner-1.png" },
              { title: "SEO Tips for Developers", img: "banner-2.png" },
              { title: "React Performance Optimization", img: "banner-3.png" },
            ].map((slide, i) => (
              <SwiperSlide key={i}>
                <div
                  className={`h-[420px] rounded-xl bg-cover bg-center`}
                  style={{ backgroundImage: `url('/banners/${slide.img}')` }}
                >
                  <div
                    className="
                      flex h-full items-end rounded-xl
                      bg-gradient-to-t from-black/70 to-transparent
                      p-6
                    "
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}
