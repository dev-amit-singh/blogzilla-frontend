import CategoryListSection from '@/components/categoriesPost/CategoryListSection';
import CategoryPostsSection from '@/components/categoriesPost/CategoryPostsSection';
import CommentSection from '@/components/commentBox/CommentSection';
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type TextSection = {
    type: "text";
    content: string;
    subContent?: string;
};

type ImageSection = {
    type: "images";
    images: {
        src: string;
        alt: string;
        caption: string;
    }[];
};

type BlogSection = TextSection | ImageSection;

// Mock data - replace with your actual data fetching
const blogData = {
    id: 1,
    title: 'The Future of Web Development in 2024',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    author: {
        name: 'Alex Johnson',
        avatar: '/images/author-avatar.jpg',
        role: 'Senior Developer'
    },
    publishedDate: 'December 15, 2024',
    readTime: '8 min read',
    category: 'Technology',
    tags: ['Web Development', 'Next.js', 'React', 'Tailwind CSS'],
    content: {
        mainImage: '/blogimg/blog-10.jpg',
        sections: [
            {
                type: 'text',
                content: `The landscape of web development continues to evolve at a rapid pace. As we move through 2024, several key trends are emerging that promise to reshape how we build and interact with web applications. From server components to AI-powered development tools, the industry is undergoing significant transformations.`
            },
            {
                type: 'text',
                content: `One of the most exciting developments has been the widespread adoption of React Server Components. This paradigm shift allows developers to render components on the server, reducing client-side JavaScript and improving performance. Combined with Next.js 15, developers now have powerful tools to build highly optimized applications.`
            },
            {
                type: 'images',
                images: [
                    {
                        src: '/blogimg/blog-3.jpg',
                        alt: 'Modern web development workspace',
                        caption: 'Development environment with multiple monitors showing code'
                    },
                    {
                        src: '/blogimg/blog-4.jpg',
                        alt: 'Code collaboration session',
                        caption: 'Team collaboration on a complex web project'
                    }
                ]
            },
            {
                type: 'text',
                content: `Tailwind CSS has revolutionized how we approach styling in web applications. The utility-first methodology, combined with just-in-time compilation, provides an efficient and maintainable way to build custom designs. The recent updates, including first-class CSS nesting support and improved IDE integration, have made it even more developer-friendly.`
            },
            {
                type: 'images',
                images: [
                    {
                        src: '/blogimg/blog-5.jpg',
                        alt: 'UI design mockups',
                        caption: 'Modern UI designs created with Tailwind CSS'
                    },
                    {
                        src: '/blogimg/blog-8.jpg',
                        alt: 'UI design mockups',
                        caption: 'Modern UI designs created with Tailwind CSS'
                    }
                ]
            },
            {
                type: 'text',
                content: `Looking ahead, we can expect to see more AI integration in development workflows. Tools like GitHub Copilot and similar AI assistants are becoming standard in many developers' toolkits. These tools not only help with code completion but also assist in debugging, documentation, and even architectural decisions. The key will be finding the right balance between AI assistance and human creativity.`,
                subContent: `Another area gaining momentum is WebAssembly (WASM), which allows high-performance applications to run in the browser. While still evolving, it opens up possibilities for graphics-intensive applications, games, and scientific computing directly in web browsers without plugins.`
            },
            {
                type: 'text',
                content: `Another area gaining momentum is WebAssembly (WASM), which allows high-performance applications to run in the browser. While still evolving, it opens up possibilities for graphics-intensive applications, games, and scientific computing directly in web browsers without plugins.`,
                subContent: `As we continue through 2024, staying adaptable and continuously learning will be more important than ever. The tools and technologies may change, but the fundamental principles of good software design remain constant. Focus on building accessible, performant, and maintainable applications that provide real value to users.`
            },
            {
                type: 'text',
                content: `As we continue through 2024, staying adaptable and continuously learning will be more important than ever. The tools and technologies may change, but the fundamental principles of good software design remain constant. Focus on building accessible, performant, and maintainable applications that provide real value to users.`,

            }
        ] as BlogSection[],
    },
    relatedPosts: [
        {
            id: 2,
            title: 'Mastering Tailwind CSS: Advanced Techniques',
            excerpt: 'Learn advanced Tailwind patterns and optimization strategies.',
            image: '/blogimg/blog-6.jpg',
            category: 'Design'
        },
        {
            id: 3,
            title: 'Next.js 15: What\'s New and Improved',
            excerpt: 'Exploring the latest features in Next.js 15 release.',
            image: '/blogimg/blog-7.jpg',
            category: 'Framework'
        },
        {
            id: 4,
            title: 'Building Accessible Web Applications',
            excerpt: 'A comprehensive guide to web accessibility best practices.',
            image: '/blogimg/blog-8.jpg',
            category: 'Accessibility'
        }
    ]
}

export default async function BlogDetailPage({
    params
}: { params: { slug: string } }) {

    const { slug } = params
    if (!blogData) {
        notFound()
    }


    return (
        <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-subtitle)] transition-colors duration-300 ">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 ">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>
                </div>

                {/* Article Header */}
                <article className="max-w-4xl mx-auto">
                    {/* Category and Tags */}
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 text-sm font-medium bg-[var(--bg-section)] text-[var(--primary)] rounded-full">
                            {blogData.category}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {blogData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-xs bg-[var(--bg-card)] text-[var(--text-muted)] rounded-md border border-[var(--border-color)]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--text-title)]">
                        {blogData.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-[var(--text-muted)] mb-8 leading-relaxed">
                        {blogData.excerpt}
                    </p>

                    {/* Main Blog Image */}
                    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mb-12 rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">

                        <Image
                            src={blogData.content.mainImage}
                            alt={blogData.title}
                            fill
                            priority
                            className="object-cover"
                        />

                        {/* optional gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 to-transparent z-10 pointer-events-none" />

                    </div>


                    {/* Blog Content */}
                    <div className="prose prose-lg max-w-none space-y-10">
                        {blogData.content.sections.map((section, index) => {
                            switch (section.type) {
                                case "text":
                                    return (
                                        <div key={index} className="space-y-4">
                                            <p className="text-[var(--text-subtitle)] leading-8">
                                                {section.content}
                                            </p>

                                            {/* added supporting paragraph for length */}
                                            <p className="text-[var(--text-subtitle)] leading-8">
                                                {section.subContent}
                                            </p>
                                        </div>
                                    );


                                case "images":
                                    return (
                                        <div
                                            key={index}
                                            className="grid gap-6 grid-cols-1 md:grid-cols-2 my-6 md:my-10">
                                            {section.images.map((img, i) => (
                                                <figure key={i} className="space-y-3">
                                                    <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md">
                                                        <Image
                                                            src={img.src}
                                                            alt={img.alt}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    {img.caption && (
                                                        <figcaption className="text-sm text-center text-[var(--text-muted)] italic">
                                                            {img.caption}
                                                        </figcaption>
                                                    )}
                                                </figure>
                                            ))}
                                        </div>
                                    );

                            }
                        })}

                    </div>

                    {/* Tags Section */}
                    <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
                        <h3 className="text-lg font-semibold mb-4 text-[var(--text-title)]">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {blogData.tags.map((tag) => (
                                <button
                                    key={tag}
                                    className="px-4 py-2 bg-[var(--bg-section)] hover:bg-[var(--primary)] text-[var(--text-subtitle)] hover:text-[var(--primary-text)] rounded-lg transition-all duration-200 border border-[var(--border-color)] hover:border-transparent"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <CommentSection/>

                </article>




                {/* Back to Top */}

            </main>
                <section>
                    <div className="custom-bg">
                        <CategoryPostsSection />
                    </div>
                    <div className="custom-bg">
                        <CategoryListSection />
                    </div>
                </section>
        </div>
    )
}
