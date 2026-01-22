import { useState, useEffect } from 'react';
import { useBlogs } from '../../Hooks/useBlogs';
import MultiSelect from '../../utils/MultiSelect';
import RichTextEditor from '../../utils/RichTextEditor';
import ImageUpload from '../../utils/ImageUpload';
import toast from 'react-hot-toast';

export default function EditBlogModal({ isOpen, onClose, onBlogUpdated, blog, loading }) {
  const { updateBlog } = useBlogs();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    readTime: 5,
    expertiseIDs: [],
    image: null,
    currentImage: null
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
        currentImage: blog.image
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
      image: file
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
        currentImage: null
      });
      onClose();
    }
  };

  if (!isOpen || !blog) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Blog</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg  focus:outline-none focus:border-primary disabled:opacity-50"
                placeholder="Enter an engaging title for your blog..."
              />
            </div>

            {/* Content Input */}
            <div>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                label="Blog Content *"
                minHeight="300px"
              />
            </div>

            {/* Read Time Input */}
            <div>
              <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Read Time (minutes) *
              </label>
              <input
                type="number"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                disabled={loading}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary disabled:opacity-50"
                placeholder="5"
              />
            </div>

            {/* Image Upload */}
            <ImageUpload
              value={formData.image}
              onChange={handleImageChange}
              onRemove={handleImageRemove}
              label="Blog Image"
              disabled={loading}
              currentImage={blog.image}
              showCurrentImageNote={true}
            />

            {/* Expertise Selection */}
            <MultiSelect
              options={availableExpertises}
              selectedValues={formData.expertiseIDs}
              onChange={handleExpertiseChange}
              placeholder="Select expertises..."
              label="Select Expertises (Optional)"
              disabled={loading}
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 duration-200 disabled:opacity-50 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary duration-200 disabled:opacity-50 flex items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Update Blog'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}