import { useState } from 'react';
import api from '../config/axiosConfig';
import toast from 'react-hot-toast';

export const useCareer = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all careers
  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/get-careers');

      if (response.data.status === 200) {
        setCareers(response.data.careers);
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch career opportunities. Please try again later.';
      setError(errorMessage);
      console.error('Error fetching careers:', err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create a new career opportunity
  const createCareer = async (formData) => {
    try {
      setLoading(true);

      // Validation
      if (!formData.title.trim()) {
        const msg = 'Title is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.type.trim()) {
        const msg = 'Job type is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.vacancies || formData.vacancies < 1) {
        const msg = 'At least 1 vacancy is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.categories || formData.categories.length === 0) {
        const msg = 'At least one category is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.experience.trim()) {
        const msg = 'Experience level is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.gender.trim()) {
        const msg = 'Gender preference is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.location.trim()) {
        const msg = 'Location is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.details.trim()) {
        const msg = 'Job details are required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.applyLink.trim()) {
        const msg = 'Apply link is required';
        toast.error(msg);
        throw new Error(msg);
      }

      // Create FormData object for multipart/form-data
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('type', formData.type);
      submitData.append('vacancies', formData.vacancies.toString());
      submitData.append('experience', formData.experience);
      submitData.append('gender', formData.gender);
      submitData.append('location', formData.location);
      submitData.append('details', formData.details);
      submitData.append('applyLink', formData.applyLink);
      
      // Append categories as JSON string
      submitData.append('categories', JSON.stringify(formData.categories));

      // Only append image if it exists
      if (formData.image && formData.image instanceof File) {
        submitData.append('image', formData.image);
      }

      const response = await api.post('/api/add-career', submitData);

      if (response.data.status === 200 || response.data.status === 201) {
        toast.success('Career opportunity created successfully!');
        await fetchCareers();
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.data.message || 'Failed to create career opportunity';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Error creating career opportunity:', err);

      let errorMessage = 'Failed to create career opportunity. Please try again.';

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

  // Update an existing career opportunity
  const updateCareer = async (careerId, formData) => {
    try {
      setLoading(true);

      // Validation
      if (!formData.title.trim()) {
        const msg = 'Title is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.type.trim()) {
        const msg = 'Job type is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.vacancies || formData.vacancies < 1) {
        const msg = 'At least 1 vacancy is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.categories || formData.categories.length === 0) {
        const msg = 'At least one category is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.experience.trim()) {
        const msg = 'Experience level is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.gender.trim()) {
        const msg = 'Gender preference is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.location.trim()) {
        const msg = 'Location is required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.details.trim()) {
        const msg = 'Job details are required';
        toast.error(msg);
        throw new Error(msg);
      }
      if (!formData.applyLink.trim()) {
        const msg = 'Apply link is required';
        toast.error(msg);
        throw new Error(msg);
      }

      // Create FormData object for multipart/form-data
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('type', formData.type);
      submitData.append('vacancies', formData.vacancies.toString());
      submitData.append('experience', formData.experience);
      submitData.append('gender', formData.gender);
      submitData.append('location', formData.location);
      submitData.append('details', formData.details);
      submitData.append('applyLink', formData.applyLink);
      
      // Append categories as JSON string
      submitData.append('categories', JSON.stringify(formData.categories));

      // Only append image if it's a new file
      if (formData.image && formData.image instanceof File) {
        submitData.append('image', formData.image);
      }

      // Append a flag if we removed the image
      if (formData.removeImage) {
        submitData.append('removeImage', 'true');
      }

      const response = await api.put(`/api/update-career/${careerId}`, submitData);

      if (response.data.status === 200 || response.data.status === 201) {
        toast.success('Career opportunity updated successfully!');
        await fetchCareers();
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.data.message || 'Failed to update career opportunity';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Error updating career opportunity:', err);

      let errorMessage = 'Failed to update career opportunity. Please try again.';

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

  // Delete a career opportunity
  const deleteCareer = async (careerId) => {
    try {
      setLoading(true);

      const response = await api.delete(`/api/delete-career/${careerId}`);

      if (response.data.status === 200) {
        toast.success('Career opportunity deleted successfully!');
        await fetchCareers();
        return { success: true };
      } else {
        const errorMsg = response.data.message || 'Failed to delete career opportunity';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Error deleting career opportunity:', err);

      let errorMessage = 'Failed to delete career opportunity. Please try again.';

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

  // Get unique categories from all careers (for filtering)
  const getAllCategories = () => {
    const categoriesSet = new Set();
    careers.forEach(career => {
      if (career.categories && Array.isArray(career.categories)) {
        career.categories.forEach(category => {
          if (category) categoriesSet.add(category);
        });
      }
    });
    return Array.from(categoriesSet);
  };

  // Filter careers by category
  const filterByCategory = (category) => {
    if (!category) return careers;
    return careers.filter(career => 
      career.categories && career.categories.includes(category)
    );
  };

  return {
    // State
    careers,
    loading,
    error,
    setCareers,

    // Methods
    fetchCareers,
    createCareer,
    updateCareer,
    deleteCareer,
    formatDate,
    getAllCategories,
    filterByCategory
  };
};