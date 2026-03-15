"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAdminBlogs, toggleBlogStatus, deleteBlog } from "../services/blog.service";
import ToggleSwitch from "../components/ui/ToggleSwitch";
import { deleteUTFiles } from "@/app/actions/uploadthing";

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // --- NEW: Search & Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // fetch blogs
  const fetchBlogs = async () => {
    try {
      const data = await getAdminBlogs();
      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // count total images
  const countImages = (blog: any) => {
    let count = blog.mainimg ? 1 : 0;
    blog.paragraphs?.forEach((p: any) => {
      if (p.img1) count++;
      if (p.img2) count++;
    });
    return count;
  };

  // toggle active
  const handleToggle = async (id: string) => {
    try {
      setUpdatingId(id);
      await toggleBlogStatus(id);
      setBlogs((prev) =>
        prev.map((blog) =>
          blog._id === id ? { ...blog, isActive: !blog.isActive } : blog
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getKeyFromUrl = (url: string) => {
    if (!url) return null;
    return url.substring(url.lastIndexOf("/") + 1);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure? This will delete the blog AND all its images permanently."
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      // A. Find the specific blog in our state
      const blogToDelete = blogs.find((b) => b._id === id);

      if (blogToDelete) {
        const keysToDelete: string[] = [];

        // B. Collect Main Image Key
        const mainKey = getKeyFromUrl(blogToDelete.mainimg);
        if (mainKey) keysToDelete.push(mainKey);

        // C. Collect OG Image Key (if you use it)
        const ogKey = getKeyFromUrl(blogToDelete.ogImage);
        if (ogKey) keysToDelete.push(ogKey);

        // D. Collect Keys from Paragraphs
        if (blogToDelete.paragraphs) {
          blogToDelete.paragraphs.forEach((p: any) => {
            const k1 = getKeyFromUrl(p.img1);
            const k2 = getKeyFromUrl(p.img2);
            if (k1) keysToDelete.push(k1);
            if (k2) keysToDelete.push(k2);
          });
        }

        // E. Delete from UploadThing (Batch Delete)
        if (keysToDelete.length > 0) {
          console.info("Deleting images from cloud:", keysToDelete);
          await deleteUTFiles(keysToDelete);
        }
      }

      // F. Delete from Database
      await deleteBlog(id);

      // G. Remove from UI
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      alert("Blog and images deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  // 1. Get unique categories
  const uniqueCategories = Array.from(
    new Set(blogs.map((b) => b.cate).filter(Boolean))
  );

  // 2. Get unique subcategories based on selected category
  const uniqueSubCategories = Array.from(
    new Set(
      blogs
        .filter((b) => b.cate === selectedCategory)
        .map((b) => b.subCate)
        .filter(Boolean)
    )
  );

  // 3. Filter blogs for rendering
  const filteredBlogs = blogs.filter((blog) => {
    // Search by Title or ID
    const matchesSearch =
      searchQuery === "" ||
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog._id?.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by Category
    const matchesCategory =
      selectedCategory === "" || blog.cate === selectedCategory;

    // Filter by Subcategory
    const matchesSubCategory =
      selectedSubCategory === "" || blog.subCate === selectedSubCategory;

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  if (loading)
    return <div className="p-6 text-gray-500">Loading blogs...</div>;

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>

        <Link
          href="/admin/blog/create"
          className="
            bg-blue-600 hover:bg-blue-700
            text-white
            px-4 py-2
            rounded-lg
            shadow
            transition
          "
        >
          + Create Blog
        </Link>
      </div>

      {/* --- NEW: Search & Filter Controls --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Title or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition-colors"
        />

        {/* Category Dropdown */}
        <select value={selectedCategory} onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubCategory(""); // Reset subcategory when category changes
          }}
          className="md:w-48 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 bg-white"
        >
        <option value="">All Categories</option>
        {uniqueCategories.map((cate: any) => (
          <option key={cate} value={cate}>
            {cate}
          </option>
        ))}
      </select>

      {/* Subcategory Dropdown */}
      <select
        value={selectedSubCategory}
        onChange={(e) => setSelectedSubCategory(e.target.value)}
        disabled={!selectedCategory}
        className="md:w-48 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 bg-white disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
      >
        <option value="">All Subcategories</option>
        {uniqueSubCategories.map((subCate: any) => (
          <option key={subCate} value={subCate}>
            {subCate}
          </option>
        ))}
      </select>
    </div>

      {/* Desktop Table */ }
  <div
    className="
        hidden lg:block
        overflow-x-auto
        border
        rounded-xl
        shadow-sm
      "
  >
    <table className="w-full">
      <thead className="bg-gray-100 text-gray-600 text-sm">
        <tr>
          <th className="p-4 text-left">Blog</th>
          <th className="p-4 text-left">Category</th>
          <th className="p-4 text-left">Slug</th>
          <th className="p-4 text-center">Images</th>
          <th className="p-4 text-center">Status</th>
          <th className="p-4 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {/* USE filteredBlogs HERE instead of blogs */}
        {filteredBlogs.length === 0 ? (
          <tr>
            <td colSpan={6} className="p-8 text-center text-gray-500">
              No blogs found.
            </td>
          </tr>
        ) : (
          filteredBlogs.map((blog) => (
            <tr
              key={blog._id}
              className="
                  border-t
                  hover:bg-gray-50
                  transition
                "
            >
              {/* Blog Info */}
              <td className="p-4">
                <div className="flex gap-3 items-center">
                  <Image
                    src={blog.mainimg}
                    alt="blog"
                    width={60}
                    height={60}
                    className="
                        rounded-lg
                        object-cover
                        w-14 h-14
                        border
                        shadow-sm
                      "
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {blog.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {blog.subTitle}
                    </div>
                    <div className="text-xs text-gray-400">
                      ID: {blog._id}
                    </div>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="p-4">
                <div className="text-gray-800">{blog.cate}</div>
                <div className="text-sm text-gray-500">{blog.subCate}</div>
              </td>

              {/* Slug */}
              <td className="p-4 text-sm text-gray-600">{blog.slug}</td>

              {/* Images */}
              <td className="p-4 text-center">{countImages(blog)}</td>

              {/* Toggle */}
              <td className="p-4 text-center">
                <ToggleSwitch
                  enabled={blog.isActive}
                  loading={updatingId === blog._id}
                  onChange={() => handleToggle(blog._id)}
                />
              </td>

              {/* Actions */}
              <td className="p-4 text-center">
                <div className="flex justify-center gap-2">
                  <Link
                    href={`/admin/blog/${blog._id}`}
                    className="px-3 py-1.5 text-xs font-medium bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/blog/${blog._id}/edit`}
                    className="px-3 py-1.5 text-xs font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={deletingId === blog._id}
                    className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {deletingId === blog._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */ }
  <div className="lg:hidden space-y-4">
    {/* USE filteredBlogs HERE instead of blogs */}
    {filteredBlogs.length === 0 ? (
      <div className="p-8 text-center border rounded-xl text-gray-500">
        No blogs found.
      </div>
    ) : (
      filteredBlogs.map((blog) => (
        <div key={blog._id} className=" border rounded-xl p-4 shadow-sm">
          <Image
            src={blog.mainimg}
            alt="blog"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full h-40 mb-3"
          />

          <div className="font-semibold">{blog.title}</div>

          <div className="text-sm text-gray-500">{blog.subTitle}</div>

          <div className="text-sm mt-1">
            {blog.cate} • {blog.subCate}
          </div>

          <div className="text-xs text-gray-400">{blog.slug}</div>

          <div className="text-sm mt-1">Images: {countImages(blog)}</div>

          <div className="flex items-center justify-between mt-3">
            <ToggleSwitch
              enabled={blog.isActive}
              loading={updatingId === blog._id}
              onChange={() => handleToggle(blog._id)}
            />

            <div className="flex gap-2">
              <Link
                href={`/admin/blog/${blog._id}`}
                className="text-emerald-600 font-medium"
              >
                View
              </Link>

              <Link
                href={`/admin/blog/${blog._id}/edit`}
                className="text-blue-600 font-medium"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(blog._id)}
                disabled={deletingId === blog._id}
                className="text-red-600 font-medium disabled:opacity-50"
              >
                {deletingId === blog._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
    </div >
  );
}