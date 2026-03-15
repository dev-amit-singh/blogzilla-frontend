"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Folder, FileText, Hash, Layers } from "lucide-react";

interface CategoryTree {
  _id: string; // The Category Name
  subCategories: string[];
  totalBlogs: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryTree[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Use your env variable
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the new endpoint we created
        const res = await axios.get(`${API}/api/admin/blogs/categories`);
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading Categories...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50">
      
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Layers className="text-blue-600" />
          Category Overview
        </h1>
        <p className="text-gray-500 mt-2">
          View all active categories and their sub-topics based on your blog posts.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-50 to-white p-5 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Folder size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-800 capitalize">
                  {cat._id}
                </h2>
              </div>
              <div className="text-xs font-semibold bg-white border px-2 py-1 rounded-full text-gray-500 flex items-center gap-1">
                <FileText size={12} />
                {cat.totalBlogs} Posts
              </div>
            </div>

            {/* Sub Categories List */}
            <div className="p-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                <Hash size={12} /> Sub-Categories
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {cat.subCategories.length > 0 ? (
                  cat.subCategories.map((sub, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-default"
                    >
                      {sub}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400 italic">No sub-categories</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-400">
            No categories found. Create some blogs to populate this list.
          </div>
        )}

      </div>
    </div>
  );
}