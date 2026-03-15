"use client";

import React, { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, Calendar, Loader2, AlertCircle, MessageSquare } from 'lucide-react';

// 1. Define the shape of your data based on your Mongoose Schema
interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const EnquiryAdmin = () => {
  // 2. Tell TypeScript exactly what this array will hold
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BACK_URL?.replace(/\/$/, '') || '';
  const API_URL = `${baseUrl}/api/admin/contact/enquiry`;

  // Fetch Data
  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch data from the server.");
      const data: Enquiry[] = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error("Fetch error:", err);
      
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this enquiry?")) return;
    
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item._id !== id));
      } else {
        throw new Error("Failed to delete the enquiry.");
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred while deleting.");
      }
    }
  };

  useEffect(() => { 
    fetchEnquiries(); 
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Section */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Inbox & Enquiries</h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              You have <span className="text-indigo-600 font-bold">{enquiries.length}</span> total messages
            </p>
          </div>
          <button 
            onClick={fetchEnquiries}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh Inbox"}
          </button>
        </header>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold">Connection Error</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !error ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-500" />
            <p className="font-medium animate-pulse">Loading latest enquiries...</p>
          </div>
        ) : (
          /* Enquiries List */
          <div className="grid gap-5">
            {enquiries.length === 0 && !error ? (
              <div className="flex flex-col items-center justify-center bg-white py-24 rounded-2xl border border-slate-200 shadow-sm text-center px-4">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                  <MessageSquare className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No enquiries yet</h3>
                <p className="text-slate-500 mt-1 max-w-sm">When users fill out your contact form, their messages will securely appear here.</p>
              </div>
            ) : (
              enquiries.map((item) => (
                <div 
                  key={item._id} 
                  className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden"
                >
                  {/* Decorative Side Strip */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                    
                    {/* Main Content */}
                    <div className="flex-1 space-y-4">
                      {/* Name & Date */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h2 className="text-xl font-bold text-slate-900">{item.name}</h2>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item.createdAt).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                      </div>
                      
                      {/* Contact Badges */}
                      <div className="flex flex-wrap gap-3">
                        <a href={`mailto:${item.email}`} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <Mail className="w-4 h-4" />
                          {item.email}
                        </a>
                        <a href={`tel:${item.phone}`} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <Phone className="w-4 h-4" />
                          {item.phone}
                        </a>
                      </div>

                      {/* Message Box */}
                      <div className="mt-4 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center md:items-start md:pt-1">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 w-full md:w-auto text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-100 hover:border-red-500 focus:ring-4 focus:ring-red-100"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="md:hidden">Delete</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryAdmin;