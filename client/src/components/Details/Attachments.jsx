import React, { useState, useEffect } from "react";
import { Card, Table, Modal, Button } from "flowbite-react";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import axios from 'axios';

const Attachments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState("");
  const [attachments, setAttachments] = useState([]);  // State to store fetched data
  const [loading, setLoading] = useState(true);  // State to handle loading

  const handlePreview = (attachmentName) => {
    setPreviewAttachment(attachmentName);
    setIsModalOpen(true);
    lockScroll(); // Lock scroll when modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
    unlockScroll(); // Unlock scroll when modal closes
  };

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attachments');
        setAttachments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attachments:", error);
        setLoading(false);
      }
    };
  
    fetchAttachments();
  }, []);

  // Lock scroll
  const lockScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  };

  // Unlock scroll
  const unlockScroll = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };

  // Hardcoded data structure (fallback)
  const defaultAttachments = [
    { name: "Photo", uploaded: true, verified: true },
    { name: "Signature", uploaded: true, verified: true },
    { name: "Father/Guardian Photo", uploaded: false, verified: false },
    { name: "Mother/Guardian Photo", uploaded: false, verified: false },
    { name: "SSC Marksheet", uploaded: true, verified: true },
    { name: "Domicile Certificate", uploaded: true, verified: true },
    { name: "Income Certificate", uploaded: true, verified: true },
    { name: "Undertaking Certificate", uploaded: true, verified: true },
    { name: "Caste Certificate", uploaded: true, verified: true },
    { name: "Aadhar Card", uploaded: true, verified: true },
  ];

  // Define a placeholder value
  const placeholder = "-----";

  // Merge backend data with default attachments
  const mergedAttachments = defaultAttachments.map((attachment) => {
    const backendAttachment = attachments?.find((item) => item.name === attachment.name);
    return {
      name: attachment.name,
      uploaded: loading ? placeholder : (backendAttachment ? backendAttachment.uploaded : "N/A"),
      verified: loading ? placeholder : (backendAttachment ? backendAttachment.verified : "N/A"),
    };
  });

  return (
    <div>
      <Card href="#" className="hover:bg-white cursor-default mx-8 md:mx-10">
        <h5 className="text-xl bg-pink-200 p-2 font-medium tracking-tight text-gray-900 text-center rounded-md dark:text-white w-full">
          Attachments:
        </h5>
        <div className="overflow-auto">
          <Table className="rounded" striped>
            <Table.Head>
              <Table.HeadCell>Attachment Name</Table.HeadCell>
              <Table.HeadCell>Uploaded</Table.HeadCell>
              <Table.HeadCell>Preview</Table.HeadCell>
              <Table.HeadCell>Verified</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {mergedAttachments.map((attachment, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {attachment.name}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {attachment.uploaded === true && <FaCheck className="text-green-500" />}
                    {attachment.uploaded === false && <FaTimes className="text-red-500" />}
                    {attachment.uploaded === placeholder && <span>{placeholder}</span>}
                    {attachment.uploaded === "N/A" && <span>N/A</span>}
                  </Table.Cell>
                  <Table.Cell className="text-blue-700">
                    {attachment.uploaded === true && (
                      <FaEye style={{ cursor: "pointer" }} onClick={() => handlePreview(attachment.name)} />
                    )}
                    {attachment.uploaded === placeholder && <span>{placeholder}</span>}
                    {attachment.uploaded === "N/A" && <span>N/A</span>}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {attachment.verified === true && <FaCheck className="text-green-500" />}
                    {attachment.verified === false && <FaTimes className="text-red-500" />}
                    {attachment.verified === placeholder && <span>{placeholder}</span>}
                    {attachment.verified === "N/A" && <span>N/A</span>}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Card>

      {/* Modal for previewing attachment */}
      <Modal
        show={isModalOpen}
        size="lg"
        popup={true}
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Preview of {previewAttachment}
            </h3>
            <p>Attachment content goes here...</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Attachments;
