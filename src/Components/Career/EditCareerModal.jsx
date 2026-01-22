import { useState, useEffect } from 'react';
import { useCareers } from '../../Hooks/useCareers';
import MultiSelect from '../../utils/MultiSelect';
import RichTextEditor from '../../utils/RichTextEditor';
import ImageUpload from '../../utils/ImageUpload';
import CustomSelect from '../../utils/CustomSelect';
import { MdWork, MdGroup, MdLocationOn, MdLink } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function EditCareerModal({ isOpen, onClose, onCareerUpdated, career, loading }) {
  const { updateCareer } = useCareers();

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
    image: null,
    currentImage: null,
    removeImage: false
  });

  const [availableJobTypes] = useState([
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Temporary', label: 'Temporary' }
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
    { value: 'Both', label: 'Both Gender' },
    { value: 'Male', label: 'Male Only' },
    { value: 'Female', label: 'Female Only' }
  ]);

  const [availableCategories] = useState([
    { id: 'engineering', name: 'Engineering' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'finance', name: 'Finance' },
    { id: 'hr', name: 'Human Resources' },
    { id: 'it', name: 'IT & Support' },
    { id: 'product', name: 'Product Management' },
    { id: 'operations', name: 'Operations' },
    { id: 'customer-service', name: 'Customer Service' }
  ]);

  useEffect(() => {
    if (career) {
      setFormData({
        title: career.title || '',
        type: career.type || 'Full-time',
        vacancies: career.vacancies || 1,
        categories: career.categories || [],
        experience: career.experience || 'Entry Level',
        gender: career.gender || 'Any',
        location: career.location || '',
        details: career.details || '',
        applyLink: career.applyLink || '',
        image: null,
        currentImage: career.image,
        removeImage: false
      });
    }
  }, [career]);

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
    const result = await updateCareer(career.id, formData);
    if (result.success) {
      if (onCareerUpdated) {
        onCareerUpdated();
      }
      handleClose();
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
        image: null,
        currentImage: null,
        removeImage: false
      });
      onClose();
    }
  };

  if (!isOpen || !career) return null;

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
        {/* linear Header */}
        <div className="shrink-0 bg-linear-to-r from-primary via-primary/90 to-secondary p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
                <FaEdit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="md:text-2xl text-lg  font-bold text-white">Edit Career Opportunity</h2>
                <p className="text-white/80 text-sm mt-1 truncate max-w-md">Editing: {career.title}</p>
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
          <form onSubmit={handleSubmit} className="space-y-8 pb-24"> {/* Added padding-bottom for sticky footer */}
            {/* Title Section */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 uppercase tracking-wider">
                Position Details
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdWork className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 transition-all duration-200"
                  placeholder="e.g., Senior Frontend Developer"
                  required
                />
              </div>
            </div>

            {/* Grid Section - Job Type & Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  <span>Job Type</span>
                </label>
                <div className="rounded-xl">
                  <CustomSelect
                    options={availableJobTypes}
                    value={formData.type}
                    onChange={handleSelectChange('type')}
                    placeholder="Select job type..."
                    disabled={loading}
                    required
                    className="mb-0 border-0 bg-transparent"
                    showClearButton={false}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  <span>Experience Level</span>
                </label>
                <div className="rounded-xl">
                  <CustomSelect
                    options={availableExperiences}
                    value={formData.experience}
                    onChange={handleSelectChange('experience')}
                    placeholder="Select experience level..."
                    disabled={loading}
                    required
                    className="mb-0 border-0 bg-transparent"
                    showClearButton={false}
                  />
                </div>
              </div>
            </div>

            {/* Grid Section - Vacancies & Gender */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  <span>Vacancies</span>
                </label>
                <div className="rounded-xl">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdGroup className="w-5 h-5 text-primary" />
                    </div>
                    <input
                      type="number"
                      id="vacancies"
                      name="vacancies"
                      value={formData.vacancies}
                      onChange={handleInputChange}
                      disabled={loading}
                      min="1"
                      max="100"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-primary disabled:opacity-50"
                      placeholder="1"
                      required
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-600 font-medium">
                    Current: {career.vacancies} vacancy{career.vacancies > 1 ? 'ies' : ''}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  <span>Gender Preference</span>
                </label>
                <div className="rounded-xl">
                  <CustomSelect
                    options={availableGenders}
                    value={formData.gender}
                    onChange={handleSelectChange('gender')}
                    placeholder="Select gender preference..."
                    disabled={loading}
                    required
                    showClearButton={false}
                  />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Location Section */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                <span>Location</span>
              </label>
              <div className="rounded-xl">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdLocationOn className="w-5 h-5 text-primary" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-primary disabled:opacity-50"
                    placeholder="e.g., San Francisco, CA or Remote"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Application Link */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                <span>Application Link</span>
              </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdLink className="w-5 h-5 text-primary" />
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
            </div>

            {/* Categories Section */}
                <MultiSelect
                  label={"Job Categories"}
                  options={availableCategories}
                  selectedValues={formData.categories.map(cat => 
                    availableCategories.find(availCat => availCat.name === cat)?.id || cat
                  )}
                  onChange={handleCategoriesChange}
                  placeholder="Select job categories..."
                  disabled={loading}
                  className="border-0 bg-transparent"
                />

            {/* Job Description */}
            <div className="space-y-2">
              <div className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4">
                <RichTextEditor
                  value={formData.details}
                  onChange={(value) => setFormData(prev => ({ ...prev, details: value }))}
                  label={"Job Description"}
                  minHeight="400px"
                  placeholder="Enter detailed job description, responsibilities, requirements, and benefits..."
                  disabled={loading}
                  className="border-0"
                />
                <div className="mt-3 text-xs text-gray-600 font-medium bg-gray-100 inline-block px-3 py-1.5 rounded-full">
                  {formData.details?.replace(/<[^>]*>/g, '').length || 0} characters
                </div>
              </div>
            </div>

            {/* Image Upload Section */}           
                <ImageUpload
                  value={formData.image}
                  onChange={handleImageChange}
                  onRemove={handleImageRemove}
                  label="Job Image"
                  disabled={loading}
                  currentImage={career.image}
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
                <MdWork className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Career ID: #{career.id}</p>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(career.updatedAt || career.createdAt).toLocaleDateString('en-US', { 
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
                className="px-6 py-3 bg-linear-to-r text-xs md:text-base from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform  active:translate-y-0 disabled:opacity-50 flex items-center space-x-2 min-w-37.5 justify-center hover:-translate-y-0.5 hover:scale-105 cursor-pointer active:scale-95"
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
                    <span>Update Career</span>
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