"use client";

import { useState } from "react";
// FIX: Ensure this path matches exactly where you saved the previous file
import ImageUpload from "../components/ImageUpload";

export default function BlogForm() {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
    });

    

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Create New Blog</h2>
            {/* IMAGE UPLOAD COMPONENT */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                <ImageUpload
                    value={formData.image}
                    onChange={(url: string) => {
                        setFormData({
                            ...formData,
                            image: url,
                        })
                    }}
                />
            </div>

           
        </div>
    );
}