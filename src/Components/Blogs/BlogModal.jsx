import { useBlogs } from '../../Hooks/useBlogs';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Blog Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
          <div className="p-8">
            {/* Featured Image */}
            {blog.image && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1 4.5 4.5 0 11-4.814 6.98z" />
                </svg>
                <span>{formatDate(blog.createdAt)}</span>
              </span>
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>{blog.readTime} min read</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            {/* Expertise Tags */}
            {blog.expertiseIDs && blog.expertiseIDs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.expertiseIDs.map((expertiseId, index) => (
                  <span
                    key={index}
                    className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {expertiseMap[expertiseId] || `Expertise ${expertiseId}`}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Blog Content - Safely render HTML */}
            <div
              className="prose prose-lg max-w-none
                [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8
                [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-8
                [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:mt-6
                [&_h4]:text-xl [&_h4]:font-bold [&_h4]:mb-2 [&_h4]:mt-4
                [&_h5]:text-lg [&_h5]:font-bold [&_h5]:mb-2 [&_h5]:mt-4
                [&_h6]:text-base [&_h6]:font-bold [&_h6]:mb-2 [&_h6]:mt-4
                [&_p]:text-gray-700 [&_p]:mb-4 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ul]:ml-4
                [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_ol]:ml-4
                [&_li]:mb-2 [&_li]:text-gray-700
                [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4
                [&_a]:text-indigo-600 [&_a]:hover:text-indigo-700 [&_a]:underline [&_a]:transition-colors
                [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-red-600 [&_code]:text-sm
                [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4
                [&_pre_code]:text-gray-100 [&_pre_code]:text-sm
                [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4
                [&_th]:bg-gray-200 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold
                [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2
                [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-6
                [&_hr]:border-gray-300 [&_hr]:my-8
                [&_strong]:font-bold
                [&_em]:italic"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
