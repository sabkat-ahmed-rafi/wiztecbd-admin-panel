import { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaBuilding, 
  FaGlobe, 
  FaCalendarAlt, 
  FaClock,
  FaTrash,
  FaSpinner,
  FaExclamationCircle,
  FaSearch,
  FaChevronRight,
} from 'react-icons/fa';
import api from '../../config/axiosConfig';
import { LuRefreshCcw } from "react-icons/lu";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/get-contacts');
      
      if (response.data.status === 200) {
        setContacts(response.data.contacts || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch contacts');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (contact) => {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      setSelectedContact(contact);
      setIsSidebarOpen(true);
    } else {
      setSelectedContact(selectedContact?.id === contact.id ? null : contact);
    }
  };

  const handleDelete = async (contactId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        setContacts(contacts.filter(contact => contact.id !== contactId));
        if (selectedContact?.id === contactId) {
          setSelectedContact(null);
          if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
          }
        }
      } catch (err) {
        setError('Failed to delete contact');
        console.error('Error deleting contact:', err);
      }
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    // Don't clear selectedContact on desktop
    if (window.innerWidth < 1024) {
      setSelectedContact(null);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <FaExclamationCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchContacts}
            className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Contact Manager</h1>
            <p className="text-gray-600 mt-2">Manage all your contacts in one place</p>
          </div>
          
          <div className="flex items-center space-x-3">            
            <button
              onClick={fetchContacts}
              className="px-4 py-2.5 bg-linear-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center space-x-2"
            >
              <LuRefreshCcw className="text-sm" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{contacts.length}</p>
              </div>
              <div className="bg-stone-100 p-2.5 rounded-full">
                <FaUser className="text-xl text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Companies</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {[...new Set(contacts.map(c => c.companyName))].length}
                </p>
              </div>
              <div className="bg-stone-100 p-2.5 rounded-full">
                <FaBuilding className="text-xl text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Services</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {contacts.reduce((acc, contact) => acc + (contact.serviceIDs?.length || 0), 0)}
                </p>
              </div>
              <div className="bg-stone-100 p-2.5 rounded-full">
                <FaCalendarAlt className="text-xl text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{contacts.length}</p>
              </div>
              <div className="bg-stone-100 p-2.5 rounded-full">
                <FaUser className="text-xl text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and layout Bar */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Toggle */}
              <div className="hidden sm:flex bg-white rounded-lg border border-stone-200 shadow-md p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'list' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Contacts Section */}
          <div className={`${selectedContact && !isSidebarOpen ? 'lg:w-2/3' : 'w-full'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                All Contacts ({filteredContacts.length})
              </h2>
              <div className="text-sm text-gray-500">
                <span className="hidden sm:inline">Sorted by: </span>
                <select className="bg-transparent text-gray-700 font-medium">
                  <option>Recent</option>
                  <option>Name A-Z</option>
                  <option>Company</option>
                </select>
              </div>
            </div>

            {filteredContacts.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center">
                <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
                  <FaUser className="text-2xl text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">No contacts found</h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            ) : viewMode === 'grid' ? (
              // Grid View
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactClick(contact)}
                    className={`bg-white rounded-xl shadow-lg p-5 cursor-pointer transition-all duration-300 hover:shadow-xl border ${
                      selectedContact?.id === contact.id ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-stone-100 p-2.5 rounded-full">
                          <FaUser className="text-lg text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.companyName}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDelete(contact.id, e)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <FaEnvelope className="w-4 mr-2" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaPhone className="w-4 mr-2" />
                        <span>{contact.mobile}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <FaCalendarAlt className="w-3 mr-1" />
                          {contact.date}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="w-3 mr-1" />
                          {contact.time}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {contact.serviceIDs?.slice(0, 2).map((service, idx) => (
                          <span
                            key={idx}
                            className="bg-secondary/10 text-primary px-2 py-1 rounded text-xs"
                          >
                            {service}
                          </span>
                        ))}
                        {contact.serviceIDs?.length > 2 && (
                          <span className="text-gray-400 text-xs">+{contact.serviceIDs.length - 2}</span>
                        )}
                      </div>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="bg-white rounded-xl shadow overflow-hidden">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactClick(contact)}
                    className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedContact?.id === contact.id ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-stone-100 p-3 rounded-full">
                          <FaUser className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.companyName}</p>
                        </div>
                      </div>
                      
                      <div className="hidden md:flex items-center space-x-6 text-sm">
                        <span className="text-gray-600 lg:hidden xl:block">{contact.email}</span>
                        <span className="text-gray-600 lg:hidden 2xl:block">{contact.mobile}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => handleDelete(contact.id, e)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <FaTrash />
                        </button>
                        <FaChevronRight className="text-gray-400" />
                      </div>
                    </div>
                    
                    {/* Mobile list view details */}
                    <div className="md:hidden mt-3 pl-12 space-y-1 text-sm">
                      <div className="flex items-center text-gray-600">
                        <FaEnvelope className="w-3 mr-2" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaPhone className="w-3 mr-2" />
                        <span>{contact.mobile}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Sidebar */}
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
                  onClick={closeSidebar}
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
                        onClick={(e) => handleDelete(selectedContact.id, e)}
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
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t text-center text-gray-500 text-sm">
          <p>Showing {filteredContacts.length} of {contacts.length} contacts</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;