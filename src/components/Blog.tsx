import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const featuredPost = {
    title: 'The Future of Automated Dispute Management: AI Takes the Lead',
    excerpt:
      'Discover how artificial intelligence is revolutionizing the way businesses handle payment disputes and chargebacks.',
    category: 'Industry Insights',
    date: 'Nov 8, 2025',
    readTime: '8 min read',
    author: 'Sarah Johnson',
    image: 'Featured',
  };

  const blogPosts = [
    {
      title: '5 Common Reasons for Payment Disputes and How to Prevent Them',
      excerpt:
        'Learn the most frequent causes of payment disputes and proactive strategies to minimize them.',
      category: 'Best Practices',
      date: 'Nov 5, 2025',
      readTime: '6 min read',
      author: 'Michael Chen',
    },
    {
      title: 'How to Win More Chargebacks: Expert Tips from Industry Leaders',
      excerpt:
        'Increase your chargeback win rate with these proven strategies and evidence gathering techniques.',
      category: 'Guides',
      date: 'Nov 1, 2025',
      readTime: '10 min read',
      author: 'Emily Rodriguez',
    },
    {
      title: 'Understanding PCI-DSS Compliance for Dispute Management',
      excerpt:
        'A comprehensive guide to maintaining security standards while managing payment disputes.',
      category: 'Compliance',
      date: 'Oct 28, 2025',
      readTime: '7 min read',
      author: 'David Kim',
    },
    {
      title: 'Case Study: How TechCo Recovered $50K in Disputed Transactions',
      excerpt:
        'Real-world success story of a SaaS company that transformed their dispute process with automation.',
      category: 'Case Studies',
      date: 'Oct 25, 2025',
      readTime: '5 min read',
      author: 'Sarah Johnson',
    },
    {
      title: 'The Hidden Cost of Manual Dispute Management',
      excerpt:
        'Calculate how much your business is actually losing by handling disputes manually.',
      category: 'Business',
      date: 'Oct 20, 2025',
      readTime: '6 min read',
      author: 'Michael Chen',
    },
    {
      title: 'Stripe vs PayPal: Which is Better for Dispute Management?',
      excerpt:
        'A detailed comparison of dispute handling processes across major payment processors.',
      category: 'Comparisons',
      date: 'Oct 15, 2025',
      readTime: '9 min read',
      author: 'Emily Rodriguez',
    },
  ];

  const categories = [
    'All Posts',
    'Industry Insights',
    'Best Practices',
    'Guides',
    'Case Studies',
    'Compliance',
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const filteredPosts = blogPosts.filter(
    (post) =>
      (selectedCategory === 'All Posts' || post.category === selectedCategory) &&
      (searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0A0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Insights &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Resources
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Expert advice, industry insights, and practical guides to help you master dispute
            management
          </p>
        </div>

        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
            <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
              <div className="flex flex-col justify-center">
                <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4 w-fit">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all">
                  Read Article
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-6xl font-bold min-h-64">
                {featuredPost.image}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-900 to-cyan-900 flex items-center justify-center text-gray-700">
                <div className="text-4xl">📝</div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-gray-800 text-gray-400 text-xs font-semibold rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No articles found matching your search.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 border border-gray-800">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}
