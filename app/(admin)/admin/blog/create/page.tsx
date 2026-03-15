"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Adjust these paths if needed
import { createBlog } from "../../services/blog.service";
import ImageUpload from "../../components/ImageUpload";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react"; // Optional icons for better UI

interface Paragraph {
  img1: string;
  img2: string;
  smallpara: string;
  mediumpara: string;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    cate: "",
    subCate: "",
    title: "",
    subTitle: "",
    mainimg: "",
    desc: "",
    tags: "",
    published: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    author: "",
  });

  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    {
      img1: "",
      img2: "",
      smallpara: "",
      mediumpara: "",
    },
  ]);

  // Handle Text Inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Paragraph Changes (Text)
  const handleParagraphChange = (
    index: number,
    field: keyof Paragraph,
    value: string
  ) => {
    const updated = [...paragraphs];
    updated[index][field] = value;
    setParagraphs(updated);
  };

  // Add New Paragraph Block
  const addParagraph = () => {
    setParagraphs([
      ...paragraphs,
      {
        img1: "",
        img2: "",
        smallpara: "",
        mediumpara: "",
      },
    ]);
  };

  // Remove Paragraph Block
  const removeParagraph = (index: number) => {
    const updated = paragraphs.filter((_, i) => i !== index);
    setParagraphs(updated);
  };

  // Submit Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.desc || !form.mainimg) {
      alert("Please fill in the required fields (Title, Description, Main Image)");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        // Convert tags string to array
        tags: form.tags.split(",").map((tag) => tag.trim()).filter((t) => t),
        paragraphs,
      };

      await createBlog(payload);

      alert("Blog created successfully!");
      router.push("/admin/blog");
    } catch (error) {
      console.error(error);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create New Blog</h1>
            <p className="text-gray-500 mt-1">Fill in the details to publish a new post.</p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} /> Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Section 1: Main Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Main Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  name="cate"
                  placeholder="e.g. Technology"
                  value={form.cate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Sub Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                <input
                  name="subCate"
                  placeholder="e.g. Web Development"
                  value={form.subCate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
                <input
                  name="title"
                  placeholder="Enter a catchy title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Title</label>
                <input
                  name="subTitle"
                  placeholder="Optional subtitle"
                  value={form.subTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Main Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <div className="max-w-md">
                <ImageUpload
                  value={form.mainimg}
                  onChange={(url) => setForm({ ...form, mainimg: url })}
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="desc"
                placeholder="Write a brief summary..."
                value={form.desc}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                required
              />
            </div>

            {/* Tags & Publish Toggle */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  name="tags"
                  placeholder="React, Next.js, Tutorial (comma separated)"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 mt-6 md:mt-0">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) =>
                    setForm({ ...form, published: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Publish Immediately
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Paragraphs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Content Blocks</h2>
              <button
                type="button"
                onClick={addParagraph}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus size={16} /> Add Block
              </button>
            </div>

            <div className="space-y-8">
              {paragraphs.map((para, index) => (
                <div key={index} className="bg-gray-50/50 p-6 rounded-xl border border-gray-200 relative group">

                  {/* Remove Button */}
                  {paragraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Remove this block"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}

                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Block #{index + 1}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Paragraph Image 1 */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Image Left</label>
                      <ImageUpload
                        value={para.img1}
                        onChange={(url) => handleParagraphChange(index, "img1", url)}
                      />
                    </div>
                    {/* Paragraph Image 2 */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Image Right</label>
                      <ImageUpload
                        value={para.img2}
                        onChange={(url) => handleParagraphChange(index, "img2", url)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Small Text</label>
                      <textarea
                        placeholder="Introduction text..."
                        value={para.smallpara}
                        onChange={(e) => handleParagraphChange(index, "smallpara", e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Main Text</label>
                      <textarea
                        placeholder="Detailed explanation..."
                        value={para.mediumpara}
                        onChange={(e) => handleParagraphChange(index, "mediumpara", e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {paragraphs.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                No content blocks added yet. Click "Add Block" to start.
              </div>
            )}
          </div>

          {/* Section 3: SEO Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
              SEO Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  name="metaTitle"
                  placeholder="SEO title for Google"
                  value={form.metaTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Keywords
                </label>
                <input
                  name="metaKeywords"
                  placeholder="keyword1, keyword2, keyword3"
                  value={form.metaKeywords}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

            </div>

            {/* Meta Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                placeholder="Short description for Google search results"
                value={form.metaDescription}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* Canonical URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Canonical URL
                </label>
                <input
                  name="canonicalUrl"
                  placeholder="https://example.com/blog/post"
                  value={form.canonicalUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  name="author"
                  placeholder="Author name"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
              </div>
            </div>

            {/* OG Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Open Graph Image
              </label>

              <ImageUpload
                value={form.ogImage}
                onChange={(url) => setForm({ ...form, ogImage: url })}
              />
            </div>
          </div>


          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all transform active:scale-95
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {loading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save size={20} /> Publish Blog
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}