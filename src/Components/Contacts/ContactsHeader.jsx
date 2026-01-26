import { LuRefreshCcw } from "react-icons/lu";

const ContactsHeader = ({ onRefresh }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
      <div className="mb-4 sm:mb-0">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Contact Manager</h1>
        <p className="text-gray-600 mt-2">Manage all your contacts in one place</p>
      </div>
      
      <div className="flex items-center space-x-3">            
        <button
          onClick={onRefresh}
          className="px-4 py-2.5 bg-linear-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center space-x-2"
        >
          <LuRefreshCcw className="text-sm" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default ContactsHeader;