import { useState, useEffect } from 'react';
import { useCareers } from '../../Hooks/useCareers';
import AddCareerModal from './AddCareerModal';
import EditCareerModal from './EditCareerModal';
// import CareerModal from './CareerModal';
import Swal from 'sweetalert2';
import { stripHtmlTags } from '../../utils/stripHtmlTags';

export default function Careers() {
  const {
    careers,
    loading,
    error,
    fetchCareers,
    deleteCareer,
    formatDate,
    getAllCategories,
    filterByCategory
  } = useCareers();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get all unique categories
  const categories = getAllCategories();
  
  // Filter careers based on selected category
  const filteredCareers = selectedCategory 
    ? filterByCategory(selectedCategory)
    : careers;

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleCareerAdded = () => {
    fetchCareers();
  };

  const handleCareerUpdated = () => {
    fetchCareers();
  };

  const handleEditClick = (career) => {
    setSelectedCareer(career);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (careerId) => {
    const result = await Swal.fire({
      title: 'Delete Career Opportunity?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      await deleteCareer(careerId);
    }
  };

  if (loading && !careers.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 text-lg">Loading career opportunities...</p>
        </div>
      </div>
    );
  }

  if (error && !careers.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => fetchCareers()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Career Opportunities
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Join our team and grow your career with exciting opportunities
            </p>
            <div className="mt-2 text-sm text-gray-500">
              {careers.length} open positions available
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-linear-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2 shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium">Add Career</span>
          </button>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                  selectedCategory === ''
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {selectedCategory && (
              <p className="text-gray-600">
                Showing {filteredCareers.length} position{filteredCareers.length !== 1 ? 's' : ''} in "{selectedCategory}"
              </p>
            )}
          </div>
        )}

        {/* Careers Grid */}
        {filteredCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {filteredCareers.map((career) => (
              <article 
                key={career.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Career Image */}
                <div className="h-48 bg-linear-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  {career.image ? (
                    <img 
                      src={career.image} 
                      alt={career.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white text-6xl">💼</div>
                  )}
                </div>

                {/* Career Content */}
                <div className="p-6 flex flex-col grow">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {career.type}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {career.experience}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {career.vacancies} vacancy{career.vacancies > 1 ? 'ies' : ''}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {career.title}
                  </h3>

                  <div className="mb-3">
                    <div className="flex items-center text-gray-600 mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{career.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Posted: {formatDate(career.createdAt)}</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {career.categories && career.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3 grow">
                    {stripHtmlTags(career.details)}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditClick(career)}
                        className="bg-linear-to-r from-blue-600 to-blue-400 text-white px-3 py-1 rounded-md text-sm font-medium cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      >
                        Edit
                      </button>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(career.id)}
                        className="bg-linear-to-r from-rose-600 to-rose-400 text-white px-3 py-1 rounded-md text-sm font-medium cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      >
                        Delete
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCareer(career);
                          setShowCareerModal(true);
                        }}
                        className="text-primary font-medium text-sm transition-colors duration-200 hover:text-primary-dark cursor-pointer"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {selectedCategory 
                ? `No career opportunities found in "${selectedCategory}"`
                : 'No career opportunities found'
              }
            </h3>
            <p className="text-gray-500">
              {selectedCategory 
                ? 'Try selecting a different category or check back later'
                : 'Check back later for new opportunities!'
              }
            </p>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory('')}
                className="mt-4 text-primary hover:text-primary-dark cursor-pointer"
              >
                ← Back to all categories
              </button>
            )}
          </div>
        )}

        {/* Add Career Modal */}
        <AddCareerModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onCareerAdded={handleCareerAdded}
          loading={loading}
        />

        {/* Edit Career Modal */}
        <EditCareerModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCareer(null);
          }}
          onCareerUpdated={handleCareerUpdated}
          career={selectedCareer}
          loading={loading}
        />

        {/* Career Detail Modal */}
        {/* <CareerModal
          isOpen={showCareerModal}
          onClose={() => {
            setShowCareerModal(false);
            setSelectedCareer(null);
          }}
          career={selectedCareer}
        /> */}
      </div>
    </div>
  );
}