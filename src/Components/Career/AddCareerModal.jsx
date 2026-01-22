import { useState } from 'react';
import { useCareers } from '../../Hooks/useCareers';
import MultiSelect from '../../utils/MultiSelect';
import RichTextEditor from '../../utils/RichTextEditor';
import ImageUpload from '../../utils/ImageUpload';
import CustomSelect from '../..//utils/CustomSelect'; 

export default function AddCareerModal({ isOpen, onClose, onCareerAdded, loading }) {
  const { createCareer } = useCareers();

  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-time',
    vacancies: 1,
    categories: [],
    experience: 'Entry Level',
    gender: 'Any',
    location: '',
    details: '',
    applyLink: '',
    image: null
  });

  const [availableJobTypes] = useState([
    { value: 'Full-time', label: 'Full-time', icon: '' },
    { value: 'Part-time', label: 'Part-time', icon: '' },
    { value: 'Contract', label: 'Contract', icon: '' },
    { value: 'Internship', label: 'Internship', icon: '' },
    { value: 'Remote', label: 'Remote', icon: '' },
    { value: 'Freelance', label: 'Freelance', icon: '' },
    { value: 'Temporary', label: 'Temporary', icon: '' }
  ]);

  const [availableExperiences] = useState([
    { value: 'Entry Level', label: 'Entry Level', description: '0-2 years experience' },
    { value: 'Junior', label: 'Junior', description: '1-3 years experience' },
    { value: 'Mid Level', label: 'Mid Level', description: '3-5 years experience' },
    { value: 'Senior', label: 'Senior', description: '5-8 years experience' },
    { value: 'Lead', label: 'Lead', description: '7-10 years experience' },
    { value: 'Manager', label: 'Manager', description: '8-12 years experience' },
    { value: 'Director', label: 'Director', description: '10-15 years experience' },
    { value: 'Executive', label: 'Executive', description: '15+ years experience' }
  ]);

  const [availableGenders] = useState([
    { value: 'Both', label: 'Both Gender', icon: '' },
    { value: 'Male', label: 'Male Only', icon: '' },
    { value: 'Female', label: 'Female Only', icon: '' }
  ]);

  const [availableCategories] = useState([
    { id: 'engineering', name: 'Engineering', icon: '' },
    { id: 'design', name: 'Design', icon: '' },
    { id: 'marketing', name: 'Marketing', icon: '' },
    { id: 'sales', name: 'Sales', icon: '' },
    { id: 'finance', name: 'Finance', icon: '' },
    { id: 'hr', name: 'Human Resources', icon: '' },
    { id: 'it', name: 'IT & Support', icon: '' },
    { id: 'product', name: 'Product Management', icon: '' },
    { id: 'operations', name: 'Operations', icon: '' },
    { id: 'customer-service', name: 'Customer Service', icon: '' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoriesChange = (selectedIds) => {
    const selectedCategories = selectedIds.map(id => 
      availableCategories.find(cat => cat.id === id)?.name || id
    );
    setFormData(prev => ({
      ...prev,
      categories: selectedCategories
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
      image: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createCareer(formData);

    if (result.success) {
      // Reset form
      setFormData({
        title: '',
        type: 'Full-time',
        vacancies: 1,
        categories: [],
        experience: 'Entry Level',
        gender: 'Any',
        location: '',
        details: '',
        applyLink: '',
        image: null
      });

      if (onCareerAdded) {
        onCareerAdded();
      }
      
      onClose();
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        type: 'Full-time',
        vacancies: 1,
        categories: [],
        experience: 'Entry Level',
        gender: 'Any',
        location: '',
        details: '',
        applyLink: '',
        image: null
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add New Career Opportunity</h2>
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
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-primary disabled:opacity-50"
                placeholder="e.g., Senior Frontend Developer"
                required
              />
            </div>

            {/* Job Type and Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <CustomSelect
                  options={availableJobTypes}
                  value={formData.type}
                  onChange={handleSelectChange('type')}
                  placeholder="Select job type..."
                  disabled={loading}
                  required
                  className="mb-0"
                  showClearButton={false}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level *
                </label>
                <CustomSelect
                  options={availableExperiences}
                  value={formData.experience}
                  onChange={handleSelectChange('experience')}
                  placeholder="Select experience level..."
                  disabled={loading}
                  required
                  className="mb-0"
                  showClearButton={false}
                />
              </div>
            </div>

            {/* Vacancies and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vacancies" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Vacancies *
                </label>
                <input
                  type="number"
                  id="vacancies"
                  name="vacancies"
                  value={formData.vacancies}
                  onChange={handleInputChange}
                  disabled={loading}
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-primary disabled:opacity-50"
                  placeholder="1"
                  required
                />
                <div className="mt-1 text-xs text-gray-500">
                  Enter number of open positions (1-100)
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender Preference *
                </label>
                <CustomSelect
                  options={availableGenders}
                  value={formData.gender}
                  onChange={handleSelectChange('gender')}
                  placeholder="Select gender preference..."
                  disabled={loading}
                  required
                  className="mb-0"
                  showClearButton={false}
                />
              </div>
            </div>

            {/* Location Input */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-primary disabled:opacity-50"
                placeholder="e.g., San Francisco, CA or Remote"
                required
              />
            </div>

            {/* Apply Link */}
            <div>
              <label htmlFor="applyLink" className="block text-sm font-medium text-gray-700 mb-2">
                Application Link *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input
                  type="url"
                  id="applyLink"
                  name="applyLink"
                  value={formData.applyLink}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-primary disabled:opacity-50"
                  placeholder="https://example.com/apply"
                  required
                />
              </div>
            </div>

            {/* Categories Selection */}
              <MultiSelect
                label={"Job Categories *"}
                options={availableCategories}
                selectedValues={formData.categories.map(cat => 
                  availableCategories.find(availCat => availCat.name === cat)?.id || cat
                )}
                onChange={handleCategoriesChange}
                placeholder="Select job categories..."
                disabled={loading}
                maxSelections={3}
              />

            {/* Job Details */}
            <div>
              <RichTextEditor
                value={formData.details}
                onChange={(value) => setFormData(prev => ({ ...prev, details: value }))}
                label="Job Description & Requirements *"
                minHeight="300px"
                placeholder="Enter detailed job description, responsibilities, requirements, and benefits..."
                disabled={loading}
              />
            </div>

            {/* Image Upload */}
            <ImageUpload
              value={formData.image}
              onChange={handleImageChange}
              onRemove={handleImageRemove}
              label="Job Image (Optional)"
              disabled={loading}
              description="Upload an image for this job posting (Max size: 5MB)"
            />
          </div>

          {/* Form Validation Summary */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-700">
                <span className="font-medium">All fields marked with * are required.</span>
                <p className="mt-1">Please ensure all required information is provided before submitting.</p>
              </div>
            </div>
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
              className="px-6 py-3 bg-linear-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 duration-200 disabled:opacity-50 flex items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
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
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Career Opportunity
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}