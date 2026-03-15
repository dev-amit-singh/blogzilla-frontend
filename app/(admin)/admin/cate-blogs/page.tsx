"use client";
import { useState, useEffect } from "react";
import axios from "axios";

// 1. Define the interface for selections
interface SelectionState {
  col1: string;
  col2: string;
  col3: string;
}

export default function AdminSettings() {
  const [categories, setCategories] = useState<any[]>([]);
  
  // 2. State ko type dein
  const [selections, setSelections] = useState<SelectionState>({ 
    col1: "", 
    col2: "", 
    col3: "" 
  });

  useEffect(() => {
    // Categories fetch karein
    axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/blogs/categories`).then(res => setCategories(res.data));
    
    // Saved settings fetch karein
    axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/layout/home-footer`).then(res => {
      if(res.data) {
        setSelections({ 
          col1: res.data.col1 || "", 
          col2: res.data.col2 || "", 
          col3: res.data.col3 || "" 
        });
      }
    });
  }, []);

  const handleSave = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/layout/update`, selections);
      alert("Public UI Updated!");
    } catch (err) {
      alert("Error saving settings");
    }
  };

  return (
    <div className="p-10 bg-white rounded-lg shadow-md max-w-2xl mx-auto text-black">
      <h1 className="text-xl font-bold mb-5">Configure Home Page Sections</h1>
      
      {(["col1", "col2", "col3"] as const).map((col, idx) => (
        <div key={col} className="mb-4">
          <label className="block text-sm font-bold mb-2 uppercase">
            Column {idx + 1} Category
          </label>
          <select 
            value={selections[col]} // Ab yahan error nahi aayega
            onChange={(e) => setSelections({ ...selections, [col]: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c._id} ({c.totalBlogs} Blogs)
              </option>
            ))}
          </select>
        </div>
      ))}

      <button 
        onClick={handleSave} 
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded transition"
      >
        Update Public UI
      </button>
    </div>
  );
}