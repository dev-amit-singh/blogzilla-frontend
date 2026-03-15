"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateBlog } from "../../../services/blog.service";  // ✅ Import update service
import axios from "axios";
import ImageUpload from "../../../components/ImageUpload";  // Adjust path
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";

interface Paragraph {
  img1: string;
  img2: string;
  smallpara: string;
  mediumpara: string;
}

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams(); // ✅ Get ID from URL
  const API = process.env.NEXT_PUBLIC_BACK_URL || "";

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // State for initial data load

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
    { img1: "", img2: "", smallpara: "", mediumpara: "" },
  ]);

  // ✅ 1. Fetch Existing Data
  useEffect(() => {
    if (!id) return;

    const fetchBlogData = async () => {
      try {
        setFetching(true);
        // Using the ID-based route we created earlier
        const res = await axios.get(`${API}/api/admin/blogs/${id}`);
        const data = res.data;

        // Populate Form
        setForm({
          cate: data.cate || "",
          subCate: data.subCate || "",
          title: data.title || "",
          subTitle: data.subTitle || "",
          mainimg: data.mainimg || "",
          desc: data.desc || "",
          tags: data.tags ? data.tags.join(", ") : "", // Convert array back to string
          published: data.published,
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          metaKeywords: data.metaKeywords || "",
          canonicalUrl: data.canonicalUrl || "",
          ogTitle: data.ogTitle || "",
          ogDescription: data.ogDescription || "",
          ogImage: data.ogImage || "",
          author: data.author || "",
        });

        // Populate Paragraphs
        if (data.paragraphs && data.paragraphs.length > 0) {
          setParagraphs(data.paragraphs);
        }

      } catch (error) {
        console.error("Failed to fetch blog", error);
        alert("Error loading blog details");
        router.back();
      } finally {
        setFetching(false);
      }
    };

    fetchBlogData();
  }, [id, API, router]);


  // Handle Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Paragraphs
  const handleParagraphChange = (index: number, field: keyof Paragraph, value: string) => {
    const updated = [...paragraphs];
    updated[index][field] = value;
    setParagraphs(updated);
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, { img1: "", img2: "", smallpara: "", mediumpara: "" }]);
  };

  const removeParagraph = (index: number) => {
    const updated = paragraphs.filter((_, i) => i !== index);
    setParagraphs(updated);
  };

  // ✅ 2. Handle Update (Submit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.desc) {
      alert("Please fill in required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()).filter((t) => t),
        paragraphs,
      };

      // Call Update Service (PUT request)
      // Ensure 'updateBlog' service accepts (id, payload)
      await updateBlog(id as string, payload);

      alert("Blog updated successfully!");
      router.push("/admin/blog");
    } catch (error) {
      console.error(error);
      alert("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading Skeleton
  if (fetching) {
    return <div className="p-10 text-center text-gray-500">Loading Blog Details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Blog</h1>
            <p className="text-gray-500 mt-1">Update the details of your post.</p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} /> Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Main Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Main Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input name="cate" value={form.cate} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                <input name="subCate" value={form.subCate} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
                <input name="title" value={form.title} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Title</label>
                <input name="subTitle" value={form.subTitle} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <div className="max-w-md">
                <ImageUpload value={form.mainimg} onChange={(url) => setForm({ ...form, mainimg: url })} />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="desc" value={form.desc} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg h-32" required />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input name="tags" value={form.tags} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              </div>
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 mt-6 md:mt-0">
                <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-5 h-5" />
                <label htmlFor="published" className="text-sm font-medium text-gray-700 cursor-pointer">Published</label>
              </div>
            </div>
          </div>

          {/* Paragraphs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Content Blocks</h2>
              <button type="button" onClick={addParagraph} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">
                <Plus size={16} /> Add Block
              </button>
            </div>
            <div className="space-y-8">
              {paragraphs.map((para, index) => (
                <div key={index} className="bg-gray-50/50 p-6 rounded-xl border border-gray-200 relative">
                  {paragraphs.length > 1 && (
                    <button type="button" onClick={() => removeParagraph(index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                      <Trash2 size={20} />
                    </button>
                  )}
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Block #{index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Image Left</label>
                      <ImageUpload value={para.img1} onChange={(url) => handleParagraphChange(index, "img1", url)} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Image Right</label>
                      <ImageUpload value={para.img2} onChange={(url) => handleParagraphChange(index, "img2", url)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <textarea placeholder="Small text" value={para.smallpara} onChange={(e) => handleParagraphChange(index, "smallpara", e.target.value)} className="w-full border px-4 py-2 rounded-lg h-24" />
                    <textarea placeholder="Main text" value={para.mediumpara} onChange={(e) => handleParagraphChange(index, "mediumpara", e.target.value)} className="w-full border px-4 py-2 rounded-lg h-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Settings (Same as create) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">SEO Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input name="metaTitle" value={form.metaTitle} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                <input name="metaKeywords" value={form.metaKeywords} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg h-24" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Image</label>
              <ImageUpload value={form.ogImage} onChange={(url) => setForm({ ...form, ogImage: url })} />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all active:scale-95 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Updating..." : <><Save size={20} /> Update Blog</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}