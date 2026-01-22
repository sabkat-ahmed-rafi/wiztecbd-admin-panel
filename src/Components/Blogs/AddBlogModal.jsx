import { useState } from 'react';
import { useBlogs } from '../../Hooks/useBlogs';
import MultiSelect from '../../utils/MultiSelect';
import RichTextEditor from '../../utils/RichTextEditor';

export default function AddBlogModal({ isOpen, onClose, onBlogAdded, loading }) {
  const { createBlog } = useBlogs();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    readTime: 5,
    expertiseIDs: [],
    image: null
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

  const [imagePreview, setImagePreview] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createBlog(formData);

    if (result.success) {
      
      setFormData({
        title: '',
        content: '',
        readTime: 5,
        expertiseIDs: [],
        image: null
      });
      setImagePreview(null);

      if (onBlogAdded) {
        onBlogAdded();
      }
      
      onClose();
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        content: '',
        readTime: 5,
        expertiseIDs: [],
        image: null
      });
      setImagePreview(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Create New Blog</h2>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-primary disabled:opacity-50"
                placeholder="Enter an engaging title for your blog..."
                required
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg  focus:outline-primary disabled:opacity-50"
                placeholder="5"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={loading}
                      className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-gray-400">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <label className="cursor-pointer">
                        <span className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary disabled:opacity-50">
                          Choose Image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          disabled={loading}
                          className="hidden"
                        />
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        PNG, JPG
                      </p>
                    </div>
                  </div>
                )}
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
                  Creating...
                </>
              ) : (
                'Create Blog'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}