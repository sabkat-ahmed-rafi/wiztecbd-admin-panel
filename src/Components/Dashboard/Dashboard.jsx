export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
      <p className="text-gray-600 leading-relaxed">
        Welcome to the admin dashboard. Here you can manage your content, view analytics, and control your website's settings.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-2xl font-bold text-indigo-600">1,234</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Total Posts</h3>
          <p className="text-2xl font-bold text-indigo-600">567</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Active Sessions</h3>
          <p className="text-2xl font-bold text-indigo-600">89</p>
        </div>
      </div>
    </div>
  );
}