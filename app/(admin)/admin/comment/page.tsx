"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, MessageSquare, ExternalLink } from "lucide-react";

// API URL aapke backend ke hisaab se adjust kar lein
const API = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:5000";

// TypeScript Interface for Comment Data
interface Comment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
  blogId: {
    _id: string;
    title: string;
  } | null; // Null in case blog was deleted but comment remained
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch All Comments
  const fetchComments = async () => {
    try {
      setLoading(true);
      // Apne router setup ke hisaab se correct endpoint dalein
      const response = await axios.get(`${API}/api/admin/comment/all-comments`);
      
      if (response.data.success) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 2. Delete Comment Handler
  const handleDelete = async (id: string) => {
    // Confirmation dialog before deleting
    const isConfirmed = window.confirm("Are you sure you want to delete this comment? This action cannot be undone.");
    
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`${API}/api/admin/comment/delete/${id}`);
      
      if (response.data.success) {
        // Remove the deleted comment from the UI state instantly
        setComments((prevComments) => prevComments.filter((c) => c._id !== id));
        alert("Comment deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  // Helper function to format Date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <MessageSquare size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900">
              Manage Comments
            </h1>
            <p className="text-zinc-500  text-sm mt-1">
              View, moderate, and delete user comments across all blogs.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white  border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          
          {loading ? (
            /* Loading Skeleton */
            <div className="p-10 text-center">
              <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="h-8 w-8 border-4 border-zinc-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-zinc-500">Loading comments...</p>
              </div>
            </div>
          ) : comments.length === 0 ? (
            /* Empty State */
            <div className="p-16 text-center flex flex-col items-center">
              <MessageSquare size={48} className="text-zinc-300 mb-4" />
              <h3 className="text-lg font-medium text-zinc-900">No comments found</h3>
              <p className="text-zinc-500 mt-2">When users comment on your blogs, they will appear here.</p>
            </div>
          ) : (
            /* Data Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200">
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">User Info</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Comment</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Blog Title</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {comments.map((item) => (
                    <tr key={item._id} className="hover:bg-zinc-50 transition-colors">
                      
                      {/* Name Col */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-zinc-900">{item.name}</div>
                      </td>

                      {/* Comment Col */}
                      <td className="px-6 py-4">
                        <p className="text-zinc-600 text-sm line-clamp-2 max-w-xs">
                          {item.comment}
                        </p>
                      </td>

                      {/* Blog Title Col (Populated Data) */}
                      <td className="px-6 py-4">
                        {item.blogId ? (
                          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                            <span className="truncate max-w-[150px] block" title={item.blogId.title}>
                              {item.blogId.title}
                            </span>
                            <ExternalLink size={14} />
                          </div>
                        ) : (
                          <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-md">
                            Blog Deleted
                          </span>
                        )}
                      </td>

                      {/* Date Col */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                        {formatDate(item.createdAt)}
                      </td>

                      {/* Action Col */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                          title="Delete Comment"
                        >
                          <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}