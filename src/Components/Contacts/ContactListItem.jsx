import { FaUser, FaEnvelope, FaPhone, FaTrash, FaChevronRight } from 'react-icons/fa';

const ContactListItem = ({ contact, isSelected, onClick, onDelete }) => {
  return (
    <div
      key={contact.id}
      onClick={onClick}
      className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-primary/5' : ''
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
            onClick={(e) => onDelete(contact.id, e)}
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
  );
};

export default ContactListItem;