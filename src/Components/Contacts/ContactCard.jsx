import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaTrash, FaChevronRight } from 'react-icons/fa';

const ContactCard = ({ contact, isSelected, onClick, onDelete }) => {
  return (
    <div
      key={contact.id}
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-5 cursor-pointer transition-all duration-300 hover:shadow-xl border ${
        isSelected ? 'border-primary' : 'border-transparent'
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
          onClick={(e) => onDelete(contact.id, e)}
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
  );
};

export default ContactCard;