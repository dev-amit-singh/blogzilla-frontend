import BlogCard from "@/components/blogCard/BlogCard";
import CategoryListSection from "@/components/categoriesPost/CategoryListSection";
import CategoryPostsSection from "@/components/categoriesPost/CategoryPostsSection";
import ThemeSwitch from "@/components/themeSwitch/ThemeSwitch";

const blogs = [
    {
        image: "/blogimg/blog-1.jpg",
        category: "Next.js",
        title: "Next.js App Router: Complete Guide for Beginners",
        description:
            "Understand layouts, nested routes, loading states, and server components in the Next.js App Router.",
        date: "Jan 10, 2026",
        readTime: "6 min read",
        views: "2.1K views",
    },
    {
        image: "/blogimg/blog-2.jpg",
        category: "React",
        title: "Top React Hooks You Should Use in Every Project",
        description:
            "A practical guide to the most commonly used React hooks with real-world examples.",
        date: "Jan 12, 2026",
        readTime: "5 min read",
        views: "1.7K views",
    },
    {
        image: "/blogimg/blog-3.jpg",
        category: "Animation",
        title: "Smooth Scroll Animations with Framer Motion",
        description:
            "Learn how to add scroll-based animations using Framer Motion in Next.js projects.",
        date: "Jan 14, 2026",
        readTime: "7 min read",
        views: "2.9K views",
    },
    {
        image: "/blogimg/blog-4.jpg",
        category: "UI/UX",
        title: "Modern UI Design Trends for Web Applications",
        description:
            "Explore the latest UI trends that improve user experience and conversion rates.",
        date: "Jan 16, 2026",
        readTime: "4 min read",
        views: "1.3K views",
    },
    {
        image: "/blogimg/blog-5.jpg",
        category: "Performance",
        title: "How to Optimize Images in Next.js for Faster Load",
        description:
            "Learn best practices for using next/image to boost performance and SEO.",
        date: "Jan 18, 2026",
        readTime: "5 min read",
        views: "2.4K views",
    },
    {
        image: "/blogimg/blog-6.jpg",
        category: "SEO",
        title: "SEO Best Practices for Next.js Blogs",
        description:
            "Everything you need to know about metadata, sitemap, and indexing in Next.js.",
        date: "Jan 20, 2026",
        readTime: "6 min read",
        views: "3.2K views",
    },
    {
        image: "/blogimg/blog-7.jpg",
        category: "Tailwind CSS",
        title: "Build Beautiful Blog Cards Using Tailwind CSS",
        description:
            "Create responsive, modern blog cards using Tailwind CSS utility classes.",
        date: "Jan 22, 2026",
        readTime: "4 min read",
        views: "1.1K views",
    },
    {
        image: "/blogimg/blog-8.jpg",
        category: "Backend",
        title: "API Routes in Next.js: Everything You Need to Know",
        description:
            "Learn how to create secure and scalable API routes using Next.js.",
        date: "Jan 24, 2026",
        readTime: "6 min read",
        views: "2.6K views",
    },
    {
        image: "/blogimg/blog-9.jpg",
        category: "Security",
        title: "Common Security Mistakes in Web Applications",
        description:
            "Avoid these common security issues when building modern web applications.",
        date: "Jan 26, 2026",
        readTime: "7 min read",
        views: "3.8K views",
    },
    {
        image: "/blogimg/blog-10.jpg",
        category: "Deployment",
        title: "How to Deploy a Next.js App on Vercel",
        description:
            "Step-by-step guide to deploying your Next.js application on Vercel.",
        date: "Jan 27, 2026",
        readTime: "3 min read",
        views: "4.1K views",
    },
    {
        image: "/blogimg/blog-11.jpg",
        category: "Best Practices",
        title: "Folder Structure Best Practices for Next.js Projects",
        description:
            "Learn how to structure your Next.js project for scalability and maintainability.",
        date: "Jan 29, 2026",
        readTime: "5 min read",
        views: "2.9K views",
    },
    {
        image: "/blogimg/blog-12.jpg",
        category: "Guides",
        title: "How to Build a Complete Blog Using Next.js App Router",
        description:
            "A complete end-to-end guide to building a production-ready blog in Next.js.",
        date: "Jan 31, 2026",
        readTime: "8 min read",
        views: "5.4K views",
    },
];


export default function Blog() {
    return (
        <>
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Our Blogs</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, index) => (
                        <BlogCard key={index} {...blog} />
                    ))}
                </div>
            </section>
            <section className="custom-bg">
                <div className="max-w-7xl mx-auto px-4 py-5">
                <CategoryPostsSection />

                <CategoryListSection />
            </div>            
            </section>
        </>
    );
}
