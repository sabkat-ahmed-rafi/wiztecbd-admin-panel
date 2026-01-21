import { useState, useEffect, useRef } from 'react';

export default function MultiSelect({ 
  options, 
  selectedValues, 
  onChange, 
  placeholder = "Select options...",
  disabled = false,
  label 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    const newValue = selectedValues.includes(option.id)
      ? selectedValues.filter(id => id !== option.id)
      : [...selectedValues, option.id];
    onChange(newValue);
  };

  const handleRemoveTag = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    const newValue = selectedValues.filter(value => value !== id);
    onChange(newValue);
  };

  const getSelectedOptionNames = () => {
    return selectedValues
      .map(id => options.find(option => option.id === id)?.name)
      .filter(Boolean);
  };

  return (
    <div className={`relative ${isOpen ? 'mb-40' : ''}`} ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {/* Selected Values Display */}
      <div
        tabIndex={disabled ? -1 : 0}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 ${
          disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'hover:border-primary focus:ring-2 focus:ring-primary focus:border-primary'
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
            e.preventDefault();
            setIsOpen(true);
          }
          if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        {selectedValues.length === 0 ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {getSelectedOptionNames().map((name, index) => {
              const option = options.find(opt => opt.name === name);
              return (
                <span
                  key={option?.id || index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-primary"
                >
                  {name}
                  <button
                    type="button"
                    className="ml-2 text-primary hover:text-secondary focus:outline-none"
                    onClick={(e) => handleRemoveTag(e, option?.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                      }
                    }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              );
            })}
          </div>
        )}
        
        {/* Dropdown Arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && !disabled && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-primary focus:border-primary text-sm"
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>

          {/* Options List */}
          <div className="max-h-48 pb-4  overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-gray-500 text-sm">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className={`px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-green-50 ${
                    selectedValues.includes(option.id) ? 'bg-green-50 border-l-4 border-primary' : ''
                  }`}
                  onClick={() => handleOptionClick(option)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOptionClick(option);
                    }
                  }}
                  tabIndex={0}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                      selectedValues.includes(option.id)
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}>
                      {selectedValues.includes(option.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-800">{option.name}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="mt-1 text-sm text-gray-500">
        Click to select multiple options
      </p>
    </div>
  );
}