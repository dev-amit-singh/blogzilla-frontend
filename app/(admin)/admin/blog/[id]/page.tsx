"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, Edit, Tag, Layers, Globe } from "lucide-react";

// Define the shape of your blog data for TypeScript
interface BlogData {
  _id: string;
  title: string;
  subTitle?: string;
  excerpt?: string;
  cate?: string;
  cateSlug?: string;
  subCate?: string;
  subCateSlug?: string;
  mainimg: string;
  tags?: string[];
  published: boolean;
  createdAt: string;
  // Adjust this based on your actual DB structure (sections or paragraphs)
  sections?: { type: string; content: string }[];
  paragraphs?: { smallpara: string; mediumpara: string; img1?: string, img2?: string }[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  author?: string;
}

export default function AdminSingleBlog() {
  const { id } = useParams();
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_BACK_URL || ""; // Fallback to empty string to avoid crash

  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || id === "undefined") return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/admin/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, API]);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-96 bg-gray-200 rounded-xl mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <p className="text-red-500 font-medium mb-4">{error || "Blog not found"}</p>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  // --- DATE FORMATTER ---
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* 1. TOP HEADER / NAVIGATION */}
      <div className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Blogs</span>
        </button>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                ${blog.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
            `}>
            {blog.published ? "Published" : "Draft"}
          </span>
          <button
            onClick={() => router.push(`/admin/blog/${id}/edit`)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            <Edit className="w-4 h-4" /> Edit
          </button>
        </div>
      </div>

      {/* 2. MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER SECTION */}
        <div className="mb-8 p-5 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-3">
            <Layers className="w-4 h-4" />
            <span>{blog.cate}</span>
            {blog.subCate && (
              <>
                <span>/</span>
                <span>{blog.subCate}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>

          {blog.subTitle && (
            <h2 className="text-xl text-gray-500 font-medium mb-6">
              {blog.subTitle}
            </h2>
          )}

          <div className="flex items-center gap-6 text-sm text-gray-500 border-b pb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(blog.createdAt)}
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {blog.published ? "Public" : "Private"}
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="w-full mb-10 rounded-2xl overflow-hidden flex justify-center">
          {blog.mainimg ? (
            <Image
              src={blog.mainimg}
              alt={blog.title}
              width={0}
              height={0}
              sizes="100vw"
              className="w-[600px] h-auto object-cover rounded-2xl"
              priority
            />
          ) : (
            <div className="w-full h-[200px] md:h-[300px] bg-gray-200 flex items-center justify-center text-gray-400">
              No Cover Image
            </div>
          )}
        </div>


        {/* CONTENT SECTIONS */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">

          {/* Excerpt */}
          {blog.excerpt && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-10 rounded-r-lg italic text-gray-700 text-lg">
              {blog.excerpt}
            </div>
          )}

          {/* Dynamic Content Rendering */}
          <div className="space-y-8 text-gray-800 leading-relaxed text-lg">

            {/* 1. If you use generic 'sections' (from your current code) */}
            {blog.sections?.map((section, index) => (
              <div key={index}>
                {section.type === "text" && (
                  <p className="mb-4">{section.content}</p>
                )}
                {/* Add more types if needed (e.g., 'image', 'quote') */}
              </div>
            ))}

            {/* 2. If you use 'paragraphs' (from your create form) */}
            {blog.paragraphs?.map((para, index) => (
              <div key={index} className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {para.img1 && (
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-sm">
                      <Image src={para.img1} alt="Section Image 1" fill className="object-cover" />
                    </div>
                  )}
                  {para.img2 && (
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-sm">
                      <Image src={para.img2} alt="Section Image 2" fill className="object-cover" />
                    </div>
                  )}
                </div>
                {para.smallpara && (
                  <p className="font-semibold text-xl mb-4 text-gray-900">{para.smallpara}</p>
                )}
                {para.mediumpara && (
                  <p className="text-gray-600 whitespace-pre-line">{para.mediumpara}</p>
                )}
              </div>
            ))}
          </div>

          {/* TAGS FOOTER */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>

      {/* 3. SEO Info */}
      {(blog.metaTitle || blog.metaDescription) && (
        
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white shadow-sm rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">SEO Information</h3>

            {blog.metaTitle && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Meta Title:</span> {blog.metaTitle}
              </p>
            )}

            {blog.metaDescription && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Meta Description:</span> {blog.metaDescription}
              </p>
            )}

            {blog.metaKeywords && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Keywords:</span> {blog.metaKeywords}
              </p>
            )}
          </div>
          </div>
      )}

    </div>
  );
}