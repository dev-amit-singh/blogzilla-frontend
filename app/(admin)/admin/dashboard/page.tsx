import { 
  Users, 
  Eye, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Clock,
  BarChart3,
  Globe,
  Smartphone,
  Laptop,
  Share2,
  Heart,
  MessageSquare
} from 'lucide-react';

// Types
interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface TrafficSource {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface TopPost {
  id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  growth: number;
}

interface DeviceData {
  device: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardInsights() {
  // Mock data - Replace with real API data
  const statCards: StatCard[] = [
    {
      title: "Total Views",
      value: "45.2K",
      change: 12.5,
      icon: <Eye className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      title: "Total Visitors",
      value: "23.8K",
      change: 8.3,
      icon: <Users className="w-5 h-5" />,
      color: "bg-green-500"
    },
    {
      title: "Published Posts",
      value: 156,
      change: -2.1,
      icon: <FileText className="w-5 h-5" />,
      color: "bg-purple-500"
    },
    {
      title: "Avg. Read Time",
      value: "4:32",
      change: 5.7,
      icon: <Clock className="w-5 h-5" />,
      color: "bg-amber-500"
    }
  ];

  const trafficSources: TrafficSource[] = [
    { name: "Organic Search", value: 15420, percentage: 42, color: "bg-blue-500" },
    { name: "Social Media", value: 8920, percentage: 24, color: "bg-green-500" },
    { name: "Direct", value: 6720, percentage: 18, color: "bg-purple-500" },
    { name: "Referral", value: 4380, percentage: 12, color: "bg-amber-500" },
    { name: "Email", value: 2150, percentage: 6, color: "bg-pink-500" }
  ];

  const topPosts: TopPost[] = [
    { id: 1, title: "Getting Started with Next.js 14", views: 12540, likes: 842, comments: 156, growth: 25 },
    { id: 2, title: "Advanced Tailwind CSS Techniques", views: 9820, likes: 721, comments: 98, growth: 18 },
    { id: 3, title: "React Server Components Explained", views: 8450, likes: 654, comments: 112, growth: -5 },
    { id: 4, title: "Building Modern Dashboards", views: 7320, likes: 512, comments: 87, growth: 32 }
  ];

  const deviceData: DeviceData[] = [
    { device: "Mobile", percentage: 58, icon: <Smartphone className="w-4 h-4" />, color: "bg-blue-500" },
    { device: "Desktop", percentage: 36, icon: <Laptop className="w-4 h-4" />, color: "bg-green-500" },
    { device: "Tablet", percentage: 6, icon: <Smartphone className="w-4 h-4" />, color: "bg-purple-500" }
  ];

  const recentActivity = [
    { time: "10:30 AM", action: "New post published", user: "John Doe" },
    { time: "09:15 AM", action: "Comment on 'React Guide'", user: "Sarah Smith" },
    { time: "Yesterday", action: "Traffic spike detected", user: "System" },
    { time: "2 days ago", action: "Post updated", user: "Alex Johnson" }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Insights</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your blog.</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>Last 30 days</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <div className={stat.color.replace('bg-', 'text-')}>
                  {stat.icon}
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change >= 0 ? '+' : ''}{stat.change}% from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <div className="lg:col-span-2 space-y-6">
          {/* Traffic Sources Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Traffic Sources</h2>
              <Globe className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{source.name}</span>
                    <span className="text-gray-600">{source.value.toLocaleString()} ({source.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${source.color}`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Posts */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Top Performing Posts</h2>
              <BarChart3 className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {topPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${post.growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {post.growth >= 0 ? '+' : ''}{post.growth}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Device Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Device Distribution</h2>
            <div className="space-y-4">
              {deviceData.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${device.color} bg-opacity-10 mr-3`}>
                      <div className={device.color.replace('bg-', 'text-')}>
                        {device.icon}
                      </div>
                    </div>
                    <span className="font-medium text-gray-700">{device.device}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{device.percentage}%</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Most used device:</span>
                <span className="font-semibold text-gray-900">Mobile (58%)</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{activity.user}</span>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Engagement Rate</span>
                <span className="font-semibold">4.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bounce Rate</span>
                <span className="font-semibold">32%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Avg. Shares</span>
                <span className="font-semibold">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span>New Subscribers</span>
                <span className="font-semibold">284</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-white text-blue-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-colors">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Engagement Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Shares", value: "1.2K", icon: <Share2 className="w-5 h-5" />, change: 15 },
            { label: "Comments", value: "846", icon: <MessageSquare className="w-5 h-5" />, change: 8 },
            { label: "Likes", value: "4.5K", icon: <Heart className="w-5 h-5" />, change: 22 },
            { label: "Read Ratio", value: "68%", icon: <FileText className="w-5 h-5" />, change: 5 }
          ].map((metric, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  {metric.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{metric.change}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};