import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

import Carousel from "@/components/CarouselCards/Carousel";
import HeroCarousel from "@/components/CarouselCards/HeroCarousel";
import VantaBirds from "@/components/backgrounds/VantaBirds";
import AuthorCard from "@/components/blogCard/AuthorCard";
import BlogCard from "@/components/blogCard/BlogCard";
import CardOneClient from "@/components/blogCard/CardOneClient";
import PopularPost from "@/components/blogCard/PopularPost";
import CategoryListSection from "@/components/categoriesPost/CategoryListSection";
import CategoryPostsSection from "@/components/categoriesPost/CategoryPostsSection";
import FeaturedGrid from "@/components/featured/FeaturedGrid";
import LatestPostsSection from "@/components/heroSection/LatestPostsSection";
import RecentlyAdded from "@/components/heroSection/RecentlyAdded";

export default function Home() {
  // const scrollDirection = useScrollDirection();
  // const fadeVariant = getFadeVariant(scrollDirection);
  return (
    <>

      <div >
        {/* Hero Section */}
        <BackgroundBeamsWithCollision>

          <HeroCarousel />
        </BackgroundBeamsWithCollision>

        {/* Main content */}
        {/* <main className="mx-auto max-w-7xl px-4 py-8 z-10"> */}
        {/* Hero Section */}

        <div className="custom-bg pb-5">

          {/* HEADER */}
          <div
            className="flex items-center justify-between max-w-7xl mx-auto px-4 pt-5"
            
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--text-title)]">
              Featured Posts
            </h2>

            <p className="text-sm text-gray-500">
              Hot tags: <span className="ml-2"># Covid-19 # Inspiration # Work online # Stay home</span>
            </p>
          </div>

          {/* TOP SECTION */}
          <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto px-4 py-5 ">
            {/* LEFT – BIG FEATURE */}
            <div className="col-span-12 lg:col-span-8">
              <Carousel />
            </div>

            {/* RIGHT – SINGLE FEATURE CARD */}
            <div className="col-span-12 lg:col-span-4">
              <CardOneClient />
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div className=" max-w-7xl mx-auto px-4 ">
            <FeaturedGrid />
          </div>
        </div>

        <div className="">
          <RecentlyAdded />
        </div>
        {/* </main> */}
        <div className="custom-bg">
          <section className="max-w-7xl mx-auto px-4 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

              {/* LEFT CONTENT */}
              <div className="lg:col-span-3">
                <h2 className="text-sm font-semibold text-gray-500 mb-4">
                  TRAVEL TIPS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BlogCard
                    image="/blogImg/blog-1.jpg"
                    category="Artists • Film"
                    title="Easy Ways to Use Alternatives to Plastic"
                    description="Graduating from a top accelerator or incubator can be a career-defining moment..."
                    date="27 August"
                    readTime="12 mins read"
                    views="23K views"
                  />

                  <BlogCard
                    image="/blogImg/blog-2.jpg"
                    category="Fashion"
                    title="Tips for Growing Healthy, Longer Hair"
                    description="Proin vitae placerat quam. Ut sodales eleifend urna..."
                    date="12 August"
                    readTime="6 mins read"
                    views="3K views"
                  />

                  <BlogCard
                    image="/blogImg/blog-3.jpg"
                    category="Lifestyle"
                    title="Project Ideas Around the House"
                    description="Sed tempor condimentum metus non tempor..."
                    date="27 August"
                    readTime="12 mins read"
                    views="23K views"
                  />

                  <BlogCard
                    image="/blogImg/blog-4.jpg"
                    category="Hotels"
                    title="How to Give Yourself a Spa Day from Home"
                    description="Graduating from a top accelerator or incubator..."
                    date="18 August"
                    readTime="14 mins read"
                    views="25K views"
                  />
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="space-y-8">
                <AuthorCard />

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-4">
                    MOST POPULAR
                  </h3>

                  <div className="space-y-4">
                    <PopularPost
                      image="/blogImg/blog-5.jpg"
                      title="Spending Some Quality Time with Kids!"
                      date="05 August"
                      views="150 views"
                    />

                    <PopularPost
                      image="/blogImg/blog-6.jpg"
                      title="Relationship Podcasts are Having ‘That’ Talk"
                      date="12 August"
                      views="6K views"
                    />

                    <PopularPost
                      image="/blogImg/blog-7.jpg"
                      title="Here’s How to Get the Best Sleep at Night"
                      date="15 August"
                      views="16K views"
                    />
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
        <div>
          <VantaBirds
            minHeight={400}
            color1={0x3b82f6}
            color2={0x8b5cf6}
          // className="py-16 md:py-24"
          >
            <LatestPostsSection />
          </VantaBirds>
        </div>
        <div className="custom-bg">
          <CategoryPostsSection />
        </div>
        <div className="custom-bg">
          <CategoryListSection />
        </div>
      </div >
    </>
  );
}
