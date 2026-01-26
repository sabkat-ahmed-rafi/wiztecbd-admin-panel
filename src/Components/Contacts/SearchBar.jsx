import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, onSearchChange, viewMode, onViewModeChange }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="hidden sm:flex bg-white rounded-lg border border-stone-200 shadow-md p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => onViewModeChange('list')}
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
  );
};

export default SearchBar;