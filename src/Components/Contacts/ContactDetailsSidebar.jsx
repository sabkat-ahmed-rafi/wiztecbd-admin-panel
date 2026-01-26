import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaGlobe, FaCalendarAlt, FaClock, FaTrash } from 'react-icons/fa';

const ContactDetailsSidebar = ({ 
  selectedContact, 
  onClose, 
  onDelete, 
  isSidebarOpen,
  formatDate 
}) => {
  return (
    <div className={`w-full ${selectedContact || isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
      <div className={`lg:sticky lg:top-6 bg-white rounded-xl shadow-lg overflow-hidden ${
        isSidebarOpen 
          ? 'fixed inset-y-0 right-0 w-full sm:w-125 z-50 transform transition-transform duration-300 translate-x-0' 
          : 'fixed inset-y-0 right-0 w-full sm:w-96 z-50 transform transition-transform duration-300 translate-x-full lg:relative lg:translate-x-0 lg:w-auto'
      }`}>
        {/* Mobile Sidebar Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Contact Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 h-full overflow-y-auto lg:max-h-[calc(100vh-120px)]">
          {selectedContact ? (
            <div className="space-y-6">
              {/* Contact Header */}
              <div className="flex items-center space-x-4 pb-6 border-b">
                <div className="bg-stone-100 p-4 rounded-full">
                  <FaUser className="text-2xl text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{selectedContact.name}</h3>
                  <p className="text-gray-600">{selectedContact.companyName}</p>
                </div>
                <button
                  onClick={(e) => onDelete(selectedContact.id, e)}
                  className="text-red-500 hover:text-red-600 p-2"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <FaEnvelope />
                    <span>Email</span>
                  </label>
                  <p className="text-gray-800 font-medium truncate">{selectedContact.email}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <FaPhone />
                    <span>Phone</span>
                  </label>
                  <p className="text-gray-800 font-medium">{selectedContact.mobile}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <FaBuilding />
                    <span>Company</span>
                  </label>
                  <p className="text-gray-800 font-medium">{selectedContact.companyName}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <FaGlobe />
                    <span>Website</span>
                  </label>
                  <a 
                    href={`https://${selectedContact.companyWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium text-wrap truncate"
                  >
                    {selectedContact.companyWebsite}
                  </a>
                </div>
              </div>

              {/* Meeting Details */}
              <div className="pt-6 border-t">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Meeting Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Date</label>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span className="font-medium">{selectedContact.date}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Time</label>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400" />
                      <span className="font-medium">{selectedContact.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 border-t">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Description</h4>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {selectedContact.description}
                </p>
              </div>

              {/* Services */}
              <div className="pt-6 border-t">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.serviceIDs && selectedContact.serviceIDs.length > 0 ? (
                    selectedContact.serviceIDs.map((serviceId, index) => (
                      <span
                        key={index}
                        className="bg-secondary/20 text-primary px-3 py-1.5 rounded-lg text-sm font-medium"
                      >
                        {serviceId}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No services specified</p>
                  )}
                </div>
              </div>

              {/* Timestamp */}
              <div className="pt-6 border-t">
                <p className="text-sm text-gray-500">
                  Contact created on {formatDate(selectedContact.createdAt)}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
                <FaUser className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Select a Contact</h3>
              <p className="text-gray-600">Choose a contact to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsSidebar;