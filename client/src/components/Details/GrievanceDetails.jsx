import React from 'react';

function GrievanceDetails() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
          Grievance
        </h2>
        <p className="text-center text-gray-700 mb-6">
          If you have any concerns or queries, we're here to listen. Please reach out to us through the email below:
        </p>
        <div className="text-center mb-6">
          <a 
            href="mailto:pmsss@gmail.com" 
            className="text-blue-600 hover:underline text-xl font-semibold"
          >
            pmsss12345@gmail.com
          </a>
        </div>
        <p className="text-center text-gray-600">
           We aim to resolve your issues promptly and effectively. Thank you for reaching out.
        </p>
      </div>
    </div>
  );
}

export default GrievanceDetails;
