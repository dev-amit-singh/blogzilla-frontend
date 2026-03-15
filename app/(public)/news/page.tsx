"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, ExternalLink, Newspaper } from "lucide-react";

// Replace this with your actual API URL and Key
const API_URL = "https://newsdata.io/api/1/latest?apikey=pub_4c87221a179248c3a1f91dd656ed99fb&country=in,us,gb,cn,de&language=en,hi&category=breaking,politics,top,sports,crime&timezone=asia/kolkata&prioritydomain=top&domainurl=nytimes.com,timesofindia.indiatimes.com,bbc.com,dw.com,aajtak.in";

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination States
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [pageHistory, setPageHistory] = useState<string[]>([]); // Keeps track of previous pages

  // Fetch News Function
  const fetchNews = async (pageToken?: string | null) => {
    try {
      setLoading(true);
      
     
      let fetchUrl = API_URL;
      if (pageToken) {
        fetchUrl += `&page=${pageToken}`;
      }

      const res = await axios.get(fetchUrl);
      
      // Update state with results
      if (res.data.status === "success") {
        setNews(res.data.results);
        setNextPageToken(res.data.nextPage || null);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchNews();
  }, []);

  // Pagination Handlers
  const handleNextPage = () => {
    if (nextPageToken) {
      const currentToken = pageHistory.length === 0 && !nextPageToken ? null : nextPageToken;
      
      setPageHistory((prev) => [...prev, nextPageToken]);
      fetchNews(nextPageToken);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (pageHistory.length > 0) {
      const newHistory = [...pageHistory];
      newHistory.pop(); // Remove current page
      const prevToken = newHistory.length > 0 ? newHistory[newHistory.length - 1] : null;
      
      setPageHistory(newHistory);
      fetchNews(prevToken);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Format Date (e.g., "2026-02-20 00:53:15" -> "Feb 20, 2026")
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
            <Newspaper className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Latest News</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Stay updated with top headlines across the globe.</p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 h-96 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <div 
                  key={article.article_id} 
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative w-full h-52 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {article.image_url ? (
                      <Image 
                        src={article.image_url} 
                        alt={article.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        unoptimized // Important for external API images
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Newspaper size={48} opacity={0.5} />
                      </div>
                    )}
                    {/* Category Badge */}
                    {article.category && article.category[0] && (
                      <span className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {article.category[0]}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    
                    {/* Source & Date */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {article.source_icon ? (
                          <Image src={article.source_icon} alt="source" width={20} height={20} className="rounded-full bg-white" unoptimized />
                        ) : (
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center"><Newspaper size={10} className="text-blue-600"/></div>
                        )}
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                          {article.source_name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Calendar size={12} />
                        {formatDate(article.pubDate)}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-4 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h2>

                    <div className="flex-1"></div>

                    {/* Read More Link */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Link 
                        href={article.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors w-fit"
                      >
                        Read Full Article <ExternalLink size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-10">
              <button 
                onClick={handlePrevPage}
                disabled={pageHistory.length === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  pageHistory.length === 0 
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed" 
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <ChevronLeft size={20} /> Previous
              </button>

              <button 
                onClick={handleNextPage}
                disabled={!nextPageToken}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  !nextPageToken 
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 text-white shadow-md shadow-blue-500/30 hover:bg-blue-700 hover:shadow-lg"
                }`}
              >
                Next Page <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}