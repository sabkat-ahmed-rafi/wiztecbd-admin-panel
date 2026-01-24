import { useBlogs } from '../../Hooks/useBlogs';
import { BsCalendarDate } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import { useEffect } from 'react';
import HTMLContentDisplay from '../../utils/HTMLContentDisplay';

export default function BlogModal({ isOpen, onClose, blog }) {
  const { formatDate } = useBlogs();

  // Map expertise IDs to names
  const expertiseMap = {
    1: 'Web Development',
    2: 'Mobile Development',
    3: 'Data Science',
    4: 'Machine Learning',
    5: 'DevOps',
    6: 'UI/UX Design',
    7: 'Cloud Computing',
    8: 'Cybersecurity'
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);
  
  if (!isOpen || !blog) return null;

  return (
    <div className="fixed inset-0 bg-linear-to-br from-gray-900/70 to-black/70 backdrop-blur-xl flex items-center justify-center z-50">
      {/* Close on background click */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white shadow-2xl w-full max-w-full max-h-full h-full overflow-hidden flex flex-col">
        {/* Gradient Header */}
        <div className="shrink-0 bg-linear-to-r from-primary via-primary/90 to-secondary p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
                <FaBlog className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="md:text-2xl text-lg font-bold text-white truncate max-w-md">Blog Details</h2>
                <p className="text-white/80 text-sm mt-1 truncate max-w-md">{blog.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Featured Image */}
            {blog.image && (
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                />
              </div>
            )}

            <h1 className='text-2xl font-bold'>{blog.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                <BsCalendarDate className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                <MdAccessTime className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">{blog.readTime} min read</span>
              </div>
            </div>

            {/* Expertise Tags */}
            {blog.expertiseIDs && blog.expertiseIDs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.expertiseIDs.map((expertiseId, index) => (
                  <span
                    key={index}
                    className="inline-block bg-linear-to-r from-primary/20 to-secondary/20 text-primary border border-indigo-200 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    {expertiseMap[expertiseId] || `Expertise ${expertiseId}`}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Blog Content - Safely render HTML */}
            <HTMLContentDisplay content={blog.content} />
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 left-0 right-0 bg-linear-to-r from-white via-white to-gray-50 border-t border-gray-200 px-6 py-4 shadow-lg z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-primary to-secondary rounded-lg">
                <BsCalendarDate className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Published on {formatDate(blog.createdAt)}</p>
                <p className="text-xs text-gray-500">
                  Blog ID: #{blog.id} • {blog.readTime} min read
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-linear-to-r text-xs md:text-base from-gray-100 to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg hover:shadow-gray-400/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 cursor-pointer min-w-25"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}