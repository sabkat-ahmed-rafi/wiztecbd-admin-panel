import { FaExclamationCircle } from 'react-icons/fa';

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <FaExclamationCircle className="text-5xl text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;