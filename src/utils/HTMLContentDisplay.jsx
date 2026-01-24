const HTMLContentDisplay = ({ content, className = '' }) => {
  return (
    <div
      className={`prose prose-sm sm:prose-base max-w-none
        [&_h1]:text-2xl sm:[&_h1]:text-3xl lg:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-4 sm:[&_h1]:mb-6 [&_h1]:mt-6 sm:[&_h1]:mt-8 [&_h1]:text-gray-900
        [&_h2]:text-xl sm:[&_h2]:text-2xl lg:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-3 sm:[&_h2]:mb-4 [&_h2]:mt-6 sm:[&_h2]:mt-8 [&_h2]:text-gray-900
        [&_h3]:text-lg sm:[&_h3]:text-xl lg:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:mt-4 sm:[&_h3]:mt-6 [&_h3]:text-gray-900
        [&_h4]:text-base sm:[&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:text-gray-900
        [&_h5]:text-sm sm:[&_h5]:text-base [&_h5]:font-bold [&_h5]:mb-2 [&_h5]:mt-3 [&_h5]:text-gray-900
        [&_h6]:text-xs sm:[&_h6]:text-sm [&_h6]:font-bold [&_h6]:mb-2 [&_h6]:mt-3 [&_h6]:text-gray-800
        [&_p]:text-gray-700 [&_p]:mb-3 sm:[&_p]:mb-4 [&_p]:leading-relaxed
        [&_ul]:list-disc [&_ul]:mb-4 [&_ul]:ml-2 sm:[&_ul]:ml-4 [&_ul]:text-gray-700
        [&_ol]:list-decimal [&_ol]:mb-4 [&_ol]:ml-2 sm:[&_ol]:ml-4 [&_ol]:text-gray-700
        [&_li]:mb-1 sm:[&_li]:mb-2 [&_li]:text-gray-700 [&_li]:leading-tight
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
        [&_em]:italic [&_em]:text-gray-700 ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HTMLContentDisplay;