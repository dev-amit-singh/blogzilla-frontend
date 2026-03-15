"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Save, Phone, MapPin, Share2, Search } from "lucide-react";

export default function ContactSettingsPage() {
    const API = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:5000";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isNewRecord, setIsNewRecord] = useState(false);

    // Flat state for easy form handling
    const [form, setForm] = useState({
        title: "",
        description: "",
        para: "",
        number1: "",
        number2: "",
        address: "",
        insta: "",
        facebook: "",
        other: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "", // We will handle this as a comma-separated string in the UI
        canonicalUrl: "",
        ogImage: "",
        schemaMarkup: "",
    });

    // 1. Fetch Existing Data on Load
    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get(`${API}/api/admin/contact`, {withCredentials: true});
                if (res.status === 401) {
                    window.location.href = "/admin/login";
                }
                const data = res.data.data || res.data; // Adjust based on your API response wrapper

                // Extract social links securely from your Mongoose array structure
                const instaObj = data.sociallinks.insta;
                const fbObj = data.sociallinks.facebook;
                const otherObj = data.sociallinks.other;

                // Populate Form
                setForm({
                    title: data.title || "",
                    description: data.description || "",
                    para: data.para || "",
                    number1: data.number1 || "",
                    number2: data.number2 || "",
                    address: data.address || "",
                    insta: instaObj || "",
                    facebook: fbObj || "",
                    other: otherObj || "",
                    metaTitle: data.seo?.metaTitle || "",
                    metaDescription: data.seo?.metaDescription || "",
                    keywords: data.seo?.keywords ? data.seo.keywords.join(", ") : "",
                    canonicalUrl: data.seo?.canonicalUrl || "",
                    ogImage: data.seo?.ogImage || "",
                    schemaMarkup: data.seo?.schemaMarkup || "",
                });

                setIsNewRecord(false);
            } catch (error: any) {
                if (error.response?.status === 404) {
                    // No contact data found. That's fine, we will create it on save.
                    setIsNewRecord(true);
                } else {
                    console.error("Failed to load contact data:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [API]);

    // Handle Form Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 2. Submit Logic (Create or Update)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Structure the payload exactly as your Mongoose schema expects
            const payload = {
                title: form.title,
                description: form.description,
                para: form.para,
                number1: Number(form.number1), // Convert to Number
                number2: form.number2 ? Number(form.number2) : undefined,
                address: form.address,
                sociallinks: {
                     insta: form.insta ,
                     facebook: form.facebook ,
                     other: form.other ,
                    },
                seo: {
                    metaTitle: form.metaTitle,
                    metaDescription: form.metaDescription,
                    keywords: form.keywords.split(",").map((k) => k.trim()).filter((k) => k), // String to Array
                    canonicalUrl: form.canonicalUrl,
                    ogImage: form.ogImage,
                    schemaMarkup: form.schemaMarkup,
                },
            };

            if (isNewRecord) {
                await axios.post(`${API}/api/admin/contact`, payload, {withCredentials: true});
                alert("Contact details created successfully!");
                setIsNewRecord(false);
            } else {
                await axios.put(`${API}/api/admin/contact`, payload, {withCredentials: true}); // Uses your singleton PUT route
                alert("Contact details updated successfully!");
            }
        } catch (error) {
            console.error("Error saving contact:", error);
            alert("Failed to save contact details.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-gray-500 animate-pulse">Loading Contact Details...</div>;
    }

    return (
        <div className="p-6 md:p-10 min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Contact Page Settings</h1>
                    <p className="text-gray-500 mt-1">Manage the details displayed on your public contact page.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* 1. Basic Information */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-blue-500" /> Basic Details
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                                <input name="title" value={form.title} onChange={handleChange} required className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Get in Touch" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                <input name="description" value={form.description} onChange={handleChange} required className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Main Paragraph</label>
                                <textarea name="para" value={form.para} onChange={handleChange} required className="w-full border px-4 py-2 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                            </div>
                        </div>
                    </div>

                    {/* 2. Contact Information */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-green-500" /> Contact Info
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Number</label>
                                <input type="number" name="number1" value={form.number1} onChange={handleChange} required className="w-full border px-4 py-2 rounded-lg outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Number (Optional)</label>
                                <input type="number" name="number2" value={form.number2} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</label>
                            <textarea name="address" value={form.address} onChange={handleChange} required className="w-full border px-4 py-2 rounded-lg h-20 outline-none resize-none" />
                        </div>
                    </div>

                    {/* 3. Social Links */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            <Share2 className="w-5 h-5 text-purple-500" /> Social Links
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                                <input name="insta" value={form.insta} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                                <input name="facebook" value={form.facebook} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Other Link (Twitter/LinkedIn)</label>
                                <input name="other" value={form.other} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* 4. SEO Settings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            <Search className="w-5 h-5 text-orange-500" /> SEO Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                                <input name="metaTitle" value={form.metaTitle} onChange={handleChange} maxLength={60} className="w-full border px-4 py-2 rounded-lg outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (Comma Separated)</label>
                                <input name="keywords" value={form.keywords} onChange={handleChange} placeholder="contact, support, help" className="w-full border px-4 py-2 rounded-lg outline-none" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                            <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} maxLength={160} className="w-full border px-4 py-2 rounded-lg h-20 outline-none resize-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                                <input name="canonicalUrl" value={form.canonicalUrl} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
                                <input name="ogImage" value={form.ogImage} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Schema Markup (JSON-LD)</label>
                            <textarea name="schemaMarkup" value={form.schemaMarkup} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg h-24 font-mono text-sm outline-none resize-none" placeholder="{ '@context': 'https://schema.org', ... }" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pb-10">
                        <button
                            type="submit"
                            disabled={saving}
                            className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all active:scale-95 ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {saving ? "Saving..." : <><Save size={20} /> Save Changes</>}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}