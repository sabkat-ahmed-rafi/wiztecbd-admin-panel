import { FaSpinner } from 'react-icons/fa';

const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
        <p className="text-gray-600">Loading contacts...</p>
      </div>
    </div>
  );
};

export default LoadingState;