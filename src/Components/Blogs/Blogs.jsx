import { useState, useEffect } from 'react';
import { useBlogs } from '../../Hooks/useBlogs';
import AddBlogModal from './AddBlogModal';
import EditBlogModal from './EditBlogModal';
import BlogModal from './BlogModal';

export default function Blogs() {
  const {
    blogs,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage,
    fetchBlogs,
    deleteBlog,
    formatDate
  } = useBlogs();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Helper function to strip HTML tags and get plain text
  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/&lt;/g, '<')   // Decode HTML entities
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleBlogAdded = () => {
    fetchBlogs(currentPage);
  };

  const handleBlogUpdated = () => {
    fetchBlogs(currentPage);
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(blogId);
    }
  };

  if (loading && !blogs.length) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error && !blogs.length) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => fetchBlogs(currentPage)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Blog Posts
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Discover insights, stories, and knowledge from our experts
            </p>
            <div className="mt-2 text-sm text-gray-500">
              {totalItems} posts across {totalPages} pages
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-linear-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2 shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium">Create Blog</span>
          </button>
        </div>

        {/* Blogs Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {blogs.map((blog) => (
              <article 
                key={blog.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Blog Image */}
                <div className="h-48 bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                  {blog.image ? (
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white text-6xl">📝</div>
                  )}
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {blog.readTime} min read
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {stripHtmlTags(blog.content)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditClick(blog)}
                        className="bg-linear-to-r from-blue-600 to-blue-400 text-white px-3 py-1 rounded-md text-sm font-medium cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      >
                        Edit
                      </button>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(blog.id)}
                        className="bg-linear-to-r from-rose-600 to-rose-400 text-white px-3 py-1 rounded-md text-sm font-medium cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      >
                        Delete
                      </button>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedBlog(blog);
                        setShowBlogModal(true);
                      }}
                      className="text-primary font-medium text-sm transition-colors duration-200 hover:text-primary-dark cursor-pointer"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No blogs found</h3>
            <p className="text-gray-500">Check back later for new content!</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              ← Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Next →
            </button>
          </div>
        )}

        {/* Add Blog Modal */}
        <AddBlogModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onBlogAdded={handleBlogAdded}
        />

        {/* Edit Blog Modal */}
        <EditBlogModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedBlog(null);
          }}
          onBlogUpdated={handleBlogUpdated}
          blog={selectedBlog}
        />

        {/* Blog Detail Modal */}
        <BlogModal
          isOpen={showBlogModal}
          onClose={() => {
            setShowBlogModal(false);
            setSelectedBlog(null);
          }}
          blog={selectedBlog}
        />
      </div>
    </div>
  );
}