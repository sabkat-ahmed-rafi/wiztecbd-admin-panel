import { useState } from 'react';
import api from '../config/axiosConfig';
import toast from 'react-hot-toast';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch all blogs with pagination
  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/api/get-blogs?page=${page}&limit=20`);

      if (response.data.status === 200) {
        setBlogs(response.data.blogs);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setCurrentPage(response.data.pagination.currentPage);
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch blogs. Please try again later.';
      setError(errorMessage);
      console.error('Error fetching blogs:', err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create a new blog
  const createBlog = async (formData) => {
    try {
      setLoading(true);

      // Validation
      if (!formData.title.trim()) {
        const msg = 'Title is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.content.trim()) {
        const msg = 'Content is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (formData.readTime < 1) {
        const msg = 'Read time must be at least 1 minute';
        toast.error(msg);
        throw new Error(msg);
      }

      // Create FormData object for multipart/form-data
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('readTime', formData.readTime.toString());

      if (formData.expertiseIDs && formData.expertiseIDs.length > 0) {
        submitData.append('expertiseIDs', JSON.stringify(formData.expertiseIDs));
      }

      if (formData.image instanceof File) {
        submitData.append('image', formData.image);
      }

      const response = await api.post('/api/add-blog', submitData);

      if (response.data.status === 200 || response.data.status === 201) {
        toast.success('Blog created successfully!');
        await fetchBlogs(1);
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.data.message || 'Failed to create blog';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Error creating blog:', err);

      let errorMessage = 'Failed to create blog. Please try again.';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update an existing blog
  const updateBlog = async (blogId, formData) => {
    try {
      setLoading(true);

      // Validation
      if (!formData.title.trim()) {
        const msg = 'Title is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.content.trim()) {
        const msg = 'Content is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (formData.readTime < 1) {
        const msg = 'Read time must be at least 1 minute';
        toast.error(msg);
        throw new Error(msg);
      }

      // Create FormData object for multipart/form-data
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('readTime', formData.readTime);
      submitData.append('expertiseIDs', JSON.stringify(formData.expertiseIDs || []));

      // Only append image if it's a new file
      if (formData.image && formData.image instanceof File) {
        submitData.append('image', formData.image);
      }

      // Append a flag if we removed the image
      if (formData.removeImage) {
        submitData.append('removeImage', 'true');
      }

      const response = await api.put(`/api/update-blog/${blogId}`, submitData);

      if (response.data.status === 200 || response.data.status === 201) {
        toast.success('Blog updated successfully!');
        await fetchBlogs(currentPage);
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.data.message || 'Failed to update blog';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Error updating blog:', err);

      let errorMessage = 'Failed to update blog. Please try again.';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog
  const deleteBlog = async (blogId) => {
    try {
      setLoading(true);

      const response = await api.delete(`/api/delete-blog/${blogId}`);

      if (response.data.status === 200) {
        toast.success('Blog deleted successfully!');
        await fetchBlogs(currentPage);
        return { success: true };
      } else {
        const errorMsg = response.data.message || 'Failed to delete blog';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Error deleting blog:', err);

      let errorMessage = 'Failed to delete blog. Please try again.';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Format date utility
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return {
    // State
    blogs,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage,

    // Methods
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    formatDate
  };
};
