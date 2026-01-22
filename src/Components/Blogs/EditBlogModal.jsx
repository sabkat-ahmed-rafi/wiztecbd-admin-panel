import { useState, useEffect } from 'react';
import { useBlogs } from '../../Hooks/useBlogs';
import MultiSelect from '../../utils/MultiSelect';
import RichTextEditor from '../../utils/RichTextEditor';
import ImageUpload from '../../utils/ImageUpload';
import { MdTitle, MdAccessTime, MdEdit } from "react-icons/md";
import { FaBlog, FaEdit } from "react-icons/fa";

export default function EditBlogModal({ isOpen, onClose, onBlogUpdated, blog, loading }) {
  const { updateBlog } = useBlogs();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    readTime: 5,
    expertiseIDs: [],
    image: null,
    currentImage: null,
    removeImage: false
  });

  const [availableExpertises] = useState([
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Mobile Development' },
    { id: 3, name: 'Data Science' },
    { id: 4, name: 'Machine Learning' },
    { id: 5, name: 'DevOps' },
    { id: 6, name: 'UI/UX Design' },
    { id: 7, name: 'Cloud Computing' },
    { id: 8, name: 'Cybersecurity' }
  ]);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        readTime: blog.readTime || 5,
        expertiseIDs: blog.expertiseIDs || [],
        image: null,
        currentImage: blog.image,
        removeImage: false
      });
    }
  }, [blog]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExpertiseChange = (selectedIds) => {
    setFormData(prev => ({
      ...prev,
      expertiseIDs: selectedIds
    }));
  };

  const handleImageChange = (file) => {
    setFormData(prev => ({
      ...prev,
      image: file,
      removeImage: false
    }));
  };

  const handleImageRemove = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      currentImage: null,
      removeImage: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateBlog(blog.id, formData);
    
    if (result.success) {
      if (onBlogUpdated) {
        onBlogUpdated();
      }
      handleClose();
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        content: '',
        readTime: 5,
        expertiseIDs: [],
        image: null,
        currentImage: null,
        removeImage: false
      });
      onClose();
    }
  };

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
                <FaEdit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="md:text-2xl text-lg font-bold text-white">Edit Blog Post</h2>
                <p className="text-white/80 text-sm mt-1 truncate max-w-md">Editing: {blog.title}</p>
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
          <form onSubmit={handleSubmit} className="space-y-8 pb-24">
            {/* Title Section */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 uppercase tracking-wider">
                Blog Details
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdTitle className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 transition-all duration-200"
                  placeholder="Enter an engaging title for your blog..."
                  required
                />
              </div>
            </div>

            {/* Read Time Section */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 uppercase tracking-wider">
                Reading Information
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdAccessTime className="w-5 h-5 text-primary" />
                    </div>
                    <input
                      type="number"
                      id="readTime"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      disabled={loading}
                      min="1"
                      max="60"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-primary disabled:opacity-50"
                      placeholder="5"
                      required
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-600 font-medium">
                    Current: {blog.readTime} minute{blog.readTime > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Content Section */}
            <div className="space-y-2">
              <div className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4">
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  label={"Blog Content"}
                  minHeight="400px"
                  placeholder="Write your blog content here. You can format text, add images, embed videos, and more..."
                  disabled={loading}
                  className="border-0"
                />
                <div className="mt-3 text-xs text-gray-600 font-medium bg-gray-100 inline-block px-3 py-1.5 rounded-full">
                  {formData.content?.replace(/<[^>]*>/g, '').length || 0} characters
                </div>
              </div>
            </div>

            {/* Expertise Selection */}
            <MultiSelect
              options={availableExpertises}
              selectedValues={formData.expertiseIDs}
              onChange={handleExpertiseChange}
              placeholder="Select expertises..."
              label="Select Expertises"
              disabled={loading}
              className="border-0 bg-transparent"
            />

            {/* Image Upload Section */}
            <ImageUpload
              value={formData.image}
              onChange={handleImageChange}
              onRemove={handleImageRemove}
              label="Blog Image"
              disabled={loading}
              currentImage={blog.image}
              showCurrentImageNote={true}
              className="border-0"
            />
          </form>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 left-0 right-0 bg-linear-to-r from-white via-white to-gray-50 border-t border-gray-200 px-6 py-4 shadow-lg z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-primary to-secondary rounded-lg">
                <FaBlog className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Blog ID: #{blog.id}</p>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="px-6 py-3 bg-linear-to-r text-xs md:text-base from-gray-100 to-gray-200 text-gray-800 font-medium rounded-xl hover:shadow-lg hover:shadow-gray-400/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer min-w-25"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-linear-to-r text-xs md:text-base from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform active:translate-y-0 disabled:opacity-50 flex items-center space-x-2 min-w-37.5 justify-center hover:-translate-y-0.5 hover:scale-105 cursor-pointer active:scale-95"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Update Blog</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}