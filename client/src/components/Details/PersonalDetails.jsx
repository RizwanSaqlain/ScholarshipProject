import React, { useState, useEffect } from "react";
import { Card, Table, Modal, Button } from "flowbite-react";
import { FaEye } from "react-icons/fa";
import axios from "axios";

const PersonalDetails = () => {
  const [personalDetails, setPersonalDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:5000/api/personal-details")
      .then((response) => {
        setPersonalDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching personal details:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Handle modal preview
  const handlePreview = (attachmentName) => {
    setPreviewContent(`Previewing ${attachmentName}`);
    setShowModal(true);
    lockScroll(); // Lock scroll when modal is opened
  };

  
  
  // Close modal and unlock scroll
  const closeModal = () => {
    setShowModal(false);
    unlockScroll(); // Unlock scroll when modal is closed
  };

  // Lock scroll function
  const lockScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  };

  // Unlock scroll function
  const unlockScroll = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };

  // Define a placeholder value
  const placeholder = "-----";

  return (
    <div>
      <Card href="#" className="hover:bg-white mx-8 mt-16 mb-5 md:mx-10 cursor-default">
        <h5 className="text-xl bg-pink-200 p-2 font-medium tracking-tight text-gray-900 rounded-md dark:text-white w-full">
          Personal Details of Applicant:
        </h5>
        <div className="overflow-auto">
          <Table striped>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Candidate Id:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : personalDetails?.candidateId || "N/A"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Name of the candidate:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : personalDetails?.candidateName || "N/A"}</Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Gender:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : personalDetails?.gender || "N/A"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Whether Domicile of J&K?
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (personalDetails?.domicileJk ? "Yes" : "No")}</Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Photo:
                </Table.Cell>
                <Table.Cell className="text-blue-700">
                  <FaEye
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePreview("Photo")}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Signature:
                </Table.Cell>
                <Table.Cell className="text-blue-700">
                  <FaEye
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePreview("Signature")}
                  />
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Date of Birth (DD-MM-YYYY):
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : personalDetails?.dob || "N/A"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Aadhar Details (UID):
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : personalDetails?.aadhar || "N/A"}</Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Caste Category:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : personalDetails?.casteCategory || "N/A"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Sub-Caste Category:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : personalDetails?.subCasteCategory || "N/A"}</Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Physically Disabled:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (personalDetails?.physicallyDisabled ? "Yes" : "No")}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </Card>

      {/* Modal for preview */}
      <Modal show={showModal} onClose={closeModal}>
        <Modal.Header>Preview</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {previewContent}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PersonalDetails;
