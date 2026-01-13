export default function Blogs() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Blogs</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Here you can manage your blog posts. Create, edit, and delete posts to keep your content fresh and engaging.
      </p>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Posts</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center p-2 border-b border-gray-200">
            <span className="text-gray-600">Introduction to React</span>
            <span className="text-sm text-gray-400">June 1, 2023</span>
          </li>
          <li className="flex justify-between items-center p-2 border-b border-gray-200">
            <span className="text-gray-600">Getting Started with Tailwind CSS</span>
            <span className="text-sm text-gray-400">May 28, 2023</span>
          </li>
          <li className="flex justify-between items-center p-2 border-b border-gray-200">
            <span className="text-gray-600">Advanced JavaScript Techniques</span>
            <span className="text-sm text-gray-400">May 20, 2023</span>
          </li>
        </ul>
      </div>
    </div>
  );
}