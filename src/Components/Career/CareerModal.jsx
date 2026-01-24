import { useCareers } from '../../Hooks/useCareers';
import { BsCalendarDate } from "react-icons/bs";
import { FaMapMarkerAlt, FaUsers, FaUserTie, FaLink, FaGenderless } from "react-icons/fa";
import { MdWork, MdCategory } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useEffect } from 'react';
import HTMLContentDisplay from '../../utils/HTMLContentDisplay';

export default function CareerModal({ isOpen, onClose, career }) {
  const { formatDate } = useCareers();


  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);


  if (!isOpen || !career) return null;

  return (
    <div className="fixed inset-0 bg-linear-to-br from-gray-900/60 to-black/60 backdrop-blur-xl flex items-center justify-center z-50">
      {/* Close on background click */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white shadow-2xl w-full max-h-full h-full max-w-full overflow-hidden flex flex-col border border-gray-200">
        {/* linear Header */}
        <div className="shrink-0 bg-linear-to-r from-primary via-primary/90 to-secondary p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
                <MdWork className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h2 className="md:text-2xl text-lg  font-bold text-white pr-4">
                  {career.title}
                </h2>
                <p className="text-white/80 text-sm sm:text-base mt-1">Career Opportunity Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Featured Image with linear Overlay */}
            {career.image && (
              <div className="mb-8 sm:mb-10 rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent z-10"></div>
                <img
                  src={career.image}
                  alt={career.title}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full">
                    📸 Featured Image
                  </span>
                </div>
              </div>
            )}

            {/* Job Stats Grid - Modern Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-10">
              {/* Job Type Card */}
              <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm">
                    <MdWork className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-blue-700 uppercase tracking-wider">Job Type</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{career.type}</p>
                  </div>
                </div>
              </div>

              {/* Experience Card */}
              <div className="bg-linear-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-4 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm">
                    <FaUserTie className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Experience</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{career.experience}</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-linear-to-br from-violet-50 to-violet-100 border border-violet-200 rounded-2xl p-4 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm">
                    <FaMapMarkerAlt className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-violet-700 uppercase tracking-wider">Location</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{career.location}</p>
                  </div>
                </div>
              </div>

              {/* Vacancies Card */}
              <div className="bg-linear-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-4 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm">
                    <FaUsers className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-amber-700 uppercase tracking-wider">Open Positions</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{career.vacancies}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Information Timeline */}
            <div className="mb-8 sm:mb-10">
              <div className="flex flex-wrap items-center gap-4 p-4 bg-linear-to-r from-gray-50 to-white border border-gray-100 rounded-2xl">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm">
                  <BsCalendarDate className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Posted:</span>
                  <span className="text-sm font-bold text-gray-900">{formatDate(career.createdAt)}</span>
                </div>
                
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm">
                  <FaGenderless className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Gender:</span>
                  <span className="text-sm font-bold text-gray-900">{career.gender}</span>
                </div>
                
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm">
                  <FaLink className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Apply Link:</span>
                  <span className="text-sm font-bold text-blue-600 truncate max-w-37.5 sm:max-w-50">
                    {career.applyLink}
                  </span>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            {career.categories && career.categories.length > 0 && (
              <div className="mb-8 sm:mb-10">
                <div className="flex items-center space-x-2 mb-4">
                  <MdCategory className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-gray-900">Job Categories</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {career.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 bg-linear-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 rounded-full text-sm font-semibold backdrop-blur-sm hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Elegant Divider */}
            <div className="relative my-8 sm:my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-500">
                  <HiOutlineDocumentText className="w-6 h-6" />
                </span>
              </div>
            </div>

            {/* Job Description Section */}
            <div className="mb-8 sm:mb-10">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Position Details</h3>
                <p className="text-gray-600">Complete job description and requirements</p>
              </div>
              
              {/* Description Card */}
              <div className="bg-linear-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <HTMLContentDisplay content={career.details} />
              </div>
            </div>

            {/* Application Info Panel */}
            <div className="bg-linear-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm">
                  <FaLink className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">External Application Details</h4>
                  <p className="text-gray-600 text-sm">This position uses an external application system</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl p-4">
                  <p className="font-medium text-gray-900 mb-2">Application URL:</p>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <code className="text-sm text-blue-600 truncate flex-1">{career.applyLink}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Footer */}
        <div className="shrink-0 bg-linear-to-r from-gray-50 to-white border-t border-gray-100 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-3 text-xs md:text-base bg-linear-to-r from-gray-200 to-gray-300 text-gray-800 font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer active:scale-95"
              >
                Close Preview
              </button>
              <button
                onClick={() => window.open(career.applyLink, '_blank')}
                className="px-6 py-3 text-xs md:text-base bg-linear-to-r from-secondary to-primary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-secondary-500/25 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer active:scale-95"
              >
                <span className="flex items-center space-x-2">
                  <span>View Application Page</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}