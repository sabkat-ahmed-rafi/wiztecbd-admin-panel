// components/CustomSelect.jsx
import { useState, useRef, useEffect } from 'react';

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  label,
  error,
  required = false,
  showClearButton = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const filteredOptions = search
    ? options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearch('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setSearch('');
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative" ref={selectRef}>
        {/* Select Trigger */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 text-left bg-white border rounded-lg
            transition-all duration-200 ease-in-out
            flex items-center justify-between
            ${disabled 
              ? 'bg-gray-50 cursor-not-allowed text-gray-400' 
              : 'cursor-pointer hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20'
            }
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${isOpen ? 'ring-2 ring-primary/20 border-primary' : ''}
          `}
        >
          <div className="flex items-center">
            {selectedOption ? (
              <>
                {selectedOption.icon && (
                  <span className="mr-2 text-lg">{selectedOption.icon}</span>
                )}
                <span className="text-gray-800">{selectedOption.label}</span>
              </>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {showClearButton && value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Clear selection"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div className="
            absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg 
            shadow-xl max-h-64 overflow-y-auto animate-fadeIn
          ">
            {/* Search Input */}
            <div className="sticky top-0 p-2 bg-white border-b border-gray-100">
              <div className="relative">
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="py-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full px-4 py-3 text-left flex items-center
                      transition-colors duration-150 ease-in-out
                      ${option.value === value 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'hover:bg-gray-50 text-gray-700'
                      }
                      ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    disabled={option.disabled}
                  >
                    {option.icon && (
                      <span className="mr-3 text-lg">{option.icon}</span>
                    )}
                    
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-gray-500 mt-0.5">
                          {option.description}
                        </span>
                      )}
                    </div>

                    {option.value === value && (
                      <svg 
                        className="ml-auto w-5 h-5 text-primary" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Variant for inline/filter selects
export const InlineSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Filter by',
  size = 'md',
  variant = 'primary'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5 text-lg'
  };

  const variantClasses = {
    primary: 'bg-white border-gray-300 hover:border-primary text-gray-700',
    secondary: 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700',
    dark: 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
  };

  return (
    <div className="relative inline-block" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${sizeClasses[size]} 
          ${variantClasses[variant]}
          border rounded-lg font-medium
          transition-all duration-200 ease-in-out
          flex items-center space-x-2
          ${isOpen ? 'ring-2 ring-primary/20' : ''}
        `}
      >
        <span>{selectedOption}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="
          absolute z-50 mt-1 min-w-50 bg-white border border-gray-200 rounded-lg 
          shadow-xl py-1 animate-fadeIn
        ">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-2.5 text-left flex items-center justify-between
                transition-colors duration-150
                ${option.value === value 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-gray-50 text-gray-700'
                }
              `}
            >
              <span>{option.label}</span>
              {option.value === value && (
                <svg 
                  className="w-4 h-4 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;