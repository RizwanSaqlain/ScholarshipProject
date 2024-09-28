import React, { useState, useEffect } from 'react';
import { Card, Table } from 'flowbite-react';
import axios from 'axios';

const AddressDetails = () => {
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch address details from the backend API
  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/address-details'); // Assuming backend is on port 5000
        setAddressData(response.data);
      } catch (err) {
        setError('Failed to fetch address details.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAddressDetails();
  }, []);

  // Define a placeholder value
  const placeholder = '-----';

  return (
    <div>
      <Card href="#" className="hover:bg-white cursor-default mx-8 my-5 md:mx-10">
        <h5 className="text-xl bg-pink-200 p-2 font-medium tracking-tight text-gray-900 rounded-md dark:text-white w-full">
          Address and Contact Details:
        </h5>
        <div className="overflow-auto">
          <Table striped>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Mobile Number:
                </Table.Cell>
                <Table.Cell colSpan={3}>{loading || error ? placeholder : addressData.mobileNumber || 'N/A'}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Alternate Mobile Number:
                </Table.Cell>
                <Table.Cell colSpan={3}>{loading || error ? placeholder : addressData.alternateMobileNumber || 'N/A'}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Email Address:
                </Table.Cell>
                <Table.Cell colSpan={3}>{loading || error ? placeholder : addressData.email || 'N/A'}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Alternate Email Address:
                </Table.Cell>
                <Table.Cell colSpan={3}>{loading || error ? placeholder : addressData.alternateEmail || 'N/A'}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Permanent Address:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : addressData.permanentAddress || 'N/A'}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Current Address:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : addressData.currentAddress || 'N/A'}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  State:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : addressData.state || 'N/A'}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  State/UT:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : addressData.currentState || 'N/A'}</Table.Cell>
              </Table.Row>
              {/* Add other fields similarly */}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AddressDetails;
