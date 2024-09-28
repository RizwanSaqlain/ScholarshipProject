import React, { useState } from 'react';
import axios from 'axios';
import { AiFillEye, AiFillCheckCircle } from 'react-icons/ai';
import { Modal } from 'flowbite-react';
import { FaSpinner } from 'react-icons/fa'; // Spinner for loading
import Forms from "../../pages/Notifications";


const FileUploadComponent = () => {
  const fileInputs = [
    { label: 'Passport Size Photo', required: true, acceptedFormats: ['.jpg', '.png', '.jpeg'] },
    { label: 'Scanned Signature', required: true, acceptedFormats: ['.jpg', '.png', '.jpeg'] },
    { label: 'SSC Marksheet', required: true, acceptedFormats: ['.jpg', '.png', '.jpeg', '.pdf'] },
    { label: 'Domicile Certificate', required: false, acceptedFormats: ['.jpg', '.png', '.jpeg', '.pdf'] },
    { label: 'Income Certificate', required: false, acceptedFormats: ['.jpg', '.png', '.jpeg', '.pdf'] },
    { 
      label: 'Undertaking Certificate', required: true, acceptedFormats: ['.jpg', '.png', '.jpeg', '.pdf'],
      additional: (
        <a href="#" className="text-blue-600 underline">
          Click to download Format for Undertaking Certificate
        </a>
      ),
    },
    { label: 'Caste Certificate (other than Open OP)', required: false, acceptedFormats: ['.jpg', '.png', '.jpeg', '.pdf'] },
    { label: 'Aadhaar Card', required: true, acceptedFormats: ['.jpg', '.png', '.jpeg', '.pdf'] },
    { label: '12th Marksheet', required: true, acceptedFormats: ['.jpg', '.png', '.jpeg', '.pdf'] },
    { label: 'Diploma Certificate', required: false, acceptedFormats: ['.jpg', '.png', '.jpeg', '.pdf'] },
  ];

  const [files, setFiles] = useState({});
  const [fileStatus, setFileStatus] = useState({});
  const [classificationResults, setClassificationResults] = useState({
    'Passport Size Photo' : 'Not Uploaded yet',
    'Scanned Signature' : 'Not Uploaded yet',
    'SSC Marksheet' : 'Not Uploaded yet',
    'Domicile Certificate' : 'Not Uploaded yet',
    'Income Certificate' : 'Not Uploaded yet',
    'Undertaking Certificate' : 'Not Uploaded yet',
    'Caste Certificate (other than Open OP)' : 'Not Uploaded yet',
    'Aadhaar Card' : 'Not Uploaded yet',
    '12th Marksheet' : 'Not Uploaded yet',
    'Diploma Certificate' : 'Not Uploaded yet',
  });
  const [classificationLoading, setClassificationLoading] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);


  // File validation before upload
  const validateFile = (file, acceptedFormats) => {
    const isAcceptedFormat = acceptedFormats.includes(`.${file.name.split('.').pop()}`);
    const isUnder2MB = file.size <= 2 * 1024 * 1024;
    return isAcceptedFormat && isUnder2MB;
  };

  const handleFileChange = (e, label, acceptedFormats) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileStatus((prev) => ({
          ...prev,
          [label]: `File size exceeds 2MB. Size is ${(file.size/ 1024 / 1024).toFixed(2)} MB `,
        }));
        return;
      }

      if (validateFile(file, acceptedFormats)) {
        setFiles((prev) => ({ ...prev, [label]: file }));
        setFileStatus((prev) => ({
          ...prev,
          [label]: `${file.name} uploaded successfully. Size is ${(file.size/ 1024 / 1024).toFixed(2)} MB`,
        }));
      } else {
        setFileStatus((prev) => ({
          ...prev,
          [label]: 'Invalid file format or size exceeds 2MB',
        }));
      }
    } else {
      setFileStatus((prev) => ({
        ...prev,
        [label]: 'No file selected',
      }));
    }
  };

  const handlePreview = (file) => {
    if (file) {
      setPreviewFile(file);
      setPreviewModalOpen(true);
    } else {
      alert('No file uploaded to preview');
    }
  };

  const handleBatchUpload = async () => {
    const formData = new FormData();
    let validFiles = true;

    // Append each file to FormData
    for (const [label, file] of Object.entries(files)) {
      if (file) {
        formData.append(label, file);
        setClassificationLoading((prev) => ({ ...prev, [label]: true }));
      } else if (fileInputs.find(input => input.label === label).required) {
        setFileStatus((prev) => ({
          ...prev,
          [label]: 'This file is required but not selected.',
        }));
        validFiles = false;
      }
    }

    if (!validFiles) return;
    setUploading(true);

    try {
      const response = await axios.post('http://localhost:5000/upload-batch', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { classifications } = response.data;
      setClassificationResults(classifications);
      setClassificationLoading(false);
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    } finally {
      setUploading(false);
    }
  };


  return (
    <div><Forms/>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-4 text-sm text-red-600 font-bold">
          <p>NOTE:</p>
          <ul className="list-disc pl-6">
            <li>Kindly upload files in .jpg/.jpeg/.png format for Passport Photo and Signature and .jpg/.jpeg/.png/.pdf format for other attachments.</li>
            <li>Size of the file should be less than 2 MB</li>
          </ul>
        </div>

        <h2 className="text-lg font-bold mb-4">Attachments Details</h2>

        <div className="space-y-3">
          {fileInputs.map((input, index) => (
            <div key={index} className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start p-4 border rounded-lg shadow-sm bg-white">
              {/* Label and Input */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">
                  {input.label} {input.required && <span className="text-red-600">*</span>}
                </label>
                {input.additional && <div className="mt-1">{input.additional}</div>}
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  accept={input.acceptedFormats.join(',')}
                  onChange={(e) => handleFileChange(e, input.label, input.acceptedFormats)}
                />
              </div>

              {/* File status */}
              <div className="flex justify-center items-center mt-6 ml-10">
                {fileStatus[input.label] && (
                  <div className={`text-sm ${fileStatus[input.label].includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {fileStatus[input.label]}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3 justify-start sm:justify-end items-center mt-4">
                {files[input.label] && <AiFillCheckCircle className="h-6 w-6 text-green-500" />}
                <button
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handlePreview(files[input.label])}
                >
                  <AiFillEye className="h-6 w-6" />
                </button>
              </div>

              {/* Classification Results */}
              <div className="flex flex-col items-center mt-4">
                <h3 className="text-md font-semibold mt-2">Classification Result</h3>
                <div className="text-sm text-center">
                  {classificationLoading[input.label] ? (
                    <div className="flex items-center">
                      <FaSpinner className="animate-spin h-6 w-6 text-blue-500" />
                      <span className="ml-2">Classifying...</span>
                    </div>
                  ) : (
                    classificationResults[input.label] && (
                      <div className="text-green-600">
                        {classificationResults[input.label]}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Batch Submit Button */}
        <div className="mt-8 flex justify-start items-center">
          <button
            className="p-3 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            onClick={handleBatchUpload}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                Uploading...
              </>
            ) : (
              'Submit All Files'
            )}
          </button>
        </div>

        {/* Modal for Preview */}
        <Modal show={previewModalOpen} onClose={() => setPreviewModalOpen(false)}>
          <Modal.Header>File Preview</Modal.Header>
          <Modal.Body>
            {previewFile && (
              <div className="flex justify-center">
                {previewFile.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(previewFile)}
                    alt="Preview"
                    className="max-w-full max-h-[400px] object-contain"
                  />
                ) : (
                  <iframe
                    src={URL.createObjectURL(previewFile)}
                    title="file-preview"
                    width="100%"
                    height="400px"
                  ></iframe>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className='justify-center'>
          <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
           focus:ring-gray-300 font-medium rounded-lg text-sm px-20 py-2.5 me-2 mb-2
            dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => setPreviewModalOpen(false)}>
              Close
          </button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
};

export default FileUploadComponent;
