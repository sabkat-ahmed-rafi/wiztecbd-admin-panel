import { useState, useEffect } from 'react';
import { FaUser, FaBuilding, FaCalendarAlt, FaSearch, FaTrash } from 'react-icons/fa';
import { LuRefreshCcw } from "react-icons/lu";
import api from '../../config/axiosConfig';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import ContactsHeader from './ContactsHeader';
import StatsCards from './StatsCards';
import SearchBar from './SearchBar';
import ContactCard from './ContactCard';
import ContactListItem from './ContactListItem';
import ContactDetailsSidebar from './ContactDetailsSidebar';

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
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchContacts} />;
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
        <ContactsHeader onRefresh={fetchContacts} />

        {/* Stats Cards */}
        <StatsCards contacts={contacts} />

        {/* Search and layout Bar */}
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          viewMode={viewMode} 
          onViewModeChange={setViewMode} 
        />

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
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    isSelected={selectedContact?.id === contact.id}
                    onClick={() => handleContactClick(contact)}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              // List View
              <div className="bg-white rounded-xl shadow overflow-hidden">
                {filteredContacts.map((contact) => (
                  <ContactListItem
                    key={contact.id}
                    contact={contact}
                    isSelected={selectedContact?.id === contact.id}
                    onClick={() => handleContactClick(contact)}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details Sidebar */}
          <ContactDetailsSidebar
            selectedContact={selectedContact}
            onClose={closeSidebar}
            onDelete={handleDelete}
            isSidebarOpen={isSidebarOpen}
            formatDate={formatDate}
          />
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