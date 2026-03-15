"use client";

import { useState } from "react";

// Types for our comment structure
type Comment = {
    id: string;
    name: string;
    text: string;
    date: string;
    time: string;
};

export default function CommentSection() {
    // Dummy comments for preview
    const [comments, setComments] = useState<Comment[]>([
        {
            id: "1",
            name: "John Doe",
            text: "This is a fantastic article! Next.js 15 really brings a lot to the table.",
            date: "15/12/2024",
            time: "14:30",
        }
    ]);

    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !text.trim()) return;

        const now = new Date();
        const newComment: Comment = {
            id: Date.now().toString(),
            name: name,
            text: text,
            date: now.toLocaleDateString("en-GB"), // DD/MM/YYYY format
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // HH:MM format
        };

        // Naya comment list ke top par add karein
        setComments([newComment, ...comments]);
        
        // Form clear karein
        setName("");
        setText("");
    };

    return (
        <div className="mt-16 pt-10 border-t border-[var(--border-color)]">
            <h3 className="text-2xl font-bold mb-8 text-[var(--text-title)]">
                Comments ({comments.length})
            </h3>

            {/* COMMENT FORM */}
            <form onSubmit={handleSubmit} className="mb-12 bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-subtitle)] mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-lg bg-[var(--bg-section)] border border-[var(--border-color)] text-[var(--text-title)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-[var(--text-subtitle)] mb-2">
                        Comment
                    </label>
                    <textarea
                        id="comment"
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your thoughts here..."
                        className="w-full px-4 py-3 rounded-lg bg-[var(--bg-section)] border border-[var(--border-color)] text-[var(--text-title)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors resize-none"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                    Post Comment
                </button>
            </form>

            {/* COMMENTS LIST */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="p-5 rounded-xl bg-[var(--bg-section)] border border-[var(--border-color)]">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-[var(--text-title)]">{comment.name}</h4>
                            <div className="text-xs text-[var(--text-muted)] flex gap-2">
                                <span>{comment.date}</span>
                                <span>•</span>
                                <span>{comment.time}</span>
                            </div>
                        </div>
                        <p className="text-[var(--text-subtitle)] leading-relaxed">
                            {comment.text}
                        </p>
                    </div>
                ))}
                
                {comments.length === 0 && (
                    <p className="text-[var(--text-muted)] italic text-center py-6">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                )}
            </div>
        </div>
    );
}