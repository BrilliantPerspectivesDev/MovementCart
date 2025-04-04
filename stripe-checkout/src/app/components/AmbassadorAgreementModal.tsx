import React, { useState, useEffect } from 'react';

interface AmbassadorAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

const AmbassadorAgreementModal: React.FC<AmbassadorAgreementModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  onDecline,
}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset button state when modal opens
      setIsButtonEnabled(false);
      
      // Enable button after 3 seconds
      const timer = setTimeout(() => {
        setIsButtonEnabled(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="mt-2">
                  <iframe
                    style={{ border: '1px #FFFFFF none' }}
                    src="https://brilliantperspectives.clickfunnels.com/optin39h7xmd9"
                    title="Ambassador Agreement"
                    width="100%"
                    height="600px"
                    scrolling="yes"
                    frameBorder="no"
                    allow="fullscreen"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                onAccept();
                onClose();
              }}
              disabled={!isButtonEnabled}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                isButtonEnabled
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => {
                onDecline();
                onClose();
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbassadorAgreementModal; 