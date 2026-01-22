import { useBlogs } from '../../Hooks/useBlogs';
import { BsCalendarDate } from "react-icons/bs";

export default function BlogModal({ isOpen, onClose, blog }) {
  const { formatDate } = useBlogs();

  if (!isOpen || !blog) return null;

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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      {/* Close on background click */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-h-[95vh] sm:max-h-[90vh] max-w-2xl lg:max-w-4xl overflow-hidden flex flex-col">
        {/* Header - Fixed */}
        <div className="shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-4 truncate">
            {blog.title}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Featured Image */}
            {blog.image && (
              <div className="mb-6 sm:mb-8 rounded-lg overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 sm:h-56 lg:h-80 object-cover"
                />
              </div>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <BsCalendarDate />

                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>{blog.readTime} min read</span>
              </div>
            </div>

            {/* Expertise Tags */}
            {blog.expertiseIDs && blog.expertiseIDs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {blog.expertiseIDs.map((expertiseId, index) => (
                  <span
                    key={index}
                    className="inline-block bg-linear-to-r from-green-50 to-green-100 text-primary border border-indigo-200 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full"
                  >
                    {expertiseMap[expertiseId] || `Expertise ${expertiseId}`}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-6 sm:my-8"></div>

            {/* Blog Content - Safely render HTML */}
            <div
              className="prose prose-sm sm:prose-base max-w-none
                [&_h1]:text-2xl sm:[&_h1]:text-3xl lg:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-4 sm:[&_h1]:mb-6 [&_h1]:mt-6 sm:[&_h1]:mt-8 [&_h1]:text-gray-900
                [&_h2]:text-xl sm:[&_h2]:text-2xl lg:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-3 sm:[&_h2]:mb-4 [&_h2]:mt-6 sm:[&_h2]:mt-8 [&_h2]:text-gray-900
                [&_h3]:text-lg sm:[&_h3]:text-xl lg:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:mt-4 sm:[&_h3]:mt-6 [&_h3]:text-gray-900
                [&_h4]:text-base sm:[&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:text-gray-900
                [&_h5]:text-sm sm:[&_h5]:text-base [&_h5]:font-bold [&_h5]:mb-2 [&_h5]:mt-3 [&_h5]:text-gray-900
                [&_h6]:text-xs sm:[&_h6]:text-sm [&_h6]:font-bold [&_h6]:mb-2 [&_h6]:mt-3 [&_h6]:text-gray-800
                [&_p]:text-gray-700 [&_p]:mb-3 sm:[&_p]:mb-4 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ul]:ml-2 sm:[&_ul]:ml-4 [&_ul]:text-gray-700
                [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_ol]:ml-2 sm:[&_ol]:ml-4 [&_ol]:text-gray-700
                [&_li]:mb-1 sm:[&_li]:mb-2 [&_li]:text-gray-700
                [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4 [&_blockquote]:bg-gray-50 [&_blockquote]:py-2 sm:[&_blockquote]:py-3 [&_blockquote]:rounded
                [&_a]:text-indigo-600 [&_a]:hover:text-indigo-700 [&_a]:underline [&_a]:transition-colors
                [&_code]:bg-gray-100 [&_code]:px-1.5 sm:[&_code]:px-2 [&_code]:py-0.5 sm:[&_code]:py-1 [&_code]:rounded [&_code]:text-red-600 [&_code]:text-xs sm:[&_code]:text-sm [&_code]:font-mono
                [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-3 sm:[&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4
                [&_pre_code]:text-gray-100 [&_pre_code]:text-xs sm:[&_pre_code]:text-sm [&_pre_code]:font-mono
                [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4 [&_table]:text-sm
                [&_th]:bg-gray-100 [&_th]:px-2 sm:[&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-900
                [&_td]:border [&_td]:border-gray-300 [&_td]:px-2 sm:[&_td]:px-4 [&_td]:py-2 [&_td]:text-gray-700
                [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4 sm:[&_img]:my-6
                [&_hr]:border-gray-300 [&_hr]:my-6 sm:[&_hr]:my-8
                [&_strong]:font-bold [&_strong]:text-gray-900
                [&_em]:italic [&_em]:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="shrink-0 bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-linear-to-r from-primary to-secondary text-white font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-200 text-sm sm:text-base hover:scale-105 active:scale-95 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
