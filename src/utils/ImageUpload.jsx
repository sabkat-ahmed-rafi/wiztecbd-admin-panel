import { useState } from 'react';

export default function ImageUpload({ 
  value, 
  onChange, 
  onRemove, 
  label = "Image", 
  disabled = false,
  currentImage = null,
  showCurrentImageNote = false 
}) {
  const [imagePreview, setImagePreview] = useState(value || currentImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      onChange(file);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
    onRemove();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary">
        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-h-48 mx-auto rounded-lg shadow-md"
            />
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-gray-400">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <label className="cursor-pointer">
                <span className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary disabled:opacity-50">
                  {currentImage ? 'Change Image' : 'Choose Image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={disabled}
                  className="hidden"
                />
              </label>
              <p className="mt-2 text-sm text-gray-500">
                PNG, JPG, GIF
              </p>
            </div>
          </div>
        )}
      </div>
      {showCurrentImageNote && currentImage && !imagePreview && (
        <p className="mt-2 text-sm text-gray-500">
          Current image will be kept if no new image is selected
        </p>
      )}
    </div>
  );
}