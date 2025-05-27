
import React from 'react';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
        <div className="mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="text-red-600 w-6 h-6" />
          </div>
          <h3 className="font-playfair text-lg font-semibold text-red-800 mb-2">
            ¡Oops! Algo salió mal
          </h3>
          <p className="font-montserrat text-red-600 text-sm">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white font-montserrat"
          >
            Intentar nuevamente
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
