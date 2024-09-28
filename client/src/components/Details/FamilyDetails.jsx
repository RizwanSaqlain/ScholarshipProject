import React, { useEffect, useState } from 'react';
import { Card, Table } from 'flowbite-react';
import axios from 'axios';

const FamilyDetails = () => {
  const [familyDetails, setFamilyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000/api/family-details')
      .then(response => {
        setFamilyDetails(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching family details:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Define a placeholder value
  const placeholder = "-----";

  return (
    <div>
      <Card href="#" className="hover:bg-white cursor-default mx-8 md:mx-10">
        <h5 className="text-xl bg-pink-200 p-2 font-medium tracking-tight text-gray-900 rounded-md dark:text-white w-full">
          Family/Income Details:
        </h5>
        <div className="overflow-auto">
          <Table className='rounded' striped>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Name of the Father/Guardian:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (familyDetails?.fatherName || 'N/A')}</Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Name of the Mother/Guardian:
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (familyDetails?.motherName || 'N/A')}</Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Occupation (Father/Guardian):
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (familyDetails?.fatherOccupation || 'N/A')}</Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Occupation (Mother/Guardian):
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (familyDetails?.motherOccupation || 'N/A')}</Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Designation (Father/Guardian):
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (familyDetails?.fatherDesignation || 'N/A')}</Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Designation (Mother/Guardian):
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (familyDetails?.motherDesignation || 'N/A')}</Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Mobile Number (Father/Guardian):
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (familyDetails?.fatherMobile || 'N/A')}</Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Mobile Number (Mother/Guardian):
                </Table.Cell>
                <Table.Cell>{loading || error ? placeholder : (familyDetails?.motherMobile || 'N/A')}</Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Family Annual Income:
                </Table.Cell>
                <Table.Cell colSpan={3}>
                  {loading || error ? placeholder : (familyDetails?.familyIncome || 'N/A')}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
  );
}

export default FamilyDetails;
